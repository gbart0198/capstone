const path = require('path');
const multer = require('multer');

module.exports = folderName => {
    return multer({
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if (
                ext !== ".png" &&
                ext !== ".jpg" &&
                ext !== ".gif" && 
                ext !== ".jpeg"
            ) {
                return cb(new Error("Only images allowed."));
            }
            cb(null, true);
        },
        dest: `../CapstoneFrontend/src/assets/${folderName}/`,
        filename: (req, file, cb) => {
            cb(null, file.originalname + '.png');
        }
    });
};