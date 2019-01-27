const { User } = require('../models');

module.exports = async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);
  if (currentUser.credits > 0) {
    return next();
  }
  return res.status(403).json({
    error: 'You have no credits left. Buy credits first.'
  });
};
