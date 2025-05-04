const { BlogCategory, Blog } = require("../model/blog");
const { v4: uuidv4 } = require("uuid");

const getBlog = async (req, res) => {
  // all blogs
  let { search, ...restQuery } = req.query;
  restQuery = {
    ...restQuery,
    title: new RegExp(search, "i"),
  };

  let blogs = await Blog.find(restQuery).populate('content')
  return res.status(200).json({ status: "Fetched Blogs", blogs });
};
const createBlog = async (req, res) => {
  const { user } = req;
  let { category, title } = req.body;

  category = await BlogCategory.findById(category);
  if (!category) return res.status(401).json({ error: "Invalid Category _ID" });

  if (!title || title?.split(" ")?.length < 3)
    return res.status(401).json({ error: "Pass the correct title" });

  let url = title?.toLowerCase().split(" ").join("-");
  const isUrlExist = await Blog.findOne({ url });
  if (isUrlExist) {
    url = `${url}-${uuidv4().toString().slice(0, 6)}`;
  }

  const data = {
    category,
    author: user._id,
    title,
    url,
  };

  const blog = Blog(data);
  await blog.save();

  return res.status(200).json({ status: "Cteated Blog", blog });
};
const updateBlog = async (req, res) => {
  const { _id } = req.query;
  let blog = await Blog.findById(_id);
  if (!blog) return res.status(404).json({ error: "Invalid Blog Id" });

  if(blog.author.toString() !== req.user._id.toString()){
    return res.status(404).json({ error: "You are not auth to update this blog" });
  }

  return res.status(200).json({ status: "Updated Blog" });
};
const deleteBlog = async (req, res) => {
  const { _id } = req.query;
  let blog = await Blog.findById(_id);
  if (!blog) return res.status(404).json({ error: "Invalid Blog Id" });

  if(blog.author.toString() !== req.user._id.toString()){
    return res.status(404).json({ error: "You are not auth to update this blog" });
  }

  await Blog.findByIdAndDelete(_id)

  return res.status(200).json({ status: "Deleted Blog" });
};

module.exports = { getBlog, createBlog, updateBlog, deleteBlog };

// read,
// update
