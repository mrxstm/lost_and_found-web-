import { useState } from "react";
import remove from "../../../../assets/images/remove.png";
import { useAuth } from "../../../../context/AuthContext";

function AccountSection() {
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="bg-[#1F2937] h-[350px] mt-20 w-full rounded-3xl p-10 relative">
      <h1 className="text-2xl text-white font-semibold">Account</h1>

      <div className="flex flex-col gap-6 w-full mt-8">
        {/* Sign out button */}
        <button
          className="w-full bg-[#111827] text-white h-14 rounded-xl"
          onClick={() => setShowLogoutModal(true)}
        >
          Sign out
        </button>

        {/* Delete account button */}
        <button className="w-full flex items-center justify-center gap-2 text-[#ef4444] h-14 rounded-xl border border-[#ef4444]">
          <img src={remove} alt="" className="size-6" />
          Delete Account
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1F2937] p-6 rounded-2xl w-96 flex flex-col gap-4">
            <p className="text-white text-lg font-medium">
              Do you really want to log out?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-xl"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSection;