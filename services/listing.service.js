import Car from "../models/Car.js";

export const builFilter = (query) => {
  const filter = {};
  if (query.status && query.status !== "all") {
    filter.status = query.status;
  }
  if (query.make) filter.make = { $regex: query.make, $options: "i" };
  if (query.model) filter.model = { $regex: query.model, $options: "i" };
  if (query.location)
    filter.currentLocation = { $regex: query.location, $options: "i" };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.year) filter["basicDetails.year"] = Number(query.year);
  if (query.transmission)
    filter["basicDetails.transmission"] = query.transmission;
  if (query.fuelType) filter["basicDetails.fuelType"] = query.fuelType;
  if (query.condition) filter["basicDetails.condition"] = query.condition;

  if (query.used !== undefined) filter.used = query.used === "true";
  if (query.negotiable) filter.negotioable = query.negotiable === "true";

  if (query.search)
    filter.$text = {
      $search: query.search,
      $caseSensitive: false,
      $diacriticSensitive: false,
    };

  return filter;
};

export const buildSort = (query) => {
  const sorts = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    mostViewed: { views: -1 },
  };

  return sorts[query.sort] || { createdAt: -1 };
};

export const getAllListings = async (query) => {
  const filter = builFilter(query);
  const sort = buildSort(query);

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);
  const skip = (page - 1) * limit;

  const [total, listings] = await Promise.all([
    Car.countDocuments(filter),
    Car.find(filter).sort(sort).skip(skip).limit(limit).select("-__v").lean(),
  ]);

  return {
    listings,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };
};

export const getListingById = async (id) => {
  const listing = await Car.findById(id).select("-__v").lean();
  if (!listing) {
    const error = new Error("Car not found");
    error.status = 404;
    throw error;
  }
  return listing;
};

export const incrementViews = async (id) => {
  await Car.findByIdAndUpdate(id, { $inc: { views: 1 } });
};

export const createListing = async (data, adminId) => {
  const listing = await Car.create({ ...data, postedBy: adminId });
  return listing;
};

export const updateListing = async (id, data) => {
  const structured = {
    name: data.name,
    make: data.make,
    model: data.model,
    price: data.price,
    negotiable: data.negotiable,
    status: data.status,
    used: data.used,
    currentLocation: data.currentLocation,
    description: data.description,
    images: data.images,
    comfort: data.comfort,
    multimedia: data.multimedia,
    safety: data.safety,
    security: data.security,
    benefits: data.benefits,

    basicDetails: {           // <-- replace this whole block
      year: data.year || undefined,
      mileage: data.mileage || undefined,
      fuelType: data.fuelType || undefined,
      transmission: data.transmission || undefined,
      engineSize: data.engineSize || undefined,
      drivetrain: data.drivetrain || undefined,
      condition: data.condition || undefined,
      exteriorColor: data.exteriorColor || undefined,
      interiorColor: data.interiorColor || undefined,
      grade: data.grade || undefined,
      speed: data.speed || undefined,
      vin: data.vin || undefined,
      plateNumber: data.plateNumber || undefined,
      isElectric: data.isElectric || undefined,
    },

    vechicleHistory: {
      accidentsOrDamages: data.accidentsOrDamages,
      oneOwnerVehicle: data.oneOwnerVehicle,
      personalUseOnly: data.personalUseOnly,
      serviceHistoryAvailable: data.serviceHistoryAvailable,
      importedVehicle: data.importedVehicle,
    },
  };

  const listing = await Car.findByIdAndUpdate(id, structured, {
    returnDocument: 'after',  // fixes the mongoose deprecation warning too
    runValidators: true,
  });

  if (!listing) {
    const error = new Error("Car not found");
    error.statusCode = 404;
    throw error;
  }
  return listing;
};

export const deleteListing = async (id) => {
  const listing = await Car.findByIdAndDelete(id);
  if (!listing) {
    const error = new Error("Car not found");
    error.statusCode = 404;
    throw error;
  }
  return listing;
};

export const markAsSold = async (id) => {
  return updateListing(id, { status: "sold" });
};

export const getListingsByStatus = async (status, query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Number(query.limit) || 12);
  const skip = (page - 1) * limit;

  const [total, listings] = await Promise.all([
    Car.countDocuments({ status }),
    Car.find({ status })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean(),
  ]);

  return {
    listings,
    pagination: { total, page, pages: Math.ceil(total / limit), limit },
  };
};
