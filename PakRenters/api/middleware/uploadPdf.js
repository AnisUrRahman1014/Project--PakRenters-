const multer = require("multer");
const path = require("path");

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pdf/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only PDF is allowed!"), false);
  }
};

const uploadPDF = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = uploadPDF;
