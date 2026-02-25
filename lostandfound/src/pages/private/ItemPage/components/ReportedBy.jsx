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
        return <div className="text-white">Loading reporter info...</div>;
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
            <div className="h-60 flex flex-col p-6 bg-[#1F2937] rounded-2xl flex-1 px-12">
                <h1 className="font-bold text-2xl text-white">Reported By</h1>
                <div className="flex mt-6 items-center gap-5">
                    <img src={car} alt="" className="rounded-full size-20" />
                    <div className="flex flex-col">
                        <p className="font-semibold text-2xl text-white">{reporter.fullname}</p>
                        <p className="text-sm text-[#D1D5DB]">{reporter.email}</p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col p-6 bg-[#1F2937] rounded-2xl flex-1 px-10 py-10 mt-10 gap-6">

                {/* Claim This Item — for found items */}
                {canClaim && (
                    <button
                        onClick={() => setShowClaimModal(true)}
                        className="bg-[#5DCEA6] h-14 rounded-xl font-semibold flex gap-4 items-center justify-center text-black"
                    >
                        <img src={claim} alt="" className="size-8" />
                        Claim This Item
                    </button>
                )}

                {/* I Found This Item — for lost items */}
                {canFoundIt && (
                    <button
                        onClick={() => setShowClaimModal(true)}
                        className="bg-[#5DCEA6] h-14 rounded-xl font-semibold flex gap-4 items-center justify-center text-black"
                    >
                        <img src={claim} alt="" className="size-8" />
                         I Found This Item
                    </button>
                )}

                {/* Already claimed badge */}
                {isClaimed && (
                    <div className="bg-gray-700 h-14 rounded-xl flex items-center justify-center text-gray-400 font-semibold">
                        Item Already Claimed
                    </div>
                )}

                {/* Contact button — only for non-owners */}
                {user && !isOwner && (
                    <button
                        onClick={handleGetContact}
                        className="h-14 rounded-xl border border-[#5DCEA6] text-white flex items-center justify-center gap-2"
                    >
                        <img src={message} alt="" className="size-6" />
                        Contact Reporter
                    </button>
                )}
            </div>

            <SafetyTips />

            {/* ── Claim / Found Modal ── */}
            {showClaimModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-[480px] flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">{modalTitle}</h2>
                        <p className="text-[#9ca3af] text-sm">{modalDescription}</p>

                        <textarea
                            value={claimMessage}
                            onChange={e => setClaimMessage(e.target.value)}
                            placeholder={modalPlaceholder}
                            className="bg-[#111827] text-white rounded-xl p-3 h-32 resize-none outline-none border border-[#374151] focus:border-[#5DCEA6] transition"
                        />

                        {/* Proof image */}
                        <div>
                            <label className="text-[#9ca3af] text-sm">
                                Proof Image (optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setProofImage(e.target.files[0])}
                                className="mt-2 text-[#9ca3af] text-sm w-full"
                            />
                            {proofImage && (
                                <img
                                    src={URL.createObjectURL(proofImage)}
                                    alt="proof preview"
                                    className="mt-2 w-24 h-24 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => {
                                    setShowClaimModal(false);
                                    setClaimMessage("");
                                    setProofImage(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#5DCEA6] text-black px-4 py-2 rounded-xl text-sm font-medium"
                                onClick={handleSubmitClaim}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Contact Modal ── */}
            {showContactModal && contactDetails && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-96 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">🎉 Claim Approved!</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Your claim has been approved. You can now contact the reporter:
                        </p>
                        <div className="bg-[#111827] rounded-xl p-4 flex flex-col gap-2">
                            <p className="text-white font-medium">{contactDetails.fullname}</p>
                            <p className="text-[#9ca3af] text-sm">📧 {contactDetails.email}</p>
                            <p className="text-[#9ca3af] text-sm">📞 {contactDetails.phone_no}</p>
                        </div>
                        <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm self-end"
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