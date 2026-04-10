import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  ArrowRight,
  Check,
  Car,
  Settings,
  Camera,
  Cog,
  Shield,
  Heart,
} from "lucide-react";
import carService from "../../services/carsService";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { useLoading } from "../../hooks/useLoading";
import {
  ListingBasics,
  BasicDetails,
  ImageUpload,
  FeaturesSection,
  VehicleHistory,
  BenefitsSection,
} from "./AddCar";
import adminService from "../../services/adminService";

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

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [originalImageUrls, setOriginalImageUrls] = useState([]); // to track which images were originally associated with the car
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, loadingText, withLoading } = useLoading();
  const [existingImageUrls, setExistingImageUrls] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    price: "",
    negotiable: false,
    status: "active",
    used: true,
    currentLocation: "",
    description: "",
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
    images: [],
    comfort: [],
    multimedia: [],
    safety: [],
    security: [],
    accidentsOrDamages: false,
    oneOwnerVehicle: false,
    personalUseOnly: true,
    serviceHistoryAvailable: false,
    importedVehicle: false,
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

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await adminService.getCarById(id);
        const car = res.listing;
        setFormData({
          name: car.name || "",
          make: car.make || "",
          model: car.model || "",
          price: car.price || "",
          negotiable: car.negotiable || false,
          status: car.status || "active",
          used: car.used ?? true,
          currentLocation: car.currentLocation || "",
          description: car.description || "",
          year: car.basicDetails?.year || "",
          mileage: car.basicDetails?.mileage || "",
          fuelType: car.basicDetails?.fuelType || "",
          transmission: car.basicDetails?.transmission || "",
          engineSize: car.basicDetails?.engineSize || "",
          drivetrain: car.basicDetails?.drivetrain || "",
          condition: car.basicDetails?.condition || "",
          exteriorColor: car.basicDetails?.exteriorColor || "",
          interiorColor: car.basicDetails?.interiorColor || "",
          grade: car.basicDetails?.grade || "",
          speed: car.basicDetails?.speed || "",
          vin: car.basicDetails?.vin || "",
          plateNumber: car.basicDetails?.plateNumber || "",
          images: [],
          comfort: car.comfort || [],
          multimedia: car.multimedia || [],
          safety: car.safety || [],
          security: car.security || [],
          accidentsOrDamages: car.vechicleHistory?.accidentsOrDamages || false,
          oneOwnerVehicle: car.vechicleHistory?.oneOwnerVehicle || false,
          personalUseOnly: car.vechicleHistory?.personalUseOnly ?? true,
          serviceHistoryAvailable:
            car.vechicleHistory?.serviceHistoryAvailable || false,
          importedVehicle: car.vechicleHistory?.importedVehicle || false,
          benefits: car.benefits || [],
        });
        // existing images shown as previews
        setExistingImageUrls(car.images || []);
        setImagePreviewUrls(car.images || []);
        setOriginalImageUrls(car.images || []); // keep track of original images to know which ones were removed later
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagAdd = (section, value) => {
    if (value?.trim()) {
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
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviewUrls((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index) => {
    const totalExisting = existingImageUrls.length;

    if (index < totalExisting) {
      // Removing an existing (already-uploaded) image
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Removing a newly added File
      const newFileIndex = index - totalExisting;
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== newFileIndex),
      }));
    }
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await adminService.updateCar(id, {
        ...formData,
        originalImages: originalImageUrls, // send original images to backend for comparison
        existingImages: existingImageUrls, // tell backend which URLs to retain
      });
      navigate("/admin/cars");
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  const { icon: Icon } = steps[currentStep - 1];

  return (
    <>
      {loading && <LoadingOverlay text={loadingText} />}
      <div className="min-h-screen bg-gray-50">
        {/* Header — no double header, EditCar owns its own */}
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
                <h1 className="text-xl font-bold text-gray-900">Edit Car</h1>
                <p className="text-sm text-gray-500">
                  Update vehicle information
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${currentStep >= step.id ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"}
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
                        className={`h-full transition-all duration-300 ${currentStep > step.id ? "bg-gray-900" : "bg-gray-200"}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content — import and reuse the step sub-components from AddCar */}
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
            {/* Import step components from AddCar and render them here */}
            <div className="p-6">
              {currentStep === 1 && (
                <ListingBasics
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 2 && (
                <BasicDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 3 && (
                <ImageUpload
                  imagePreviewUrls={imagePreviewUrls}
                  handleImageUpload={handleImageUpload}
                  removeImage={removeImage}
                />
              )}
              {currentStep === 4 && (
                <FeaturesSection
                  formData={formData}
                  tagInputs={tagInputs}
                  setTagInputs={setTagInputs}
                  handleTagAdd={handleTagAdd}
                  handleTagRemove={handleTagRemove}
                />
              )}
              {currentStep === 5 && (
                <VehicleHistory
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {currentStep === 6 && (
                <BenefitsSection
                  formData={formData}
                  tagInputs={tagInputs}
                  setTagInputs={setTagInputs}
                  handleTagAdd={handleTagAdd}
                  handleTagRemove={handleTagRemove}
                />
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
                ${currentStep === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}
              `}
            >
              <ArrowLeft size={18} /> Previous
            </button>

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={18} /> Update Car
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentStep((p) => Math.min(steps.length, p + 1))
                }
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
