import { prisma } from "../lib/prisma.js";


export async function requestToJoin(userId, activityId) {
  const activity = await prisma.activity.findUnique({
    where: { id: Number(activityId) },
    include: {
      _count: {
        select: {
          joinRequests: { where: { status: 'APPROVED' } }
        }
      }
    }
  });

  if (!activity) throw new Error("Activity not found");


  if (activity.maxParticipants && activity._count.joinRequests >= activity.maxParticipants) {
    throw new Error("This activity is already full");
  }

  const targetStatus = activity.isPublic ? 'APPROVED' : 'PENDING';

  return await prisma.joinRequest.create({
    data: {
      userId: userId,
      activityId: Number(activityId),
      status: targetStatus
    }
  });
}


export async function updateRequestStatus(hostId, requestId, status) {
  const allowedStatuses = ['APPROVED', 'REJECTED'];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status. Must be APPROVED or REJECTED");
  }

  const request = await prisma.joinRequest.findFirst({
    where: {
      id: Number(requestId),
      activity: { hostId: Number(hostId) }
    }
  });

  if (!request) {
    throw new Error("Request not found or you're not the host");
  }

  return await prisma.joinRequest.update({
    where: { id: Number(requestId) },
    data: { status } 
  });
}


export async function leaveActivity(userId, activityId) {
  const existingRequest = await prisma.joinRequest.findUnique({
    where: {
      userId_activityId: {
        userId: userId,
        activityId: Number(activityId)
      }
    }
  })

  if (!existingRequest) {
    throw new Error("You are not part of this activity");
  }

  return await prisma.joinRequest.delete({
    where: {
      userId_activityId: {
        userId: userId,
        activityId: Number(activityId)
      }
    }
  })
}