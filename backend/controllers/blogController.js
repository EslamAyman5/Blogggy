const Blog = require("../models/Blog");

// ✅ Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; 

    const newBlog = new Blog({
      title,
      body,
      image,
      tags: tags ? tags.split(",") : [],
      author: req.user.id,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Blog
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error in getSingleBlog:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get User's Blogs
const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).populate("author", "name");

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error in getUserBlogs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// ✅ Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Blog Author ID:", blog.author);  // Debugging
    console.log("Authenticated User ID:", req.user.id);  // Debugging

    // Ensure both IDs are in the same format (String comparison)
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You are not the author of this blog." });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error in deleteBlog:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update Blog
const updateBlog = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You are not the author of this blog." });
    }

    blog.title = title || blog.title;
    blog.body = body || blog.body;
    blog.tags = tags ? tags.split(",") : blog.tags;
    if (image !== undefined) blog.image = image;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Search Blog
const SearchBlogs = async (req, res) => {
  try {
    const query = req.query.query;
    
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { body: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ]
    }).populate("author", "name");

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export all functions
module.exports = { createBlog, getAllBlogs, getUserBlogs, deleteBlog , getSingleBlog , updateBlog , SearchBlogs };
