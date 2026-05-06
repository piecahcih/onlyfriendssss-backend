import { leaveActivity, requestToJoin, updateRequestStatus } from "../services/join.service.js"


export async function joinActivityCtrl(req, res, next) {
  try {
    const userId = req.result.id
    const { activityId } = req.body
    const io = req.app.get("io");

    const result = await requestToJoin(io, userId, activityId)

    const message = result.status === 'APPROVED'
      ? "Joined activity successfully"
      : "Request sent, waiting for host approval"

    res.json({
      message: message,
      data: result
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function manageJoinRequestCtrl(req, res, next) {
  try {
    const hostId = req.result.id
    const { requestId, status } = req.body
    const io = req.app.get("io");

    const result = await updateRequestStatus(io, hostId, requestId, status)
    res.json({
      message: `Request ${status.toLowerCase()} successfully`,
      data: result
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}


export async function leaveActivityCtrl(req, res, next) {
  try {
    const { activityId } = req.params
    const userId = req.result.id

    console.log(req.result.id)
    console.log(req.params)

    await leaveActivity(userId, activityId);

    res.json({
      message: 'Successfully left the activity'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}