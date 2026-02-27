import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

function Footer({ openSignup }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      openSignup();
    }
  };

  return (
    <div className="bg-[#111827] py-10 px-4 sm:px-8 flex items-center justify-center">
      <div className="bg-[#1F2937] w-full max-w-3xl rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#5DCEA6] py-12 px-6 text-center">
        <h1 className="text-md sm:text-xl font-bold text-white">
          {user ? "Welcome Back!" : "Ready to Get Started?"}
        </h1>
        <p className="text-[#D1D5DB] text-[14px] sm:text-xs max-w-md">
          {user
            ? "Check your recent reports and manage your items."
            : "Join our community and help reunite lost items with owners."}
        </p>
        <button
          onClick={handleClick}
          className="text-black bg-[#5DCEA6] rounded-3xl h-8 w-32 text-[14px] font-semibold hover:scale-105 transition-all duration-300"
        >
          {user ? "Go to Profile" : "Create Free Account"}
        </button>
      </div>
    </div>
  );
}

export default Footer;