    import Car from "../models/Car.js";
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

    const userController = {
      getAllCars,
      getCarById,
      searchCars,
    };
    export default userController;
