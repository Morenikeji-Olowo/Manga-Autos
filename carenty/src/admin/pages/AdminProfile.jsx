import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Lock,
  Key,
  Smartphone,
  Laptop,
  Bell,
  Moon,
  Sun,
  AlertTriangle,
  Save,
  Camera,
  Edit2,
  Check,
  X,
  Plus,
  Trash2,
  Activity,
  Car,
  ShoppingBag,
  Users,
  ChevronRight,
  Eye,
  EyeOff,
  LogOut,
  Home,
  Building,
  Globe,
  CreditCard,
} from "lucide-react";
import { useLoading } from "../../hooks/useLoading";
import userService from "../../services/userService";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const { loading, loadingText, withLoading } = useLoading();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Admin Data
  const [admin, setAdmin] = useState({
    // Personal Info
    name: "John Doe",
    email: "john.doe@autodeal.com",
    phone: "+234 801 234 5678",
    profilePicture:
      "https://ui-avatars.com/api/?name=John+Doe&background=1a1a1a&color=fff&size=128",
    role: "Super Admin",

    // Address
    address: {
      street: "123 Ahmadu Bello Way",
      city: "Victoria Island",
      state: "Lagos",
      zip: "101241",
      country: "Nigeria",
    },

    // Account Stats
    totalCarsListed: 156,
    totalOrdersManaged: 234,
    totalUsersManaged: 3421,
    totalRevenueManaged: 2345678,

    // Activity
    lastLogin: "2024-01-15 14:30:00",
    accountCreated: "2023-06-01",

    // Security
    isMfaActive: false,
    trustedDevices: [
      {
        id: 1,
        device: "Chrome on Windows",
        location: "Lagos, Nigeria",
        lastUsed: "2024-01-15",
        isCurrent: true,
      },
      {
        id: 2,
        device: "Safari on iPhone",
        location: "Lagos, Nigeria",
        lastUsed: "2024-01-14",
        isCurrent: false,
      },
    ],

    // Preferences
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      orderUpdates: true,
      marketingEmails: false,
    },
    theme: "light",
  });

  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    address: { ...admin.address },
  });
  const [isFetching, setIsFetching] = useState(true)


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

useEffect(() => {
  if (user) {
    setAdmin(prev => ({
      ...prev,
      name: user.profile?.fullName || user.username,
      email: user.email,
      phone: user.profile?.phone || '',
      profilePicture: user.profile?.profilePicture || prev.profilePicture,
      address: user.profile?.address || prev.address,
      isMfaActive: user.isMfaActive,
      trustedDevices: user.trustedDevices || [],
    }))
    setFormData({
      name: user.profile?.fullName || user.username,
      email: user.email,
      phone: user.profile?.phone || '',
      address: user.profile?.address || prev.address,
    })
  }
  setIsFetching(false)
}, [user])
  const handleProfileUpdate = async () => {
    await withLoading(async () => {
      const res = await userService.updateProfile({
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      setAdmin((prev) => ({
        ...prev,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      }));
      setIsEditing(false);
    }, "Saving profile...");
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    alert("Password changed successfully!");
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handle2FAToggle = () => {
    setAdmin({ ...admin, isMfaActive: !admin.isMfaActive });
    setShow2FAModal(false);
    alert(admin.isMfaActive ? "2FA disabled" : "2FA enabled successfully!");
  };

  const handleRemoveDevice = (deviceId) => {
    setAdmin({
      ...admin,
      trustedDevices: admin.trustedDevices.filter((d) => d.id !== deviceId),
    });
  };

  // find this function and replace it
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await withLoading(async () => {
      const res = await userService.updateAvatar(file);
      setAdmin((prev) => ({
        ...prev,
        profilePicture: res.user.profile.profilePicture,
      }));
    }, "Updating profile picture...");
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <>
      {loading && <LoadingOverlay text={loadingText} />}
      {isFetching && <LoadingOverlay text="Loading profile..." />}
      <div className="min-h-screen bg-gray-50">
        {/* Header - Clean */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your account settings
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Minimal */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={admin.profilePicture}
                      alt={admin.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1.5 bg-gray-900 rounded-full text-white hover:bg-gray-700 transition-colors"
                    >
                      <Camera size={12} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 mt-3">
                    {admin.name}
                  </h2>
                  <p className="text-xs text-gray-500">{admin.role}</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-400">
                    <Mail size={12} />
                    <span>{admin.email}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-0.5">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                        ${
                          activeTab === tab.id
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      `}
                      >
                        <tab.icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Clean Design */}
            <div className="flex-1">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          Basic Information
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Your personal details
                        </p>
                      </div>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                          >
                            <X size={14} />
                          </button>
                          <button
                            onClick={handleProfileUpdate}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                          >
                            <Save size={14} />
                            Save
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <User size={14} className="text-gray-400" />
                              <span>{admin.name}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <Mail size={14} className="text-gray-400" />
                              <span>{admin.email}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <Phone size={14} className="text-gray-400" />
                              <span>{admin.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <Home size={16} className="text-gray-400" />
                      <h3 className="text-base font-semibold text-gray-900">
                        Address
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Street
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.street}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  street: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Street address"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <Building size={14} className="text-gray-400" />
                            <span>{admin.address.street || "—"}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.city}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  city: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="City"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <MapPin size={14} className="text-gray-400" />
                            <span>{admin.address.city || "—"}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          State
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.state}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  state: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="State"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">
                            {admin.address.state || "—"}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Zip Code
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.zip}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  zip: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Zip code"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">
                            {admin.address.zip || "—"}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Country
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.country}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: {
                                  ...formData.address,
                                  country: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Country"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <Globe size={14} className="text-gray-400" />
                            <span>{admin.address.country || "—"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab - Minimal */}
              {activeTab === "security" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock size={18} className="text-gray-400" />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            Change Password
                          </h3>
                          <p className="text-xs text-gray-500">
                            Update your password
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key size={18} className="text-gray-400" />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-xs text-gray-500">
                            Add extra security to your account
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs ${admin.isMfaActive ? "text-green-600" : "text-gray-400"}`}
                        >
                          {admin.isMfaActive ? "Enabled" : "Disabled"}
                        </span>
                        <button
                          onClick={() => setShow2FAModal(true)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          {admin.isMfaActive ? "Manage" : "Enable"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone size={18} className="text-gray-400" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        Trusted Devices
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {admin.trustedDevices.map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between py-2 border-t border-gray-50"
                        >
                          <div>
                            <p className="text-sm text-gray-900">
                              {device.device}
                            </p>
                            <p className="text-xs text-gray-400">
                              {device.location} • Last used {device.lastUsed}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {device.isCurrent && (
                              <span className="text-xs text-green-600">
                                Current
                              </span>
                            )}
                            <button
                              onClick={() => handleRemoveDevice(device.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab - Clean Stats */}
              {activeTab === "activity" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-4">
                      <Car size={18} className="text-gray-400 mb-2" />
                      <p className="text-xl font-semibold text-gray-900">
                        {admin.totalCarsListed}
                      </p>
                      <p className="text-xs text-gray-500">Cars Listed</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <ShoppingBag size={18} className="text-gray-400 mb-2" />
                      <p className="text-xl font-semibold text-gray-900">
                        {admin.totalOrdersManaged}
                      </p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <Users size={18} className="text-gray-400 mb-2" />
                      <p className="text-xl font-semibold text-gray-900">
                        {admin.totalUsersManaged}
                      </p>
                      <p className="text-xs text-gray-500">Users</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <CreditCard size={18} className="text-gray-400 mb-2" />
                      <p className="text-xl font-semibold text-gray-900">
                        ${(admin.totalRevenueManaged / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Last Login</p>
                          <p className="text-xs text-gray-500">
                            {admin.lastLogin}
                          </p>
                        </div>
                        <span className="text-xs text-green-600">Today</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-gray-50">
                        <div>
                          <p className="text-sm text-gray-900">
                            Account Created
                          </p>
                          <p className="text-xs text-gray-500">
                            {admin.accountCreated}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">Joined</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-gray-50">
                        <div>
                          <p className="text-sm text-gray-900">
                            Active Sessions
                          </p>
                          <p className="text-xs text-gray-500">
                            {admin.trustedDevices.length} devices
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab - Minimal Toggles */}
              {activeTab === "preferences" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                        },
                        {
                          key: "pushNotifications",
                          label: "Push Notifications",
                        },
                        { key: "orderUpdates", label: "Order Updates" },
                        { key: "marketingEmails", label: "Marketing Emails" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between py-2 cursor-pointer"
                        >
                          <span className="text-sm text-gray-700">
                            {item.label}
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={admin.notifications[item.key]}
                              onChange={(e) =>
                                setAdmin({
                                  ...admin,
                                  notifications: {
                                    ...admin.notifications,
                                    [item.key]: e.target.checked,
                                  },
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-gray-900 transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Theme
                    </h3>
                    <div className="flex gap-2">
                      {[
                        { value: "light", label: "Light", icon: Sun },
                        { value: "dark", label: "Dark", icon: Moon },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          onClick={() =>
                            setAdmin({ ...admin, theme: theme.value })
                          }
                          className={`
                          flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all
                          ${
                            admin.theme === theme.value
                              ? "border-gray-900 bg-gray-50 text-gray-900"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }
                        `}
                        >
                          <theme.icon size={14} />
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone - Clean */}
              {activeTab === "danger" && (
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={16} className="text-red-500" />
                    <h3 className="text-sm font-semibold text-red-600">
                      Danger Zone
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm text-gray-900">
                          Deactivate Account
                        </p>
                        <p className="text-xs text-gray-500">
                          Temporarily deactivate your account
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeactivateModal(true)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Deactivate
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-900">Delete Account</p>
                        <p className="text-xs text-gray-500">
                          Permanently delete your account
                        </p>
                      </div>
                      <button
                        onClick={() => alert("This would delete your account")}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals remain the same but simplified */}
        {showPasswordModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowPasswordModal(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900">
                    Change Password
                  </h3>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                </div>
                <div className="p-5 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 2FA Modal */}
        {show2FAModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShow2FAModal(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900">
                    {admin.isMfaActive
                      ? "Disable 2FA"
                      : "Enable Two-Factor Authentication"}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">
                    {admin.isMfaActive
                      ? "Are you sure you want to disable two-factor authentication?"
                      : "Add an extra layer of security to your account."}
                  </p>
                </div>
                <div className="p-5 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={handle2FAToggle}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                  >
                    {admin.isMfaActive ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                  <button
                    onClick={() => setShow2FAModal(false)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Deactivate Modal */}
        {showDeactivateModal && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowDeactivateModal(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-base font-semibold text-red-600">
                    Deactivate Account
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-3">
                    Are you sure you want to deactivate your account?
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-xs text-yellow-700">
                      You won't be able to access the admin dashboard while
                      deactivated.
                    </p>
                  </div>
                </div>
                <div className="p-5 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={() => alert("Account deactivated")}
                    className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => setShowDeactivateModal(false)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Monitor(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  );
}
