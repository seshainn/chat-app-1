import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/assets"),
    filename: (req, file, cb) => cb(null, req.body.picName),
});

export const upload = multer({ storage: storage });
