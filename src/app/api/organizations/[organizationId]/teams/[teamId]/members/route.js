
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET /api/organizations/{organizationId}/teams/{teamId}/members
export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId } = await params;
  const userId = user.id;

  try {
    const orgMembership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!orgMembership) {
      return NextResponse.json({ error: 'You are not a member of this organization' }, { status: 403 });
    }

    const members = await prisma.teamMembership.findMany({
      where: {
        teamId,
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
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/organizations/{organizationId}/teams/{teamId}/members
export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId } = await params;
  const currentUserId = user.id;

  try {
    const currentUserMembership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId: currentUserId,
      },
    });

    if (!currentUserMembership || !['OWNER', 'ADMIN'].includes(currentUserMembership.role)) {
      return NextResponse.json({ error: 'You do not have permission to add members to this team' }, { status: 403 });
    }

    const { userId, role, jobTitle, hourlyRate } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userToAddMembership = await prisma.organizationMembership.findFirst({
        where: {
            organizationId,
            userId,
        },
    });

    if (!userToAddMembership) {
        return NextResponse.json({ error: 'User is not a member of this organization' }, { status: 400 });
    }

    const newMember = await prisma.teamMembership.create({
      data: {
        teamId,
        userId,
        role,
        jobTitle,
        hourlyRate,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error adding member to team:', error);
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'User is already a member of this team' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
