
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// PUT /api/organizations/{organizationId}/teams/{teamId}/members/{memberId}
export async function PUT(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId, memberId } = params;
  const currentUserId = user.id;

  try {
    const currentUserMembership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId: currentUserId,
      },
    });

    if (!currentUserMembership || !['OWNER', 'ADMIN'].includes(currentUserMembership.role)) {
      return NextResponse.json({ error: 'You do not have permission to update members in this team' }, { status: 403 });
    }

    const { role, jobTitle, hourlyRate } = await request.json();

    const updatedMember = await prisma.teamMembership.update({
      where: {
        userId_teamId: {
            userId: memberId,
            teamId: teamId,
        }
      },
      data: {
        role,
        jobTitle,
        hourlyRate,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// DELETE /api/organizations/{organizationId}/teams/{teamId}/members/{memberId}
export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { organizationId, teamId, memberId } = params;
  const currentUserId = user.id;

  try {
    const currentUserMembership = await prisma.organizationMembership.findFirst({
      where: {
        organizationId,
        userId: currentUserId,
      },
    });

    if (!currentUserMembership || !['OWNER', 'ADMIN'].includes(currentUserMembership.role)) {
      return NextResponse.json({ error: 'You do not have permission to remove members from this team' }, { status: 403 });
    }

    await prisma.teamMembership.delete({
      where: {
        userId_teamId: {
            userId: memberId,
            teamId: teamId,
        }
      },
    });

    return NextResponse.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Error removing team member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
