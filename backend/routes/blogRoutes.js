const express = require("express");
const { createBlog, getAllBlogs, getUserBlogs, deleteBlog, getSingleBlog , updateBlog , SearchBlogs } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const validateBlog = require("../validators/blogValidator");
const multer = require("multer");

const router = express.Router();

// ✅ Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the uploads folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Define routes
router.get("/", getAllBlogs);
router.get("/search", SearchBlogs);
router.get("/my-blogs", authMiddleware, getUserBlogs);
router.get("/:id", getSingleBlog);
router.post("/", authMiddleware, upload.single("image"), validateBlog, createBlog);
router.put("/:id", authMiddleware, upload.single("image"), validateBlog, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
