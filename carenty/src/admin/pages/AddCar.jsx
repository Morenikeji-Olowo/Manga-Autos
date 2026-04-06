import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  Car,
  Settings,
  Camera,
  Cog,
  Shield,
  Heart,
  ChevronRight,
  Save,
  Eye,
} from "lucide-react";
import carService from "../../services/carsService";

const steps = [
  {
    id: 1,
    name: "Listing Basics",
    icon: Car,
    description: "Basic car information",
  },
  {
    id: 2,
    name: "Basic Details",
    icon: Settings,
    description: "Technical specifications",
  },
  { id: 3, name: "Images", icon: Camera, description: "Upload car photos" },
  {
    id: 4,
    name: "Features",
    icon: Cog,
    description: "Comfort & safety features",
  },
  {
    id: 5,
    name: "Vehicle History",
    icon: Shield,
    description: "Vehicle background",
  },
  {
    id: 6,
    name: "Benefits",
    icon: Heart,
    description: "Special offers & benefits",
  },
];

export default function AddCar() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1 - Listing Basics
    name: "",
    make: "",
    model: "",
    price: "",
    negotiable: false,
    status: "active",
    used: true,
    currentLocation: "",
    description: "",

    // Section 2 - Basic Details
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    engineSize: "",
    drivetrain: "",
    condition: "",
    exteriorColor: "",
    interiorColor: "",
    grade: "",
    speed: "",
    vin: "",
    plateNumber: "",

    // Section 3 - Images
    images: [],

    // Section 4 - Features
    comfort: [],
    multimedia: [],
    safety: [],
    security: [],

    // Section 5 - Vehicle History
    accidentsOrDamages: false,
    oneOwnerVehicle: false,
    personalUseOnly: true,
    serviceHistoryAvailable: false,
    importedVehicle: false,

    // Section 6 - Benefits
    benefits: [],
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [tagInputs, setTagInputs] = useState({
    comfort: "",
    multimedia: "",
    safety: "",
    security: "",
    benefits: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, user } = useAuthStore();


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagAdd = (section, value) => {
    if (value && value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [section]: [...prev[section], value.trim()],
      }));
      setTagInputs((prev) => ({ ...prev, [section]: "" }));
    }
  };

  const handleTagRemove = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

const handleSubmit = async () => {
  setIsSubmitting(true)
  try {
    await carService.addCar(formData)
    navigate('/admin/cars')
  } catch (error) {
    console.error('Error saving car:', error)
  } finally {
    setIsSubmitting(false)
  }
}

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ListingBasics
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <BasicDetails
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ImageUpload
            imagePreviewUrls={imagePreviewUrls}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />
        );
      case 4:
        return (
          <FeaturesSection
            formData={formData}
            tagInputs={tagInputs}
            setTagInputs={setTagInputs}
            handleTagAdd={handleTagAdd}
            handleTagRemove={handleTagRemove}
          />
        );
      case 5:
        return (
          <VehicleHistory
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 6:
        return (
          <BenefitsSection
            formData={formData}
            tagInputs={tagInputs}
            setTagInputs={setTagInputs}
            handleTagAdd={handleTagAdd}
            handleTagRemove={handleTagRemove}
          />
        );
      default:
        return null;
    }
  };
  const { icon: Icon } = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/cars"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Add New Car</h1>
              <p className="text-sm text-gray-500">
                Complete the form to list a new vehicle
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Step Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        currentStep >= step.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-500"
                      }
                      ${currentStep === step.id ? "ring-4 ring-gray-200" : ""}
                    `}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.id}
                  </button>
                  <span className="text-xs font-medium mt-2 text-gray-600">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2">
                    <div
                      className={`
                      h-full transition-all duration-300
                      ${currentStep > step.id ? "bg-gray-900" : "bg-gray-200"}
                    `}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                {Icon && <Icon size={20} className="text-white" />}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {steps[currentStep - 1].name}
                </h2>
                <p className="text-sm text-gray-500">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">{renderStepContent()}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`
              px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={18} />
                  Save Car
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              Next
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: Listing Basics Component
export function ListingBasics({ formData, handleInputChange }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Car Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g., BMW M5 Competition"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make *
          </label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => handleInputChange("make", e.target.value)}
            placeholder="e.g., BMW"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => handleInputChange("model", e.target.value)}
            placeholder="e.g., M5"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Location *
          </label>
          <input
            type="text"
            value={formData.currentLocation}
            onChange={(e) =>
              handleInputChange("currentLocation", e.target.value)
            }
            placeholder="e.g., Lagos, Nigeria"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={!formData.used}
            onChange={() => handleInputChange("used", false)}
            className="text-gray-900"
          />
          <span className="text-sm text-gray-700">New</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={formData.used}
            onChange={() => handleInputChange("used", true)}
            className="text-gray-900"
          />
          <span className="text-sm text-gray-700">Used</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.negotiable}
            onChange={(e) => handleInputChange("negotiable", e.target.checked)}
            className="text-gray-900 rounded"
          />
          <span className="text-sm text-gray-700">Price negotiable</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Describe the car's condition, features, and any special notes..."
        />
      </div>
    </div>
  );
}

// Step 2: Basic Details Component
export function BasicDetails({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year
        </label>
        <input
          type="number"
          value={formData.year}
          onChange={(e) => handleInputChange("year", e.target.value)}
          placeholder="2024"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mileage (km)
        </label>
        <input
          type="number"
          value={formData.mileage}
          onChange={(e) => handleInputChange("mileage", e.target.value)}
          placeholder="Enter mileage"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fuel Type
        </label>
        <input
          type="text"
          value={formData.fuelType}
          onChange={(e) => handleInputChange("fuelType", e.target.value)}
          placeholder="Petrol / Diesel / Electric"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transmission
        </label>
        <input
          type="text"
          value={formData.transmission}
          onChange={(e) => handleInputChange("transmission", e.target.value)}
          placeholder="Automatic / Manual"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Engine Size
        </label>
        <input
          type="text"
          value={formData.engineSize}
          onChange={(e) => handleInputChange("engineSize", e.target.value)}
          placeholder="e.g., 2.0L"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drivetrain
        </label>
        <input
          type="text"
          value={formData.drivetrain}
          onChange={(e) => handleInputChange("drivetrain", e.target.value)}
          placeholder="FWD / RWD / AWD"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Condition
        </label>
        <input
          type="text"
          value={formData.condition}
          onChange={(e) => handleInputChange("condition", e.target.value)}
          placeholder="Excellent / Good / Fair"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exterior Color
        </label>
        <input
          type="text"
          value={formData.exteriorColor}
          onChange={(e) => handleInputChange("exteriorColor", e.target.value)}
          placeholder="Black, White, Silver"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interior Color
        </label>
        <input
          type="text"
          value={formData.interiorColor}
          onChange={(e) => handleInputChange("interiorColor", e.target.value)}
          placeholder="Black Leather, Beige"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          VIN
        </label>
        <input
          type="text"
          value={formData.vin}
          onChange={(e) => handleInputChange("vin", e.target.value)}
          placeholder="Vehicle Identification Number"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plate Number
        </label>
        <input
          type="text"
          value={formData.plateNumber}
          onChange={(e) => handleInputChange("plateNumber", e.target.value)}
          placeholder="License plate"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  );
}

// Step 3: Image Upload Component
export function ImageUpload({ imagePreviewUrls, handleImageUpload, removeImage }) {
  return (
    <div className="space-y-5">
      <div
        onClick={() => document.getElementById("imageUpload")?.click()}
        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG, JPEG up to 10MB each
        </p>
        <input
          id="imageUpload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {imagePreviewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imagePreviewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Step 4: Features Component
export function FeaturesSection({
  formData,
  tagInputs,
  setTagInputs,
  handleTagAdd,
  handleTagRemove,
}) {
  const categories = ["comfort", "multimedia", "safety", "security"];

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {category}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInputs[category]}
              onChange={(e) =>
                setTagInputs((prev) => ({
                  ...prev,
                  [category]: e.target.value,
                }))
              }
              onKeyPress={(e) =>
                e.key === "Enter" && handleTagAdd(category, tagInputs[category])
              }
              placeholder={`Add ${category} feature...`}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={() => handleTagAdd(category, tagInputs[category])}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData[category].map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(category, idx)}
                  className="hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Step 5: Vehicle History Component
export function VehicleHistory({ formData, handleInputChange }) {
  const historyItems = [
    { key: "accidentsOrDamages", label: "Has accidents or damages" },
    { key: "oneOwnerVehicle", label: "One owner vehicle" },
    { key: "personalUseOnly", label: "Personal use only" },
    { key: "serviceHistoryAvailable", label: "Service history available" },
    { key: "importedVehicle", label: "Imported vehicle" },
  ];

  return (
    <div className="space-y-3">
      {historyItems.map((item) => (
        <label
          key={item.key}
          className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg"
        >
          <input
            type="checkbox"
            checked={formData[item.key]}
            onChange={(e) => handleInputChange(item.key, e.target.checked)}
            className="text-gray-900 rounded"
          />
          <span className="text-sm text-gray-700">{item.label}</span>
        </label>
      ))}
    </div>
  );
}

// Step 6: Benefits Component
export function BenefitsSection({
  formData,
  tagInputs,
  setTagInputs,
  handleTagAdd,
  handleTagRemove,
}) {
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={tagInputs.benefits}
          onChange={(e) =>
            setTagInputs((prev) => ({ ...prev, benefits: e.target.value }))
          }
          onKeyPress={(e) =>
            e.key === "Enter" && handleTagAdd("benefits", tagInputs.benefits)
          }
          placeholder="Add benefit (e.g., Free maintenance, Warranty included)"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          onClick={() => handleTagAdd("benefits", tagInputs.benefits)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {formData.benefits.map((benefit, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
          >
            <Heart size={12} />
            {benefit}
            <button
              onClick={() => handleTagRemove("benefits", idx)}
              className="hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
