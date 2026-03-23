import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const fileFilter = (req, res, cb)=>{
    const allowed = ["image/png", "image/jpeg", "image/jpg"];

    if(allowed.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(new Error("Invalid file type"), false)
    }
}
    
const multerUpload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024,
        files: 15
    }
})

const uploadToCloudinary = async (req, res, next )=>{
    try{
        if(!req.files || req.files.length === 0){
            req.uploadedImages = [];
            return next();
        }
        const uploadPromises = req.files.map((file)=>{
            return new Promise((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream({
                    folder: "carsales/Listings",
                    resource_type: "image",
                    transformation: [
                        {width: 1200, crop: "scale"},
                        {quality: "auto"},
                        {fetch_format: "auto"}
                    ],
                },

                (error, result)=>{
                    if(error) return reject(error);
                    resolve(result.secure_url);
                }
            );

            stream.end(file.buffer);
            });
        });

        const urls = await Promise.all(uploadPromises);
        req.uploadedImages = urls;
        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "upload failed",
            error: error.message
        })
    }
    
}


export const deleteFromCloudinary = async (imageUrl) => {
  try {
    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) return;
 
    const publicIdWithVersion = parts[1];
    const withoutVersion = publicIdWithVersion.replace(/^v\d+\//, "");
    const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
 
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("[cloudinary] Failed to delete image:", error.message);
  }
};

export { multerUpload, uploadToCloudinary };