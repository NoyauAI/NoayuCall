
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

const updateOrganizationSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).optional(),
});

export async function GET(req, { params }) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId } = await params;

  if(!organizationId) {
    return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!organization) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }

  return NextResponse.json(organization);
}

export async function PUT(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = updateOrganizationSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const { organizationId } = await params;

  if(!organizationId) {
    return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
  }

  const { name } = result.data;

  const organization = await prisma.organization.update({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
    data: {
      name,
    },
  });

  return NextResponse.json(organization);
}

export async function DELETE(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId } = await params;

  if(!organizationId) {
    return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
  }

  await prisma.organization.delete({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}
