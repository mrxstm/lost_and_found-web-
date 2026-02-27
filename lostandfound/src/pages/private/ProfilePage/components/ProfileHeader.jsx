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

    const handleEditClick = () => {
        setIsEditingAvatar(true);
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setIsEditingAvatar(false);
    };

    const handleSave = async () => {
        if (!selectedFile) return toast.error("No file selected");
        const formData = new FormData();
        formData.append("profile_pic", selectedFile);
        try {
            const res = await callApi("PUT", "/user/edit-profile", {
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUser(res.data.user);
            setSelectedFile(null);
            setIsEditingAvatar(false);
            toast.success("Profile picture updated!");
        } catch (err) {
            toast.error(err.message || "Failed to update profile picture");
        }
    };

    return (
        <div className="w-full flex flex-col sm:flex-row px-4 sm:px-20 gap-3 sm:gap-6 items-center sm:items-start">
            <img
                src={
                    selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : avatar
                        ? `http://localhost:5000${avatar}`
                        : placeholder
                }
                alt="Profile"
                className="rounded-full w-14 h-14 sm:w-20 sm:h-20 object-cover"
            />

            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-start">
                <div className="text-center sm:text-left">
                    <p className="font-bold text-sm sm:text-lg text-white">{full_name}</p>
                    <p className="text-[#9ca3af] text-[10px] sm:text-xs">{college_name}</p>
                </div>

                {!isEditingAvatar && (
                    <button
                        onClick={handleEditClick}
                        className="bg-black text-white flex gap-2 h-5 sm:h-7 w-24 sm:w-32 items-center justify-center rounded-xl text-[10px] sm:text-xs"
                        disabled={loading}
                    >
                        <img src={edit} alt="" className="size-3 sm:size-4 object-cover" />
                        Edit Profile
                    </button>
                )}

                {isEditingAvatar && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-black flex justify-center h-5 sm:h-7 w-14 sm:w-16 items-center rounded-xl text-[10px] sm:text-xs"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white flex justify-center h-5 sm:h-7 w-14 sm:w-16 items-center rounded-xl text-[10px] sm:text-xs"
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
