import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import {
  Heart,
  Trash2,
  ShoppingBag,
  Clock,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertCircle,
  ShoppingCart,
  TrendingUp,
  Sparkles,
  Award,
  Shield,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import userService from "../services/userService";

export default function SavedCars() {
  const [savedCars, setSavedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    fetchSavedCars();
  }, []);

  const fetchSavedCars = async () => {
    setIsLoading(true);
    try {
      const res = await userService.getWishlist();
      setSavedCars(res.wishlist || []); // ← res.wishlist not res.data.wishlist
    } catch (error) {
      console.error("Error fetching saved cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (carId) => {
    try {
      await userService.removeFromWishlist(carId);
      setSavedCars(savedCars.filter((car) => car._id !== carId));
      setSelectedCars(selectedCars.filter((id) => id !== carId));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove car");
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedCars.length === 0) return;

    try {
      // await wishlistService.removeMultiple(selectedCars)
      setSavedCars(savedCars.filter((car) => !selectedCars.includes(car._id)));
      setSelectedCars([]);
      toast.success(`${selectedCars.length} cars removed from wishlist`);
    } catch (error) {
      toast.error("Failed to remove cars");
    }
  };

  const toggleSelectCar = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId],
    );
  };

  const toggleSelectAll = () => {
    if (selectedCars.length === savedCars.length) {
      setSelectedCars([]);
    } else {
      setSelectedCars(savedCars.map((car) => car._id));
    }
  };

  // Filter and sort logic
  const filteredCars = savedCars.filter((car) => {
    if (filter === "new") return car.used === false;
    if (filter === "used") return car.used === true;
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "price_low") return a.price - b.price;
    return 0;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen pt-20 px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Login to view your wishlist
            </h2>
            <p className="text-gray-500 mb-6">
              Save your favorite cars and access them anytime
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
            >
              Log In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-500 mt-1">
                {savedCars.length} {savedCars.length === 1 ? "car" : "cars"}{" "}
                saved
              </p>
            </div>

            <div className="flex gap-3">
              {selectedCars.length > 0 && (
                <button
                  onClick={handleRemoveSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-medium text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove ({selectedCars.length})
                </button>
              )}

              <Link
                to="/cars"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Browse More Cars
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Buttons */}
              <div className="flex gap-2">
                {[
                  { id: "all", label: "All Cars", count: savedCars.length },
                  {
                    id: "new",
                    label: "Brand New",
                    count: savedCars.filter((c) => c.used === false).length,
                  },
                  {
                    id: "used",
                    label: "Local Used",
                    count: savedCars.filter((c) => c.used === true).length,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-medium transition
                      ${
                        filter === item.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }
                    `}
                  >
                    {item.label} ({item.count})
                  </button>
                ))}
              </div>

              {/* Select All Checkbox */}
              {savedCars.length > 0 && (
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedCars.length === savedCars.length &&
                      savedCars.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  Select All
                </label>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                <option value="newest">Newest Added</option>
                <option value="oldest">Oldest Added</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 px-3 text-sm transition ${viewMode === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-600"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 px-3 text-sm transition ${viewMode === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-600"}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Grid/List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your wishlist...</p>
          </div>
        ) : sortedCars.length === 0 ? (
          <EmptyWishlist />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedCars.map((car) => (
              <WishlistCard
                key={car._id}
                car={car}
                isSelected={selectedCars.includes(car._id)}
                onSelect={() => toggleSelectCar(car._id)}
                onRemove={() => handleRemove(car._id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCars.map((car) => (
              <WishlistListItem
                key={car._id}
                car={car}
                isSelected={selectedCars.includes(car._id)}
                onSelect={() => toggleSelectCar(car._id)}
                onRemove={() => handleRemove(car._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Grid View Card Component
function WishlistCard({ car, isSelected, onSelect, onRemove }) {
  const details = car.basicDetails || {};

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <label className="relative cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
        </label>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/95 backdrop-blur rounded-full hover:bg-red-50 transition shadow-sm group-hover:opacity-100"
      >
        <Trash2 className="w-3.5 h-3.5 text-gray-500 hover:text-red-500 transition" />
      </button>

      <Link to={`/cars/${car._id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={
              car.images?.[0] ||
              `https://placehold.co/600x400/e5e5e5/666?text=${car.make}+${car.model}`
            }
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                {car.make} {car.model}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {details.year || "—"}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500 capitalize">
                  {details.transmission || "—"}
                </span>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₦{car.price?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Fuel className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600 capitalize">
                {details.fuelType || "—"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                {details.mileage?.toLocaleString() || "—"} km
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600 truncate">
                {car.currentLocation?.split(",")[0]}
              </span>
            </div>
          </div>

          {/* Added Date Badge */}
          <div className="mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">
              Added {new Date(car.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// List View Component
function WishlistListItem({ car, isSelected, onSelect, onRemove }) {
  const details = car.basicDetails || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Checkbox */}
        <div className="absolute sm:relative top-3 left-3 sm:top-auto sm:left-auto z-10 sm:flex sm:items-center sm:px-4 sm:py-4">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
          </label>
        </div>

        {/* Image */}
        <Link to={`/cars/${car._id}`} className="block sm:w-48">
          <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
            <img
              src={
                car.images?.[0] ||
                `https://placehold.co/400x300/e5e5e5/666?text=${car.make}`
              }
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1">
              <Link to={`/cars/${car._id}`}>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {car.make} {car.model}
                </h3>
              </Link>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {details.year || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600 capitalize">
                    {details.fuelType || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {details.mileage?.toLocaleString() || "—"} km
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600 capitalize">
                    {details.transmission || "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {car.currentLocation || "Lagos, Nigeria"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ₦{car.price?.toLocaleString()}
              </p>
              {car.negotiable && (
                <p className="text-xs text-green-600 mt-1">Price negotiable</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={onRemove}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
                <Link
                  to={`/cars/${car._id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyWishlist() {
  return (
    <div className="text-center py-16 sm:py-20">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-12 h-12 text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Start saving your favorite cars by clicking the heart icon on any car
        listing
      </p>
      <Link
        to="/cars"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium"
      >
        <ShoppingBag className="w-4 h-4" />
        Browse Cars
      </Link>
    </div>
  );
}
