module.exports = (query) => {
  let objectSearch = {
    keyword: "",
    regex: "",
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    const regex = new RegExp(objectSearch.keyword, "i"); // 'i' để không phân biệt hoa thường
    objectSearch.regex = regex;
  }

  return objectSearch;
};
