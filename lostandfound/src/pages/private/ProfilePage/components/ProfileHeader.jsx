import { useState, useRef } from "react";
import edit from "../../../../assets/images/edit-text.png";
import placeholder from "../../../../assets/images/userok.png";
import useApi from "../../../../hooks/useAPI.js";
import { toast } from "react-toastify";

function ProfileHeader({ avatar, full_name, college_name, setUser }) {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { callApi, loading } = useApi();

  // Open file picker
  const handleEditClick = () => {
    setIsEditingAvatar(true);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // File selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // Cancel avatar edit
  const handleCancel = () => {
    setSelectedFile(null);
    setIsEditingAvatar(false);
  };

  // Save new avatar
  const handleSave = async () => {
    if (!selectedFile) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    try {
      const res = await callApi("PUT", "/user/edit-profile", {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update parent state
      setUser(res.data.user);
      setSelectedFile(null);
      setIsEditingAvatar(false);
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile picture");
    }
  };

  return (
    <div className="w-full flex px-52 gap-8">
      <img
        src={
          selectedFile
            ? URL.createObjectURL(selectedFile)
            : avatar
            ? `http://localhost:5000${avatar}`
            : placeholder
        }
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover"
      />

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-4">
        <div>
          <p className="font-bold text-2xl text-white">{full_name}</p>
          <p className="text-[#9ca3af]">{college_name}</p>
        </div>

        {!isEditingAvatar && (
          <button
            onClick={handleEditClick}
            className="bg-black text-white flex gap-2 h-8 w-40 items-center p-5 rounded-xl"
            disabled={loading}
          >
            <img src={edit} alt="" className="size-5 object-cover" />
            Edit Profile
          </button>
        )}

        {isEditingAvatar && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-black flex justify-center h-8 w-20 items-center p-2 rounded-xl"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white flex justify-center h-8 w-20 items-center p-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;