const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema(
  {
    title: String,
    total_blogs: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "blog_category",
  }
);

const BlogSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      require: true,
      unique: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: String,
    url: {
      type: String,
      trim: true,
      unique: true,
    },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogContent" }],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "blogs",
  }
);

const BlogContentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      require: true,
      unique: false,
    },
    content: {
      type: String,
    },
    content_type: {
      type: String,
      enum: ["image", "text", "code"],
    },
  },
  {}
);

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);
const Blog = mongoose.model("Blog", BlogSchema);
const BlogContent = mongoose.model("BlogContent", BlogContentSchema);

module.exports = { Blog, BlogCategory, BlogContent };
