import { useEffect, useState } from "react";
import useApi from "../../../hooks/useAPI";
import { toast } from "react-toastify";
import Header from "./components/Header";

function MyClaimsPage() {

    const { callApi, loading } = useApi();
    const [activeTab, setActiveTab] = useState("mine");
    const [myClaims, setMyClaims] = useState([]);
    const [claimsOnMyItems, setClaimsOnMyItems] = useState([]);
    const [contactDetails, setContactDetails] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        fetchMyClaims();
        fetchClaimsOnMyItems();
    }, []);

    const fetchMyClaims = async () => {
        try {
            const res = await callApi("GET", "/claims/my-claims", {});
            setMyClaims(res.data);
        } catch (e) {
            toast.error("Failed to fetch your claims");
        }
    };

    const fetchClaimsOnMyItems = async () => {
        try {
            const res = await callApi("GET", "/claims/on-my-items", {});
            setClaimsOnMyItems(res.data);
        } catch (e) {
            toast.error("Failed to fetch claims on your items");
        }
    };

    const handleApprove = async (claimId) => {
        try {
            await callApi("PATCH", `/claims/${claimId}/approve`, {});
            toast.success("Claim approved!");
            fetchClaimsOnMyItems();
        } catch (e) {
            toast.error("Failed to approve claim");
        }
    };

    const handleReject = async (claimId) => {
        try {
            await callApi("PATCH", `/claims/${claimId}/reject`, {});
            toast.success("Claim rejected");
            fetchClaimsOnMyItems();
        } catch (e) {
            toast.error("Failed to reject claim");
        }
    };

    const handleGetContact = async (itemId) => {
        try {
            const res = await callApi("GET", `/claims/contact/${itemId}`, {});
            setContactDetails(res.data);
            setShowContactModal(true);
        } catch (e) {
            toast.error(e?.response?.data?.message || "Your claim has not been approved yet");
        }
    };

    const statusBadge = (status) => {
        const styles = {
            pending:  "bg-yellow-500 text-black",
            approved: "bg-green-500 text-white",
            rejected: "bg-red-500 text-white"
        };
        return (
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#111827] px-3 sm:px-8 py-4 sm:py-6">

                {/* Tabs */}
                <div className="bg-[#1F2937] h-5 sm:h-7 p-0.5 sm:p-1 flex items-center rounded-3xl gap-1 w-fit mb-3 sm:mb-6">
                    <button
                        onClick={() => setActiveTab("mine")}
                        className={`rounded-3xl h-4 sm:h-5 px-2 sm:px-4 text-[9px] sm:text-[10px] font-semibold transition ${activeTab === "mine" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                    >
                        Claims I Made
                    </button>
                    <button
                        onClick={() => setActiveTab("onMyItems")}
                        className={`rounded-3xl h-4 sm:h-5 px-2 sm:px-4 text-[9px] sm:text-[10px] font-semibold transition ${activeTab === "onMyItems" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                    >
                        Claims On My Items
                    </button>
                </div>

                {/* Tab 1: Claims I Made */}
                {activeTab === "mine" && (
                    <div>
                        {loading ? (
                            <p className="text-gray-400 text-center mt-10 text-[10px]">Loading...</p>
                        ) : myClaims.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10 text-[10px]">You haven't made any claims yet</p>
                        ) : (
                            <div className="flex flex-col gap-2 sm:gap-3">
                                {myClaims.map(claim => (
                                    <div key={claim.id} className="bg-[#1F2937] rounded-xl p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-white font-semibold text-[10px] sm:text-sm">
                                                {claim.Item?.itemName}
                                            </h3>
                                            <p className="text-[#9ca3af] text-[9px] sm:text-xs max-w-lg">{claim.message}</p>
                                            {claim.proof_image && (
                                                <img
                                                    src={`http://localhost:5000${claim.proof_image}`}
                                                    alt="proof"
                                                    className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg mt-1"
                                                />
                                            )}
                                            <p className="text-[#9ca3af] text-[9px] sm:text-[10px]">
                                                Submitted: {claim.createdAt?.substring(0, 10)}
                                            </p>
                                        </div>

                                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
                                            {statusBadge(claim.status)}
                                            {claim.status === "approved" && (
                                                <button
                                                    onClick={() => handleGetContact(claim.item_id)}
                                                    className="bg-[#5DCEA6] text-black px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-medium"
                                                >
                                                    📞 Get Contact
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 2: Claims On My Items */}
                {activeTab === "onMyItems" && (
                    <div>
                        {loading ? (
                            <p className="text-gray-400 text-center mt-10 text-[10px]">Loading...</p>
                        ) : claimsOnMyItems.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10 text-[10px]">No claims on your items yet</p>
                        ) : (
                            <div className="flex flex-col gap-2 sm:gap-3">
                                {claimsOnMyItems.map(claim => (
                                    <div key={claim.id} className="bg-[#1F2937] rounded-xl p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-white font-semibold text-[10px] sm:text-sm">
                                                {claim.Item?.itemName}
                                            </h3>
                                            <p className="text-[#9ca3af] text-[9px] sm:text-xs">
                                                Claimed by:{" "}
                                                <span className="text-white font-medium">
                                                    {claim.claimant?.fullname}
                                                </span>
                                            </p>
                                            <p className="text-[#9ca3af] text-[9px] sm:text-xs max-w-lg">
                                                "{claim.message}"
                                            </p>
                                            {claim.proof_image && (
                                                <img
                                                    src={`http://localhost:5000${claim.proof_image}`}
                                                    alt="proof"
                                                    className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg mt-1"
                                                />
                                            )}
                                            <p className="text-[#9ca3af] text-[9px] sm:text-[10px]">
                                                Submitted: {claim.createdAt?.substring(0, 10)}
                                            </p>
                                        </div>

                                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
                                            {statusBadge(claim.status)}
                                            {claim.status === "pending" && (
                                                <div className="flex gap-1 sm:gap-2">
                                                    <button
                                                        onClick={() => handleApprove(claim.id)}
                                                        className="bg-green-500 text-white px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] hover:bg-green-600 transition"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(claim.id)}
                                                        className="bg-red-500 text-white px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] hover:bg-red-600 transition"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Contact Modal */}
            {showContactModal && contactDetails && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-3 sm:p-4 rounded-2xl w-full max-w-xs flex flex-col gap-2">
                        <h2 className="text-white text-xs sm:text-sm font-semibold">🎉 Contact Details</h2>
                        <p className="text-[#9ca3af] text-[9px] sm:text-xs">
                            Your claim was approved. Here are the reporter's contact details:
                        </p>
                        <div className="bg-[#111827] rounded-xl p-2 sm:p-3 flex flex-col gap-1">
                            <p className="text-white font-medium text-[10px] sm:text-xs">{contactDetails.fullname}</p>
                            <p className="text-[#9ca3af] text-[9px] sm:text-[10px]">📧 {contactDetails.email}</p>
                            <p className="text-[#9ca3af] text-[9px] sm:text-[10px]">📞 {contactDetails.phone_no}</p>
                        </div>
                        <button
                            className="bg-gray-600 text-white px-2 py-1 rounded-lg text-[9px] sm:text-[10px] self-end"
                            onClick={() => setShowContactModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyClaimsPage;