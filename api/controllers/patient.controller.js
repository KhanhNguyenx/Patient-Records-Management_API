const Patient = require("../models/patient.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");
// [GET] /api/patient/getList
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
    ];
  }

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countPatient = await Patient.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countPatient
  );

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    // Mặc định sắp xếp theo _id giảm dần (mới nhất trước)
    sort["_id"] = -1;
  }

  const patient = await Patient.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(patient);
};

// [GET] /api/v1/tasks/getById/:id
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Patient.findOne({
      _id: id,
      deleted: false,
    });

    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};
// [POST] /api/patient/create
module.exports.create = async (req, res) => {
  try {
    const existEmail = await Patient.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      return res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      const patient = new Patient(req.body);
      const data = await patient.save();

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
// [PATCH] /api/patient/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const existEmail = await Patient.findOne({
      email: req.body.email,
      deleted: false,
    });

    // Nếu tồn tại existEmail và _id của nó khác với id đang cập nhật
    if (existEmail && existEmail._id.toString() !== id) {
      return res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      await Patient.updateOne({ _id: id }, req.body);
      res.json({
        code: 200,
        message: "Cập nhật thành công!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại!",
    });
  }
};

// [PATCH] /api/patient/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Patient.updateOne(
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
// [PATCH] /api/patient/restored/:id
module.exports.restored = async (req, res) => {
  try {
    const id = req.params.id;
    await Patient.updateOne(
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
