
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET /api/organizations/{organizationId}/teams/{teamId}
export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId } = await params;
  const userId = user.id;

  try {
    const membership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!membership) {
      return NextResponse.json({ error: 'You are not a member of this organization' }, { status: 403 });
    }

    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        organizationId,
      },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/organizations/{organizationId}/teams/{teamId}
export async function PUT(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId } = await params;
  const userId = user.id;

  try {
    const membership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
      return NextResponse.json({ error: 'You do not have permission to update teams in this organization' }, { status: 403 });
    }

    const { name, description } = await request.json();

    const team = await prisma.team.update({
      where: {
        id: teamId,
        organizationId,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/organizations/{organizationId}/teams/{teamId}
export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId } = await params;
  const userId = user.id;

  try {
    const membership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
      return NextResponse.json({ error: 'You do not have permission to delete teams in this organization' }, { status: 403 });
    }

    await prisma.team.delete({
      where: {
        id: teamId,
        organizationId,
      },
    });

    return NextResponse.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
