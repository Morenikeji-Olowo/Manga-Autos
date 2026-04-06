import { deleteFromCloudinary } from "../middlewares/upload.middleware.js";
import { createListing, deleteListing, getAllListings, getListingById, markAsSold, updateListing } from "../services/listing.service.js"


export const createCar = async (req, res) => {
  try {
    const data = {
      ...req.body,
      images: req.uploadedImages || [],
    };

    const listing = await createListing(data, req.user._id);
    res.status(201).json({
      success: true,
      message: "Car listed Successfully",
      listing: listing,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error listing car",
      error: error.message,
    });
  }
};

export const getCarById = async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);
    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}
export const updateCar = async (req, res) => {
  try {
    const existing = await getListingById(req.params.id);
 
    let removeImages = [];
    if (req.body.removeImages) {
      try {
        removeImages = JSON.parse(req.body.removeImages);
      } catch {
        removeImages = [];
      }
    }
 
    if (removeImages.length > 0) {
      await Promise.all(removeImages.map((url) => deleteFromCloudinary(url)));
    }
 
    // Build updated images array:
    // keep existing except removed ones, then add newly uploaded ones
    const keptImages = existing.images.filter((url) => !removeImages.includes(url));
    const newImages = req.uploadedImages || [];
    const updatedImages = [...keptImages, ...newImages];
 
    const data = {
      ...req.body,
      images: updatedImages,
    };
 
    // Clean up — removeImages is not a Car schema field
    delete data.removeImages;
 
    const listing = await updateListing(req.params.id, data);
    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      listing,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

//delete car
export const deleteCar = async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);
 
    // Delete all images from Cloudinary before removing the DB record
    if (listing.images?.length > 0) {
      await Promise.all(listing.images.map((url) => deleteFromCloudinary(url)));
    }
 
    await deleteListing(req.params.id);
    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

export const manageCars = async (req, res) => {
  console.log('Query received:', req.query)
  try {
    const result = await getAllListings(req.query)
    res.status(200).json({
      success: true,
      ...result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


export const markCarAsSold = async (req, res)=>{
    try{
        const listing = await markAsSold(req.params.id);
        res.status(200).json({
            success: true,
            message: "Car marked as sold successfully",
            listing: listing
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateCarStatus = async (req, res) =>{
    try{
        const {status} = req.body;
        const allowed = ["active", "inactive", "draft"];

        if(!allowed.includes(status)){
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            })
        }

        const listing = await updateListing(req.params.id, {status});
        res.status(200).json({
            success: true,
            message: "Car status updated successfully",
            listing: listing
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })  
    }
}