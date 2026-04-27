import {
  acceptFriendRequest,
  getFriendList,
  getPendingRequests,
  getSentRequests,
  sendFriendRequest,
  unfriend,
} from "../services/friend.service.js";

//ดึงรายชื่อเพื่อนทั้งหมด
export async function getFriendListCtrl(req, res, next) {
  try {
    const { id } = req.result;
    const [friends, requests, sentRequests] = await Promise.all([
      getFriendList(id),
      getPendingRequests(id),
      getSentRequests(id),
    ]);
    res.json({ friends, requests, sentRequests });
  } catch (error) {
    next(error);
  }
}

//ขอเป็นเพื่อน
export async function sendRequestCtrl(req, res, next) {
  try {
    const senderId = Number(req.result.id);
    const receiverId = Number(req.params.id);
    const result = await sendFriendRequest(senderId, receiverId);
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

    const result = await acceptFriendRequest(userId, friendshipId);

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
