import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import useApi from "../../../hooks/useAPI";

function AdminClaims() {
    const { callApi } = useApi();
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        try {
            const res = await callApi("GET", "/admin/claims", {});
            setClaims(res.data);
        } catch (e) {
            toast.error("Failed to fetch claims");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await callApi("DELETE", `/admin/claims/${id}`, {});
            setClaims(prev => prev.filter(c => c.id !== id));
            toast.success("Claim deleted successfully");
        } catch (e) {
            toast.error("Failed to delete claim");
        } finally {
            setConfirmId(null);
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

    const filteredClaims = filter === "all"
        ? claims
        : claims.filter(c => c.status === filter);

    if (loading) return <div className="text-center text-gray-400 mt-20">Loading claims...</div>;

    return (
        <div className="p-10 bg-[#111827] min-h-screen">
            <h1 className="text-white text-2xl font-bold mb-2">Claims</h1>
            <p className="text-[#9ca3af] mb-8">Monitor all claims across your college</p>

           {/* Filter tabs */}
            <div className="bg-[#1F2937] h-8 sm:h-12 p-1 sm:p-2 flex items-center rounded-3xl gap-1 w-fit mb-8">
                {["all", "pending", "approved", "rejected"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`rounded-3xl h-5 sm:h-8 px-3 sm:px-5 text-[10px] sm:text-sm font-semibold transition capitalize ${
                            filter === f
                                ? "bg-[#5DCEA6] text-black"
                                : "bg-transparent text-white hover:bg-[#374151]"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Claims table */}
            {filteredClaims.length === 0 ? (
                <p className="text-gray-400 text-center mt-20">No claims found</p>
            ) : (
                    <div className="bg-[#1F2937] rounded-2xl overflow-hidden p-2 overflow-x-auto">
                        <table className="w-full text-xs">
                        <thead>
                            <tr className="text-[#9ca3af] border-b border-[#374151]">
                                <th className="text-left px-6 py-4">Item</th>
                                <th className="text-left px-6 py-4">Claimant</th>
                                <th className="text-left px-6 py-4">Message</th>
                                <th className="text-left px-6 py-4">Proof</th>
                                <th className="text-left px-6 py-4">Date</th>
                                <th className="text-left px-6 py-4">Status</th>
                                <th className="text-left px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClaims.map(claim => (
                                <tr key={claim.id} className="border-b border-[#374151] hover:bg-[#111827] transition">
                                    <td className="px-6 py-4 text-white font-medium">
                                        {claim.Item?.itemName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-white">{claim.claimant?.fullname}</p>
                                        <p className="text-[#9ca3af] text-xs">{claim.claimant?.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[#9ca3af] max-w-xs truncate">
                                        {claim.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        {claim.proof_image ? (
                                            <img
                                                src={`http://localhost:5000${claim.proof_image}`}
                                                alt="proof"
                                                className="w-12 h-12 object-cover rounded-lg cursor-pointer"
                                                onClick={() => window.open(`http://localhost:5000${claim.proof_image}`, "_blank")}
                                            />
                                        ) : (
                                            <span className="text-[#9ca3af] text-xs">No proof</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-[#9ca3af]">
                                        {claim.createdAt?.substring(0, 10)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {statusBadge(claim.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setConfirmId(claim.id)}
                                            className="text-red-400 hover:text-red-300 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-80 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">Delete Claim</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Are you sure you want to delete this claim? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => setConfirmId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => handleDelete(confirmId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminClaims;