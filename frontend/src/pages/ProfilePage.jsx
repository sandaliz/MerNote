import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, LoaderIcon, UserIcon, MailIcon, AtSignIcon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data);
        setFormData({
          name: res.data.name || '',
          username: res.data.username || '',
          email: res.data.email || ''
        });
      } catch (error) {
        console.log("Error fetching profile:", error);
        toast.error("Failed to load profile!");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put("/profile", formData);
      setUser(res.data);
      setEditing(false);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(res.data));
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile!");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || ''
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar searchQuery="" setSearchQuery={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-8 hover:bg-base-300">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* Main Profile Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-8 pt-12 pb-8">
              <div className="flex items-end justify-between">
                <div className="flex items-end gap-6">
                  <div className="p-4 rounded-full bg-primary/20 border-2 border-primary">
                    <UserIcon className="size-12 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{user?.name || 'User'}</h1>
                    <p className="text-base-content/60">@{user?.username}</p>
                  </div>
                </div>
                {!editing && (
                  <button 
                    className="btn btn-primary gap-2"
                    onClick={() => setEditing(true)}
                  >
                    <span>✏️</span>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="card-body">
              {!editing ? (
                // View Mode
                <div className="space-y-6 mt-6">
                  {/* Name Field */}
                  <div className="bg-base-200/50 rounded-lg p-6 border border-base-300 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <UserIcon className="size-5 text-primary" />
                      <label className="label-text font-semibold text-base-content/80">Full Name</label>
                    </div>
                    <p className="text-xl font-medium text-base-content pl-8">
                      {user?.name || '— Not set'}
                    </p>
                  </div>

                  {/* Username Field */}
                  <div className="bg-base-200/50 rounded-lg p-6 border border-base-300 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <AtSignIcon className="size-5 text-primary" />
                      <label className="label-text font-semibold text-base-content/80">Username</label>
                    </div>
                    <p className="text-xl font-medium text-base-content pl-8">
                      @{user?.username}
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="bg-base-200/50 rounded-lg p-6 border border-base-300 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <MailIcon className="size-5 text-primary" />
                      <label className="label-text font-semibold text-base-content/80">Email Address</label>
                    </div>
                    <p className="text-xl font-medium text-base-content pl-8">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form className="space-y-6 mt-6">
                  {/* Name Input */}
                  <div className="form-control">
                    <label htmlFor="name" className="label mb-3">
                      <span className="label-text font-semibold text-base flex items-center gap-2">
                        <UserIcon className="size-5 text-primary" />
                        Full Name
                      </span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="input input-bordered input-lg bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary placeholder:text-base-content/40 transition-all"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Username Input */}
                  <div className="form-control">
                    <label htmlFor="username" className="label mb-3">
                      <span className="label-text font-semibold text-base flex items-center gap-2">
                        <AtSignIcon className="size-5 text-primary" />
                        Username
                      </span>
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      className="input input-bordered input-lg bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary placeholder:text-base-content/40 transition-all"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-control">
                    <label htmlFor="email" className="label mb-3">
                      <span className="label-text font-semibold text-base flex items-center gap-2">
                        <MailIcon className="size-5 text-primary" />
                        Email Address
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered input-lg bg-base-200/50 focus:bg-base-100 border-base-300 focus:border-primary placeholder:text-base-content/40 transition-all"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions justify-end gap-3 pt-6">
                    <button 
                      type="button"
                      className="btn btn-ghost btn-lg"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      className="btn btn-primary btn-lg gap-2"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Info Section */}
          {!editing && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body items-center text-center">
                  <div className="text-4xl">📝</div>
                  <p className="text-base-content/70 text-sm">Your notes await</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body items-center text-center">
                  <div className="text-4xl">🎨</div>
                  <p className="text-base-content/70 text-sm">Color your ideas</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body items-center text-center">
                  <div className="text-4xl">⚡</div>
                  <p className="text-base-content/70 text-sm">Get organized fast</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

