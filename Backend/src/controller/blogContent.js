const { Blog, BlogContent } = require("../model/blog");

const createBlogContent = async (req, res) => {
  let { blog, content, content_type } = req.body;
  if (!blog || !content || !content_type) {
    return res.status(401).json({ error: "All Fields Required" });
  }

  blog = await Blog.findById(blog);
  if (!blog) return res.status(401).json({ error: "Invalid Blog ID" });

  // check blogs user

  let blogContent = BlogContent(req.body);
  blogContent = await blogContent.save();

  blog.content.push(blogContent)
  await blog.save()

  return res.status(201).json({ blogContent });
};

module.exports = { createBlogContent };
