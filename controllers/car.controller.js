import { getAllListings, getListingById, incrementViews } from "../services/listing.service"

export const getCars = async (req, res) =>{
    try{
        const result = await getAllListings(req.query);
        res.status(200).json({
            success: true,
            ...result
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getCar = async (req, res) =>{
    try{
        const listing = await getListingById(req.params.id);
        incrementViews(req.params.id).catch(()=>{});
        res.status(200).json({
            success: true,
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