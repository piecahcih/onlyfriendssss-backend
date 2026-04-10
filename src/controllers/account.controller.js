import * as accountService from '../services/account.service.js'

export const getMe = async (req, res, next) => {
  try {
    const user = await accountService.getUserById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};