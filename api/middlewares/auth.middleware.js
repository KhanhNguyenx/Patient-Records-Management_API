const Account = require("../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const account = await Account.findOne({
      token: token,
      deleted: false,
    }).select("-password");
    if (!account) {
      res.json({
        code: 400,
        message: "Token không hợp lệ!",
      });
      return;
    }

    // gán user vào req.user để controller sử dụng
    req.account = account;

    next();
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!",
    });
    return;
  }
};
