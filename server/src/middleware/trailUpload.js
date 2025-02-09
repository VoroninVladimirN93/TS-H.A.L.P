const multer = require('multer');
const path = require('path');
const transliterate = require('transliteration').slugify;

// Директория для хранения изображений трейла
const storageDir = path.resolve(__dirname, '..', 'public', 'images', 'trails');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    const title = transliterate(req.body.title || 'default-trail', {
      lowercase: true,
      separator: '_',
    });
    const ext = path.extname(file.originalname);
    const uniqueName = `${title}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/bmp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение на размер файла (5 МБ)
});

module.exports = upload;