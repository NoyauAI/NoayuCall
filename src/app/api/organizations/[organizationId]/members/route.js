
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

const addMemberSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  role: z.enum(['ADMIN', 'MEMBER', 'BILLING']),
});

export async function GET(req, { params }) {
  const user = await getCurrentUser();

  const { organizationId } = await params;

  if (!organizationId) {
    return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const members = await prisma.organizationMembership.findMany({
    where: {
      organizationId: organizationId,
      organization: {
        memberships: {
          some: {
            userId: user.id,
          },
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  });

  return NextResponse.json(members);
}

export async function POST(req, { params }) {
  const user = await getCurrentUser();

  const { organizationId } = await params;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = addMemberSchema.safeParse(await req.json());

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const { email, role } = result.data;

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
          role: { in: ['OWNER', 'ADMIN'] },
        },
      },
    },
  });

  if (!organization) {
    return NextResponse.json({ error: "Organization not found or you don't have permission to add members" }, { status: 404 });
  }

  const userToAdd = await prisma.user.findUnique({
    where: { email },
  });

  if (!userToAdd) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const membership = await prisma.organizationMembership.create({
    data: {
      organizationId: organizationId,
      userId: userToAdd.id,
      role,
    },
  });

  return NextResponse.json(membership);
}
