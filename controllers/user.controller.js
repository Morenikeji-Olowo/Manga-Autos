import Car from "../models/Car.js";
import User from "../models/User.js";
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ listedAt: -1 });
    res.status(200).json({
      message: "Cars fetched successfully",
      listings: cars,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cars",
      error: error,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(400).json({
        message: "Car not found",
      });
    }
    res.status(200).json({
      message: "Car fetched successfully",
      car: car,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching car",
      error: error,
    });
  }
};

const searchCars = async (req, res) => {
  try {
    const { used, priceMin, priceMax, location, year, fuelType, transmission } =
      req.query;
    let filter = {};

    if (used) {
      filter.used = used === "true";
    }

    if (location) {
      filter.currentLocation = location;
    }

    if (year) {
      filter["basicDetails.year"] = Number(year);
    }

    if (fuelType) {
      filter["basicDetails.fuelType"] = fuelType;
    }

    if (transmission) {
      filter["basicDetails.transmission"] = transmission;
    }

    if (priceMin || priceMax) {
      filter.price = {};

      if (priceMin) {
        filter.price.$gte = Number(priceMin);
      }

      if (priceMax) {
        filter.price.$lte = Number(priceMax);
      }
    }

    const cars = await Car.find(filter).sort({ listedAt: -1 });
    if (cars.length === 0) {
      return res.status(404).json({
        message: "No cars found matching your search",
      });
    }
    res.status(200).json({
      message: "Cars Fetched Successfully",
      cars: cars,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error searching cars",
      error: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        wishlist: req.body.carId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Car added to wishlist",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding car to wishlist",
      error: err.message,
    });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        wishlist: req.body.carId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Car removed from wishlist",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error removing car from wishlist",
      error: err.message,
    });
  }
};
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
      error: err.message,
    });
  }
};
const userController = {
  getAllCars,
  getCarById,
  searchCars,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
export default userController;
