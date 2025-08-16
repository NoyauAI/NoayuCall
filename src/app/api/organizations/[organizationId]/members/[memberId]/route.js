import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, memberId } = await params;

  const requestingUserMembership = await prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organizationId,
      },
    },
  });

  if (!requestingUserMembership) {
    return NextResponse.json({ error: 'You are not a member of this organization' }, { status: 403 });
  }

  const membership = await prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: {
        userId: memberId,
        organizationId: organizationId,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!membership) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  const { role, user: member } = membership;

  return NextResponse.json({ id: member.id, name: member.name, email: member.email, role });
}

export async function PUT(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, memberId } = await params;
  const { role } = await req.json();

  if (!role || !['ADMIN', 'MEMBER'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

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
    return NextResponse.json({ error: 'Organization not found or you don\'t have permission to update members' }, { status: 404 });
  }

  if (user.id === memberId) {
    return NextResponse.json({ error: 'You cannot update your own role' }, { status: 400 });
  }

  const membershipToUpdate = await prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: {
        userId: memberId,
        organizationId: organizationId,
      },
    },
  });

  if (!membershipToUpdate) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  if (membershipToUpdate.role === 'OWNER') {
    return NextResponse.json({ error: 'Cannot update owner role' }, { status: 400 });
  }

  await prisma.organizationMembership.update({
    where: {
      userId_organizationId: {
        userId: memberId,
        organizationId: organizationId,
      },
    },
    data: {
      role,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, memberId } = await params;

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
    return NextResponse.json({ error: 'Organization not found or you don\'t have permission to remove members' }, { status: 404 });
  }

  if (user.id === memberId) {
    return NextResponse.json({ error: 'You cannot remove yourself' }, { status: 400 });
  }

  await prisma.organizationMembership.delete({
    where: {
      userId_organizationId: {
        userId: memberId,
        organizationId: organizationId,
      },
    },
  });

  return NextResponse.json({ success: true });
}