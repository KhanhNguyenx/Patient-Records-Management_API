const Specialty = require("../models/specialty.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");

// [GET] /api/Specialty/getList
module.exports.getList = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };

    const result = await Specialty.find(find);

    res.json(result);
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// [GET] /api/prescription/getById/:id
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Specialty.findOne({
      _id: id,
      deleted: false,
    });

    res.json(result);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};
// [POST] /api/prescription/create
module.exports.create = async (req, res) => {
  try {
    const record = new Specialty(req.body);
    const data = await record.save();

    res.json({
      code: 200,
      message: "Thêm mới thành công!",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thêm mới thất bại!",
    });
  }
};
// [PATCH] /api/prescription/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Specialty.updateOne(
      {
        _id: id,
      },
      req.body
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại!",
    });
  }
};
// [PATCH] /api/prescription/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Specialty.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      code: 200,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa thất bại!",
    });
  }
};
// [PATCH] /api/prescription/restore/:id
module.exports.restore = async (req, res) => {
  try {
    const id = req.params.id;
    await Specialty.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
      }
    );
    res.json({
      code: 200,
      message: "Khôi phục thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Khôi phục thất bại!",
    });
  }
};
