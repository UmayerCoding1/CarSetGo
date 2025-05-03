import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/upload')
    },

    filename:(req,file,cb) => {
        cb(null, `carSetGo-${file.fieldname}-${file.originalname}`)
    }
});

 export const upload = multer({storage});