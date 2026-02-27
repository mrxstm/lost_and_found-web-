import { useState } from "react";
import remove from "../../../../assets/images/remove.png";
import { useAuth } from "../../../../context/AuthContext";
import useApi from "../../../../hooks/useAPI";
import { toast } from "react-toastify";

function AccountSection() {
    const { logout } = useAuth();
    const { callApi } = useApi();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            await callApi("DELETE", "/user/delete-account", {});
            toast.success("Your account has been deleted successfully.");
            logout();
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Failed to delete account:", err);
        }
    };

    return (
        <div className="bg-[#1F2937] mt-6 sm:mt-10 w-full rounded-2xl p-3 sm:p-6 relative mb-6 sm:w-[560px] lg:w-full">
            <h1 className="text-sm sm:text-lg text-white font-semibold">Account</h1>

            <div className="flex flex-col gap-2 sm:gap-3 w-full mt-4 sm:mt-6">
                <button
                    className="w-full bg-[#111827] text-white h-7 sm:h-10 rounded-xl text-[10px] sm:text-xs"
                    onClick={() => setShowLogoutModal(true)}
                >
                    Sign out
                </button>

                <button
                    className="w-full flex items-center justify-center gap-2 text-[#ef4444] h-7 sm:h-10 rounded-xl border border-[#ef4444] text-[10px] sm:text-xs"
                    onClick={() => setShowDeleteModal(true)}
                >
                    <img src={remove} alt="" className="size-3 sm:size-4" />
                    Delete Account
                </button>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl w-full max-w-sm flex flex-col gap-3">
                        <p className="text-white text-xs sm:text-sm font-medium">
                            Do you really want to log out?
                        </p>
                        <div className="flex justify-end gap-3 mt-2">
                            <button className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                            <button className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs" onClick={() => { logout(); setShowLogoutModal(false); }}>Log out</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl w-full max-w-sm flex flex-col gap-3">
                        <p className="text-white text-xs sm:text-sm font-medium">
                            This action is permanent. Delete your account?
                        </p>
                        <div className="flex justify-end gap-3 mt-2">
                            <button className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs" onClick={handleDeleteAccount}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountSection;