const multer = require('multer');

const storeUserimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/userImages/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const uploadImage = multer({
    storage: storeUserimg,
}).single("image");

module.exports = {
    uploadImage
}