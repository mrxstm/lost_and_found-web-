import { useState } from "react";
import car from "../../../../assets/images/car.jpg";
import claim from "../../../../assets/images/claim.png";
import message from "../../../../assets/images/message.png";
import SafetyTips from "./SafetyTips";
import { useAuth } from "../../../../context/AuthContext";
import useApi from "../../../../hooks/useAPI";
import { toast } from "react-toastify";

function ReportedBy({ reporter, stats, itemData }) {

    const { user } = useAuth();
    const { callApi, loading } = useApi();

    const [showClaimModal, setShowClaimModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [claimMessage, setClaimMessage] = useState("");
    const [proofImage, setProofImage] = useState(null);
    const [contactDetails, setContactDetails] = useState(null);

    if (!reporter) {
        return <div className="text-white text-xs">Loading reporter info...</div>;
    }

    const isOwner = user?.id === itemData?.reported_by;
    const isFound = itemData?.status === "found";
    const isLost = itemData?.status === "lost";
    const isClaimed = itemData?.status === "claimed";

    const canClaim = user && !isOwner && isFound && !isClaimed;
    const canFoundIt = user && !isOwner && isLost;

    const modalTitle = isFound ? "Claim This Item" : "I Found This Item";
    const modalPlaceholder = isFound
        ? "e.g. It has my student ID inside, the bag has a red keychain..."
        : "e.g. I found this item near the library, I can hand it over...";
    const modalDescription = isFound
        ? "Explain why this item belongs to you. The finder will review your claim."
        : "Describe where and how you found this item. The owner will be notified.";

    const handleSubmitClaim = async () => {
        if (!claimMessage.trim()) {
            toast.error(isFound ? "Please explain why this item is yours" : "Please describe how you found this item");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("item_id", itemData.id);
            formData.append("message", claimMessage);
            if (proofImage) formData.append("proof_image", proofImage);
            await callApi("POST", "/claims", { data: formData });
            toast.success(isFound ? "Claim submitted successfully!" : "Notification sent to the owner!");
            setShowClaimModal(false);
            setClaimMessage("");
            setProofImage(null);
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to submit");
        }
    };

    const handleGetContact = async () => {
        try {
            const res = await callApi("GET", `/claims/contact/${itemData.id}`, {});
            setContactDetails(res.data);
            setShowContactModal(true);
        } catch (e) {
            toast.error(e?.response?.data?.message || "Your claim has not been approved yet");
        }
    };

    return (
        <div className="">
            {/* Reporter info */}
            <div className="flex flex-col p-3 sm:p-4 bg-[#1F2937] rounded-2xl px-4 sm:px-6 sm:h-40 h-40">
                <h1 className="font-bold text-xs sm:text-sm text-white">Reported By</h1>
                <div className="flex mt-3 sm:mt-4 items-center gap-3">
                    <img src={car} alt="" className="rounded-full size-10 sm:size-12" />
                    <div className="flex flex-col">
                        <p className="font-semibold text-xs sm:text-sm text-white">{reporter.fullname}</p>
                        <p className="text-[10px] sm:text-[12px] text-[#D1D5DB]">{reporter.email}</p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col p-3 sm:p-4 h-40 bg-[#1F2937] rounded-2xl px-4 sm:px-6 mt-3 sm:mt-4 gap-2 sm:gap-3 items-center justify-center">

                {canClaim && (
                    <button
                        onClick={() => setShowClaimModal(true)}
                        className="bg-[#5DCEA6] h-6 w-40 sm:h-8 sm:w-48 rounded-xl font-semibold flex gap-2 items-center justify-center text-black text-[10px] sm:text-[14px]"
                    >
                        <img src={claim} alt="" className="size-4 sm:size-5" />
                        Claim This Item
                    </button>
                )}

                {canFoundIt && (
                    <button
                        onClick={() => setShowClaimModal(true)}
                        className="bg-[#5DCEA6] h-6 w-40 sm:h-8 sm:w-48 rounded-xl font-semibold flex gap-2 items-center justify-center text-black text-[10px] sm:text-[14px]"
                    >
                        <img src={claim} alt="" className="size-4 sm:size-5" />
                        I Found This Item
                    </button>
                )}

                {isClaimed && (
                    <div className="bg-gray-700 h-6 w-40 sm:h-8 sm:w-48 rounded-xl flex items-center justify-center text-gray-400 font-semibold text-[10px] sm:text-[14px]">
                        Item Already Claimed
                    </div>
                )}

                {user && !isOwner && (
                    <button
                        onClick={handleGetContact}
                        className="h-6 w-40 sm:h-8 sm:w-48 rounded-xl border border-[#5DCEA6] text-white flex items-center justify-center gap-2 text-[10px] sm:text-[14px]"
                    >
                        <img src={message} alt="" className="size-3.5 sm:size-4" />
                        Contact Reporter
                    </button>
                )}
            </div>

            <SafetyTips />

            {/* Claim / Found Modal */}
            {showClaimModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-5 rounded-2xl w-full max-w-sm sm:max-w-md flex flex-col gap-3">
                        <h2 className="text-white text-xs sm:text-sm font-semibold">{modalTitle}</h2>
                        <p className="text-[#9ca3af] text-[10px] sm:text-xs">{modalDescription}</p>

                        <textarea
                            value={claimMessage}
                            onChange={e => setClaimMessage(e.target.value)}
                            placeholder={modalPlaceholder}
                            className="bg-[#111827] text-white rounded-xl p-2 h-24 sm:h-28 resize-none outline-none border border-[#374151] focus:border-[#5DCEA6] transition text-[10px] sm:text-xs"
                        />

                        <div>
                            <label className="text-[#9ca3af] text-[10px] sm:text-xs">
                                Proof Image (optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setProofImage(e.target.files[0])}
                                className="mt-1 text-[#9ca3af] text-[10px] sm:text-xs w-full"
                            />
                            {proofImage && (
                                <img
                                    src={URL.createObjectURL(proofImage)}
                                    alt="proof preview"
                                    className="mt-2 w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        <div className="flex justify-end gap-2 mt-1">
                            <button
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs"
                                onClick={() => {
                                    setShowClaimModal(false);
                                    setClaimMessage("");
                                    setProofImage(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#5DCEA6] text-black px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-medium"
                                onClick={handleSubmitClaim}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {showContactModal && contactDetails && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-5 rounded-2xl w-full max-w-xs sm:max-w-sm flex flex-col gap-3">
                        <h2 className="text-white text-xs sm:text-sm font-semibold">🎉 Claim Approved!</h2>
                        <p className="text-[#9ca3af] text-[10px] sm:text-xs">
                            Your claim has been approved. You can now contact the reporter:
                        </p>
                        <div className="bg-[#111827] rounded-xl p-3 flex flex-col gap-1.5">
                            <p className="text-white font-medium text-xs sm:text-sm">{contactDetails.fullname}</p>
                            <p className="text-[#9ca3af] text-[10px] sm:text-xs">📧 {contactDetails.email}</p>
                            <p className="text-[#9ca3af] text-[10px] sm:text-xs">📞 {contactDetails.phone_no}</p>
                        </div>
                        <button
                            className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs self-end"
                            onClick={() => setShowContactModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReportedBy;