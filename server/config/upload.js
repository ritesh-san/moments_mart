const multer  = require('multer');

const DIR = './public/';

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null,Date.now()+'_'+fileName);
        }
    });

const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
        // limits:{fileSize:100000}
    });

module.exports = upload;