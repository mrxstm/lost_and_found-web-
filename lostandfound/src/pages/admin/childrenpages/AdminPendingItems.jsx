import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useAPI";

function AdminPendingItems() {
    const { callApi } = useApi();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await callApi("GET", "/admin/items/pending", {});
                setItems(res.data);
            } catch (e) {
                toast.error("Failed to fetch pending items");
            } finally {
                setLoading(false);
            }
        };
        fetchPending();
    }, []);

    const handleApprove = async (id) => {
        try {
            await callApi("PATCH", `/admin/items/${id}/approve`, {});
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success("Item approved!");
        } catch (e) {
            toast.error("Failed to approve item");
        }
    };

    const handleReject = async (id) => {
        try {
            await callApi("DELETE", `/admin/items/${id}/reject`, {});
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success("Item rejected and deleted");
        } catch (e) {
            toast.error("Failed to reject item");
        }
    };

    if (loading) return <div className="bg-[#1F2937] text-center text-gray-400 mt-20">Loading pending items...</div>;

    return (
        <div className="p-10 bg-[#1F2937] min-h-screen">
            <h1 className="text-white text-2xl font-bold mb-2">Pending Items</h1>
            <p className="text-[#9ca3af] mb-8">Review and approve reported items</p>

            {items.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">No pending items</div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-[#111827] rounded-2xl overflow-hidden">
                            <img
                                src={`http://localhost:5000${item.image_urls?.[0]}`}
                                alt={item.itemName}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-white font-semibold">{item.itemName}</h3>
                                <p className="text-[#9ca3af] text-xs">{item.category} • {item.status}</p>
                                <p className="text-[#9ca3af] text-xs">{item.Location?.name}</p>
                                <p className="text-[#9ca3af] text-xs">
                                    Reported by: <span className="text-white">{item.reporter?.fullname}</span>
                                </p>
                                <p className="text-[#9ca3af] text-xs">{item.date?.substring(0, 10)}</p>

                                {/* Approve / Reject buttons */}
                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#5DCEA6] text-black text-sm py-2 rounded-xl hover:opacity-90 transition"
                                    >
                                        <CheckCircle size={16} /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(item.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white text-sm py-2 rounded-xl hover:opacity-90 transition"
                                    >
                                        <XCircle size={16} /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPendingItems;