import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.restaurantImage || "");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Restaurant Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Restaurant Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
