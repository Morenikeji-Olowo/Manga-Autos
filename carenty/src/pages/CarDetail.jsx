import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import carService from "../services/carsService";
import {
  Heart,
  Share2,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Settings,
  Shield,
  Award,
  Check,
  X,
  Phone,
  MessageCircle,
  Clock,
  Users,
  Zap,
  Sparkles,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import WishlistButton from "../components/ui/WishlistButton";
import ShareButton from "../components/ui/ShareButton";
import ChatOnWhatsApp from "../components/ui/ChatOnWhatsApp";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [similarCars, setSimilarCars] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const data = await carService.getCarById(id);
        setCar(data.car);
        const similar = await carService.getSimilarCars(
          id,
          data.make,
          data.model,
        );
        setSimilarCars(similar);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <div className="flex items-center justify-center h-screen pt-20 px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500 font-body">
              Loading vehicle details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen pt-20 px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-body">Vehicle not found</p>
            <Link
              to="/cars"
              className="mt-4 inline-block text-gray-900 underline font-body"
            >
              Back to listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const details = car.basicDetails || {};

  // Mobile tab selector component
  const MobileTabSelector = () => (
    <div className="lg:hidden mb-4">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100"
      >
        <span className="font-medium text-gray-900 capitalize">
          {activeTab}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
          {["overview", "specifications", "features", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 text-left capitalize ${activeTab === tab ? "bg-gray-50 text-gray-900 font-medium" : "text-gray-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb - Responsive */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-1 text-xs sm:text-sm font-body overflow-x-auto whitespace-nowrap">
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/cars" className="text-gray-500 hover:text-gray-900">
              Cars
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {car.make} {car.model}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Mobile: Back button */}
        <Link
          to="/cars"
          className="lg:hidden inline-flex items-center gap-1 text-sm text-gray-500 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* LEFT COLUMN - Image Gallery (Fully Responsive) */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={
                  car.images?.[selectedImage] ||
                  `https://placehold.co/800x600/e5e5e5/666?text=${car.make}+${car.model}`
                }
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />

              {/* Action Buttons - Responsive positioning */}
              <div className="absolute top-3 right-3 flex gap-2">
                <WishlistButton carId={car._id} size="md" />
                <ShareButton car={car} />
              </div>
            </div>

            {/* Thumbnail Strip - Horizontal scroll on mobile */}
            {car.images?.length > 1 && (
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-gray-900 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Cards - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gray-500 mb-1 sm:mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Year</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  {details.year || "—"}
                </p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gray-500 mb-1 sm:mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Mileage</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  {details.mileage?.toLocaleString() || "—"} km
                </p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gray-500 mb-1 sm:mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Fuel</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
                  {details.fuelType || "—"}
                </p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gray-500 mb-1 sm:mb-1.5" />
                <p className="text-xs text-gray-500 font-body">Transmission</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
                  {details.transmission || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Car Information (Responsive) */}
          <div>
            {/* Title & Price - Stack on mobile */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 sm:mt-2 font-body">
                    {details.year} •{" "}
                    {details.condition === "excellent"
                      ? "✨ Excellent Condition"
                      : details.condition === "good"
                        ? "✓ Good Condition"
                        : "Premium Vehicle"}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    ₦{car.price?.toLocaleString()}
                  </p>
                  {car.negotiable && (
                    <p className="text-xs sm:text-sm text-green-600 font-medium mt-1">
                      Price negotiable
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location & Status - Wrap on mobile */}
            <div className="flex flex-wrap items-center gap-2 text-gray-500 mb-6 pb-4 sm:pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-body">
                  {car.currentLocation || "Lagos, Nigeria"}
                </span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden xs:inline-block"></span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-body">
                  Listed {new Date(car.listedDate).toLocaleDateString()}
                </span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden xs:inline-block"></span>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-body">
                  {car.views || 0} views
                </span>
              </div>
            </div>

            {/* Tabs Navigation - Desktop */}
            <div className="hidden lg:block border-b border-gray-200 mb-6">
              <div className="flex gap-6 lg:gap-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "specifications", label: "Specifications" },
                  { id: "features", label: "Features" },
                  { id: "history", label: "History" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition-colors font-body ${
                      activeTab === tab.id
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Tab Selector */}
            <MobileTabSelector />

            {/* Tab Content - Responsive height */}
            <div className="mb-6 sm:mb-8 min-h-[280px] sm:min-h-[320px]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-body">
                    {car.description ||
                      `Experience luxury and performance with this ${details.year} ${car.make} ${car.model}. 
                    This well-maintained vehicle offers exceptional comfort, advanced technology features, and outstanding reliability.`}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">
                          Engine
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {details.engineSize || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">
                          Seating
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          5 Seats
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-body">
                          Condition
                        </p>
                        <p className="text-sm font-semibold text-gray-900 capitalize">
                          {details.condition || "Excellent"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  {car.benefits?.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                        ✨ Special Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {car.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-lg text-xs sm:text-sm text-gray-700"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications Tab - Responsive grid */}
              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <SpecItem label="Make" value={car.make} />
                  <SpecItem label="Model" value={car.model} />
                  <SpecItem label="Year" value={details.year} />
                  <SpecItem
                    label="Mileage"
                    value={
                      details.mileage
                        ? `${details.mileage.toLocaleString()} km`
                        : "—"
                    }
                  />
                  <SpecItem
                    label="Fuel Type"
                    value={
                      details.fuelType ? details.fuelType.toUpperCase() : "—"
                    }
                  />
                  <SpecItem
                    label="Transmission"
                    value={
                      details.transmission
                        ? details.transmission.toUpperCase()
                        : "—"
                    }
                  />
                  <SpecItem
                    label="Engine Size"
                    value={details.engineSize || "—"}
                  />
                  <SpecItem
                    label="Drivetrain"
                    value={
                      details.drivetrain
                        ? details.drivetrain.toUpperCase()
                        : "—"
                    }
                  />
                  <SpecItem
                    label="Exterior Color"
                    value={details.exteriorColor || "—"}
                  />
                  <SpecItem
                    label="Interior Color"
                    value={details.interiorColor || "—"}
                  />
                  {details.vin && (
                    <SpecItem
                      label="VIN"
                      value={details.vin}
                      className="font-mono text-xs"
                    />
                  )}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="space-y-4 sm:space-y-6">
                  {car.comfort?.length > 0 && (
                    <FeatureSection
                      title="Comfort & Convenience"
                      icon={Settings}
                      items={car.comfort}
                    />
                  )}
                  {car.safety?.length > 0 && (
                    <FeatureSection
                      title="Safety"
                      icon={Shield}
                      items={car.safety}
                    />
                  )}
                  {car.multimedia?.length > 0 && (
                    <FeatureSection
                      title="Multimedia"
                      icon={Award}
                      items={car.multimedia}
                    />
                  )}
                  {car.security?.length > 0 && (
                    <FeatureSection
                      title="Security"
                      icon={Shield}
                      items={car.security}
                    />
                  )}
                </div>
              )}

              {/* Vehicle History Tab */}
              {activeTab === "history" && (
                <div className="space-y-3 sm:space-y-4">
                  <HistoryItem
                    label="Accidents or Damages"
                    value={car.vechicleHistory?.accidentsOrDamages}
                    positiveText="None Reported"
                    negativeText="Reported"
                  />
                  <HistoryItem
                    label="One Owner Vehicle"
                    value={car.vechicleHistory?.oneOwnerVehicle}
                    positiveText="Yes"
                    negativeText="No"
                  />
                  <HistoryItem
                    label="Service History Available"
                    value={car.vechicleHistory?.serviceHistoryAvailable}
                    positiveText="Available"
                    negativeText="Not Available"
                  />
                  <HistoryItem
                    label="Imported Vehicle"
                    value={car.vechicleHistory?.importedVehicle}
                    positiveText="Foreign Used"
                    negativeText="Local Used"
                  />

                  <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900 text-sm sm:text-base">
                          Vehicle History Verified
                        </p>
                        <p className="text-xs text-green-700 mt-0.5">
                          Reviewed by our team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Buttons - Full width on mobile */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium font-body text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Show Contact
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700 font-body text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Similar Cars Section - Responsive grid */}
        {similarCars.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Similar Cars
                </h2>
                <p className="text-sm text-gray-500 mt-1 font-body">
                  You might also like these vehicles
                </p>
              </div>
              <Link
                to="/cars"
                className="text-sm text-gray-600 hover:text-gray-900 font-body"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarCars.slice(0, 4).map((similarCar) => (
                <SimilarCarCard key={similarCar._id} car={similarCar} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal - Responsive */}
      {showContactModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowContactModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md z-50 mx-4">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Contact Seller
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-body">
                      Phone Number
                    </p>
                    <p className="text-sm sm:text-base font-semibold">
                      +234 913 322 5255
                    </p>
                  </div>
                </div>
                <ChatOnWhatsApp car={car} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper Components (Responsive versions)
function SpecItem({ label, value, className = "" }) {
  return (
    <div className="py-2">
      <p className="text-xs text-gray-500 font-body">{label}</p>
      <p className={`text-sm font-medium text-gray-900 mt-0.5 ${className}`}>
        {value || "—"}
      </p>
    </div>
  );
}

function FeatureSection({ title, icon: Icon, items }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <Icon className="w-4 h-4 text-gray-500" />
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-body"
          >
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryItem({ label, value, positiveText, negativeText }) {
  const isPositive = value === true;
  const isNegative = value === false;

  let displayText = "—";
  let textColor = "text-gray-600";

  if (isPositive) {
    displayText = positiveText;
    textColor = "text-green-600";
  } else if (isNegative) {
    displayText = negativeText;
    textColor = value !== undefined ? "text-gray-600" : "text-gray-400";
  }

  return (
    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-2 py-2 sm:py-3 border-b border-gray-100">
      <span className="text-xs sm:text-sm text-gray-600 font-body">
        {label}
      </span>
      <span className={`text-xs sm:text-sm font-medium ${textColor}`}>
        {displayText}
      </span>
    </div>
  );
}

function SimilarCarCard({ car }) {
  const details = car.basicDetails || {};

  return (
    <Link to={`/cars/${car._id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={
              car.images?.[0] ||
              `https://placehold.co/400x300/e5e5e5/666?text=${car.make}`
            }
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            {car.make} {car.model}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {details.year} • {details.mileage?.toLocaleString()} km
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">
            ₦{car.price?.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {car.currentLocation?.split(",")[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
