import React, { useState, useEffect } from "react";
import { UserCircle2, Lock, Save } from "lucide-react";
import { getProfile, changePassword } from "../../services/authService";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error.response?.data?.error || 
        error.response?.data?.old_password?.[0] || 
        "Failed to change password"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and change your password
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <UserCircle2 size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile?.username}</h2>
              <p className="text-sm text-gray-500">{profile?.role?.name || "No Role Assigned"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email Address</label>
              <div className="mt-1 text-gray-800 font-medium">{profile?.email || "-"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              <div className="mt-1 text-gray-800 font-medium">{profile?.phone_number || "-"}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Employee ID</label>
              <div className="mt-1 text-gray-800 font-medium">{profile?.employee_id || "-"}</div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-4">
            <Lock className="text-gray-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
              >
                <Save size={18} />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
