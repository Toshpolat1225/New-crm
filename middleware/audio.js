const multer = require('multer')
const moment = require('moment')

// const uploadDest = 'public/media/';
// const allowedMimeTypes = ['audio/wav', 'audio/mp3'];
// const filter = function (req, file, cb) {
//   if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
//     cb(null, false);
//   }
//   cb(null, true);
// };

// var upload = multer({
//   dest: uploadDest,
//   fileFilter: filter,
// });

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/audio')
    },
    filename: (req, file, cb) => {
        const date = moment().format('DDMMYYYY-HHmmss-sss')
        cb(null, `${date}-${file.originalname}`)
    }
})

const allowedTypes = ['audio/wav', 'image/mp3']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter,
});