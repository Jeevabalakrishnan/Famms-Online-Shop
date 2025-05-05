const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: './uploads/', // ✅ Images stored here
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ✅ Save with timestamp + extension
    }
});

const upload = multer({ storage });

module.exports = upload;
