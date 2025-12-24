const multer = require('multer');
const path = require('path');

function sanitize(str) {
  return str.replace(/[^a-z0-9.\-_]/gi, '_');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + sanitize(file.originalname);
    cb(null, name);
  }
});

const fileFilter = function(req, file, cb){
  const ext = path.extname(file.originalname).toLowerCase();
  if(['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) cb(null, true);
  else cb(new Error('Images uniquement'));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});
