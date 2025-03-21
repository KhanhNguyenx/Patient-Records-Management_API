const Prescription = require("../models/prescription.model");
const paginationHelper = require("../../helpers/pagination.helper");
const searchHelper = require("../../helpers/search.helper");

// [GET] /api/prescription/getList
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
    limitItems: 2,
  };
  const countPrescription = await Prescription.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countPrescription
  );
  // End Pagination

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  const prescription = await Prescription.find(find)
    .sort(sort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitItems);

  res.json(prescription);
};
