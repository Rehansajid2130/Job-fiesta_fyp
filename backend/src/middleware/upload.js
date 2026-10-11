const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure destination upload directories exist
const uploadDir = path.join(__dirname, '../../uploads/resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure disk storage with unique, sanitized filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `resume-${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

// Enforce strict file extensions and MIME types
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/octet-stream', // Some clients send binary as octet-stream
  ];

  if (allowedExtensions.includes(ext) && (allowedMimeTypes.includes(file.mimetype) || ext === '.pdf' || ext === '.txt')) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type '${ext}'. Please upload a valid PDF, DOCX, or TXT file.`));
  }
};

// 5MB maximum file size limit
const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Megabytes
  },
});

module.exports = {
  uploadResume,
  uploadDir,
};
