const Doctor = require("../models/doctor.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");
// [GET] /api/doctor/getList
module.exports.getList = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Tạo điều kiện tìm kiếm từ keyword
  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.$or = [
      { firstName: objectSearch.regex },
      { lastName: objectSearch.regex },
      { email: objectSearch.regex },
      { phone: objectSearch.regex },
      { address: objectSearch.regex },
      { specialty: objectSearch.regex },
    ];
  }

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countDoctor = await Doctor.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countDoctor
  );
  // End Pagination

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  const doctor = await Doctor.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(doctor);
};
// [GET] /api/doctor/getById/:id
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Doctor.findOne({
      _id: id,
      deleted: false,
    });

    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};
// [POST] /api/doctor/create
module.exports.create = async (req, res) => {
  try {
    const existEmail = await Doctor.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      return res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      const doctor = new Doctor(req.body);
      const data = await doctor.save();

      res.json({
        code: 200,
        message: "Thêm mới thành công!",
        data: data,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Thêm mới thất bại!",
    });
  }
};
// [PATCH] /api/Doctor/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const existEmail = await Doctor.findOne({
      email: req.body.email,
      deleted: false,
    });

    // Kiểm tra nếu existEmail tồn tại và không phải của Doctor đang được cập nhật.
    if (existEmail && existEmail._id.toString() !== id) {
      return res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    }

    await Doctor.updateOne(
      { _id: id },
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
// [PATCH] /api/doctor/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.updateOne(
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
// [PATCH] /api/Doctor/restored/:id
module.exports.restored = async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.updateOne(
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
