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
            fetchClaimsOnMyItems(); // refresh
        } catch (e) {
            toast.error("Failed to approve claim");
        }
    };

    const handleReject = async (claimId) => {
        try {
            await callApi("PATCH", `/claims/${claimId}/reject`, {});
            toast.success("Claim rejected");
            fetchClaimsOnMyItems(); // refresh
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
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#111827] px-10 py-10">
                <h1 className="text-white text-2xl font-bold mb-2">Claims</h1>
                <p className="text-[#9ca3af] mb-8">Manage your claims and review claims on your items</p>

                {/* Tabs */}
                <div className="bg-[#1F2937] h-12 p-2 flex items-center rounded-3xl gap-1 w-fit mb-8">
                    <button
                        onClick={() => setActiveTab("mine")}
                        className={`rounded-3xl h-8 px-6 text-sm font-semibold transition ${activeTab === "mine" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                    >
                        Claims I Made
                    </button>
                    <button
                        onClick={() => setActiveTab("onMyItems")}
                        className={`rounded-3xl h-8 px-6 text-sm font-semibold transition ${activeTab === "onMyItems" ? "bg-[#5DCEA6] text-black" : "bg-transparent text-white hover:bg-[#374151]"}`}
                    >
                        Claims On My Items
                    </button>
                </div>

                {/* ── Tab 1: Claims I Made ── */}
                {activeTab === "mine" && (
                    <div>
                        {loading ? (
                            <p className="text-gray-400 text-center mt-10">Loading...</p>
                        ) : myClaims.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">You haven't made any claims yet</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {myClaims.map(claim => (
                                    <div key={claim.id} className="bg-[#1F2937] rounded-2xl p-6 flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white font-semibold text-lg">
                                                {claim.Item?.itemName}
                                            </h3>
                                            <p className="text-[#9ca3af] text-sm max-w-lg">{claim.message}</p>
                                            {claim.proof_image && (
                                                <img
                                                    src={`http://localhost:5000${claim.proof_image}`}
                                                    alt="proof"
                                                    className="w-16 h-16 object-cover rounded-lg mt-1"
                                                />
                                            )}
                                            <p className="text-[#9ca3af] text-xs">
                                                Submitted: {claim.createdAt?.substring(0, 10)}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            {statusBadge(claim.status)}

                                            {/* Show contact button only if approved */}
                                            {claim.status === "approved" && (
                                                <button
                                                    onClick={() => handleGetContact(claim.item_id)}
                                                    className="bg-[#5DCEA6] text-black px-4 py-2 rounded-xl text-sm font-medium"
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

                {/* ── Tab 2: Claims On My Items ── */}
                {activeTab === "onMyItems" && (
                    <div>
                        {loading ? (
                            <p className="text-gray-400 text-center mt-10">Loading...</p>
                        ) : claimsOnMyItems.length === 0 ? (
                            <p className="text-gray-400 text-center mt-10">No claims on your items yet</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {claimsOnMyItems.map(claim => (
                                    <div key={claim.id} className="bg-[#1F2937] rounded-2xl p-6 flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white font-semibold text-lg">
                                                {claim.Item?.itemName}
                                            </h3>
                                            <p className="text-[#9ca3af] text-sm">
                                                Claimed by:{" "}
                                                <span className="text-white font-medium">
                                                    {claim.claimant?.fullname}
                                                </span>
                                            </p>
                                            <p className="text-[#9ca3af] text-sm max-w-lg">
                                                "{claim.message}"
                                            </p>
                                            {claim.proof_image && (
                                                <img
                                                    src={`http://localhost:5000${claim.proof_image}`}
                                                    alt="proof"
                                                    className="w-16 h-16 object-cover rounded-lg mt-1"
                                                />
                                            )}
                                            <p className="text-[#9ca3af] text-xs">
                                                Submitted: {claim.createdAt?.substring(0, 10)}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            {statusBadge(claim.status)}

                                            {/* Approve / Reject only for pending */}
                                            {claim.status === "pending" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(claim.id)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(claim.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition"
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

            {/* ── Contact Modal ── */}
            {showContactModal && contactDetails && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-96 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">🎉 Contact Details</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Your claim was approved. Here are the reporter's contact details:
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
        </>
    );
}

export default MyClaimsPage;