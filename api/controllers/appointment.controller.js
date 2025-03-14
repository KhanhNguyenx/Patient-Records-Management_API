const Appointment = require("../models/appointment.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");
// [GET] /api/appointment/getList
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
  const countAppointment = await Appointment.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countAppointment
  );
  // End Pagination

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  const appointment = await Appointment.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(appointment);
};
// [GET] /api/appointment/getById/:id
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Appointment.findOne({
      _id: id,
      deleted: false,
    });

    res.json(result);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};
// [POST] /api/appointment/create
module.exports.create = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const data = await appointment.save();

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
// [PATCH] /api/appointment/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Appointment.updateOne(
      {
        _id: id,
      },
      req.body
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
      data: req.body,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại!",
    });
  }
};
// [PATCH] /api/appointment/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Appointment.updateOne(
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
// [PATCH] /api/appointment/restore/:id
module.exports.restore = async (req, res) => {
  try {
    const id = req.params.id;
    await Appointment.updateOne(
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
