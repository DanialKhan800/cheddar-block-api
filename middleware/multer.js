import multer from 'multer';

export const filestoreage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './images')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})

// module.exports=filestoreage;
// export default filestoreage;