import {
  acceptFriendRequest,
  getFriendList,
  sendFriendRequest,
  unfriend,
} from "../services/friend.service.js";

//ดึงรายชื่อเพื่อนทั้งหมด
export async function getFriendListCtrl(req, res, next) {
  try {
    const { id } = req.result;
    const friends = await getFriendList(id);
    res.json({ friends });
  } catch (error) {
    next(error);
  }
}

//ขอเป็นเพื่อน
export async function sendRequestCtrl(req, res, next) {
  try {
    const senderId = req.result.id;
    const receiverId = req.params.id;
    const result = await sendFriendRequest(senderId, receiverId);
    res.status(201).json({
      message: "ส่งคำขอเป็นเพื่อนแล้ว",
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
      message: "รับเป็นเพื่อนเรียบร้อยแล้ว",
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

    res.json({ message: "ลบเพื่อนแล้ว" });
  } catch (error) {
    next(error);
  }
}
