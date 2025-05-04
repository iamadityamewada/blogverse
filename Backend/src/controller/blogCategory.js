const { BlogCategory } = require("../model/blog");

const getCategory = async (req, res) => {
  const { _id } = req.query;
  let categories = null
  if(_id){
      categories = await BlogCategory.findById(_id)
  } else {
    categories = await BlogCategory.find();
  }

  return res
    .status(201)
    .json({ status: "Category fetched Successfully.", categories });
};

const createCategory = async (req, res) => {
  let category = BlogCategory(req.body);
  category = await category.save();
  return res
    .status(201)
    .json({ status: "Category Created Successfully.", category });
};

const updateCategory = async (req, res) => {
  const { _id } = req.query;
  await BlogCategory.findByIdAndUpdate(_id, req.body)
  return res.status(201).json({ status: "Category Updated Successfully." });
};

const deleteCategory = async (req, res) => {
  const { _id } = req.query;
  await BlogCategory.findByIdAndDelete(_id)
  return res.status(201).json({ status: "Category Deleted Successfully." });
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
