const Account = require("../models/account.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
// [POST] /api/account/register
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const existEmail = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      return res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      const account = new Account({
        ...req.body,
        token: generateHelper.generateRandomString(30),
      });
      const data = await account.save();
      const token = account.token;
      res.cookie("token", token);
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công!",
        data: data,
        token: token,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Thêm mới thất bại!",
    });
  }
};
// [POST] /api/accounts/login
module.exports.login = async (req, res) => {
  try {
    const password = md5(req.body.password);
    const account = await Account.findOne({
      email: req.body.email,
      password: password,
      deleted: false,
    });
    if (account) {
      const token = account.token;
      res.cookie("token", token,{
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        httpOnly: true, // không cho phép truy cập từ JS trên client (nếu cần)
        // secure: true, // nếu bạn sử dụng HTTPS
      });
      res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: token,
        account: account,
      });
    } else {
      res.json({
        code: 400,
        message: "Email hoặc mật khẩu không đúng!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại!",
    });
  }
};
//[POST] /api/accounts/reset-password
module.exports.changePassword = async (req, res) => {
  try {
    const oldPassword = md5(req.body.oldPassword);
    const token = req.account.token;
    const account = await Account.findOne({
      token: token,
      password: oldPassword,
      deleted: false,
    });
    if (account) {
      await Account.updateOne(
        {
          token: token,
        },
        {
          password: md5(req.body.newPassword),
        }
      );
      res.json({
        code: 200,
        message: "Đổi mật khẩu thành công!",
      });
    } else {
      res.json({
        code: 400,
        message: "Mật khẩu cũ không đúng!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Đổi mật khẩu thất bại!",
    });
  }
};
