const { body, validationResult } = require("express-validator");

const validateBlog = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage("Title must be between 5 and 100 characters"),

  body("body")
    .notEmpty().withMessage("Body is required")
    .trim()
    .isLength({ min: 20 }).withMessage("Body must be at least 20 characters"),

  body("tags")
    .optional()
    .custom((value) => {
      if (typeof value !== "string") {
        throw new Error("Tags must be a string");
      }
      const tagsArray = value.split(",").map(tag => tag.trim());
      if (tagsArray.some(tag => tag.length > 20)) {
        throw new Error("Each tag must be at most 20 characters");
      }
      return true;
    }),

  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ errors: [{ msg: "Image is required" }] });
    }
    
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ errors: [{ msg: "Invalid image type. Only JPG, JPEG, and PNG are allowed." }] });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({ errors: [{ msg: "Image must be smaller than 2MB" }] });
    }

    next();
  }
];

module.exports = validateBlog;
