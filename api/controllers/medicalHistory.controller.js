const medicalHistory = require("../models/medicalHistory.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");

// [GET] /api/medicalhistory/getList
module.exports.getList = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Tạo điều kiện tìm kiếm từ keyword
  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.$or = [
      { status: objectSearch.regex },
      { reason: objectSearch.regex },
      { appointmentDate: objectSearch.regex },
    ];
  }

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 5,
  };
  const count = await medicalHistory.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    count
  );
  // End Pagination

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  const records = await medicalHistory.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(records);
};
// [GET] /api/medicalhistory/getById/:id
module.exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await medicalHistory.findOne({
      _id: id,
      deleted: false,
    });

    res.json(result);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};
// [POST] /api/medicalhistory/create
module.exports.create = async (req, res) => {
  try {
    const record = new medicalHistory(req.body);
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
// [PATCH] /api/medicalhistory/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await medicalHistory.updateOne(
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
// [PATCH] /api/medicalhistory/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await medicalHistory.updateOne(
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
// [PATCH] /api/medicalhistory/restore/:id
module.exports.restore = async (req, res) => {
  try {
    const id = req.params.id;
    await medicalHistory.updateOne(
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
