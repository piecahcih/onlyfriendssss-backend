import {
  acceptFriendRequest,
  getFriendList,
  getPendingRequests,
  sendFriendRequest,
  unfriend,
} from "../services/friend.service.js";

//ดึงรายชื่อเพื่อนทั้งหมด
export async function getFriendListCtrl(req, res, next) {
  try {
    const { id } = req.result;
    const [friends, requests] = await Promise.all([
      getFriendList(id),
      getPendingRequests(id),
    ]);
    res.json({ friends: friends, requests: requests });
  } catch (error) {
    next(error);
  }
}

//ขอเป็นเพื่อน
export async function sendRequestCtrl(req, res, next) {
  try {
    const senderId = req.result.id;
    const receiverId = req.params.id;
    const io = req.app.get("io");

    const result = await sendFriendRequest(io, senderId, receiverId);
    res.status(201).json({
      message: "Friend request sent.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

//ยอมรับเพื่อน
export async function acceptRequestCtrl(req, res, next) {
  try {
    const userId = req.result.id;
    const friendshipId = req.params.id;
    const io = req.app.get("io");

    const result = await acceptFriendRequest(io, userId, friendshipId);

    res.json({
      message: "Friend request accepted.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

//ลบเพื่อน
export async function unfriendCtrl(req, res, next) {
  try {
    const userId = req.result.id;
    const friendshipId = req.params.id;

    await unfriend(userId, friendshipId);

    res.json({ message: "Friendship removed" });
  } catch (error) {
    next(error);
  }
}
