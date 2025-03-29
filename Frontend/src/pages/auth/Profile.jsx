import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { BadgeCheck, Edit2, Save, XCircle } from "lucide-react";

function Profile() {
  const { user, updateUser, token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Learner",
    skills: [],
    wantToLearn: [],
    education: "",
    bio: "",
    socialLinks: {
      linkedIn: "",
      github: "",
      twitter: "",
    },
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/user/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          role: response.data.role || "Learner",
          skills: response.data.skills || [],
          wantToLearn: response.data.wantToLearn || [],
          education: response.data.education || "",
          bio: response.data.bio || "",
          socialLinks: {
            linkedIn: response.data.socialLinks?.linkedIn || "",
            github: response.data.socialLinks?.github || "",
            twitter: response.data.socialLinks?.twitter || "",
          },
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.id) {
      fetchUserProfile();
    }
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const socialField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((item) => item.trim()) // Trim whitespace from each item
        .filter((item) => item !== ""), // Remove empty strings
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      const response = await axios.put(
        `http://localhost:3000/user/profile/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      updateUser(response.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to update profile"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={user?.profilePicture || "/profile_default.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              onError={(e) => {
                e.target.src = "/profile_default.png";
              }}
            />
            {user?.verificationStatus?.emailVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-sm">
                <BadgeCheck className="h-5 w-5" strokeWidth={2} />
              </div>
            )}
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-bold text-gray-800">
                {formData.name}
              </h1>
              {user?.role === "Mentor" &&
                user?.verificationStatus?.mentorApproved && (
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <BadgeCheck className="h-4 w-4" />
                    Verified Mentor
                  </span>
                )}
            </div>
            <p className="text-indigo-600 font-medium capitalize">
              {user?.role}
            </p>

            {/* Verification Status */}
            <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
              <div
                className={`flex items-center text-sm ${
                  user?.verificationStatus?.emailVerified
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full mr-2 ${
                    user?.verificationStatus?.emailVerified
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                Email{" "}
                {user?.verificationStatus?.emailVerified
                  ? "Verified"
                  : "Not Verified"}
              </div>
              <div
                className={`flex items-center text-sm ${
                  user?.verificationStatus?.skillVerified
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full mr-2 ${
                    user?.verificationStatus?.skillVerified
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                Skills{" "}
                {user?.verificationStatus?.skillVerified
                  ? "Verified"
                  : "Not Verified"}
              </div>
            </div>
          </div>

          <div className="ml-auto">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-3">
            <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-start gap-3">
            <BadgeCheck className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>{success}</div>
          </div>
        )}

        <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                required
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-2.5 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Your Skills (comma separated)
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formData.skills.join(", ")}
                  onChange={(e) => handleArrayChange("skills", e.target.value)}
                  className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                  placeholder="JavaScript, React, UI Design"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas (e.g., "JavaScript, React, CSS")
                </p>
              </>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills added</span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Skills You Want to Learn (comma separated)
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formData.wantToLearn.join(", ")}
                  onChange={(e) =>
                    handleArrayChange("wantToLearn", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                  placeholder="Python, Machine Learning, UX Research"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas
                </p>
              </>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.wantToLearn.length > 0 ? (
                  formData.wantToLearn.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills added</span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
              placeholder="BSc in Computer Science"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
              rows="4"
              placeholder="Tell us about yourself..."
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="socialLinks.linkedIn"
                value={formData.socialLinks.linkedIn}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                placeholder="https://linkedin.com/in/yourprofile"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                name="socialLinks.github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                placeholder="https://github.com/yourusername"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="url"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                placeholder="https://twitter.com/yourhandle"
                disabled={!isEditing}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
