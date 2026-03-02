import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useAPI";
import locationimg from "../../../assets/images/location.png";
import calendar from "../../../assets/images/dates.png";

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

    if (loading) return <div className="bg-[#111827] min-h-screen text-center text-gray-400 pt-20 text-xs sm:text-sm">Loading pending items...</div>;

    return (
        <div className="p-4 sm:p-10  min-h-screen">
            <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Pending Items</h1>
            <p className="text-[#9ca3af] text-xs sm:text-sm mb-4 sm:mb-8">Review and approve reported items</p>

            {items.length === 0 ? (
                <div className="text-center text-gray-400 mt-20 text-xs sm:text-sm">No pending items</div>
            ) : (
                <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2 lg:gap-y-5">
                    {items.map(item => (
                        <div key={item.id} className="bg-[#1F2937] rounded-xl shadow-sm w-[200px] sm:w-[200px]">
                            <img
                                src={`http://localhost:5000${item.image_urls?.[0]}`}
                                alt={item.itemName}
                                className="h-24 sm:h-28 lg:h-36 w-full object-cover object-center rounded-t-xl"
                            />
                            <div className="p-2 sm:p-3">
                                <h1 className="text-white font-semibold truncate text-[10px] sm:text-xs mt-1 mb-1.5 sm:mb-2">{item.itemName}</h1>
                                <p className="mt-1 text-[#D1D5DB] flex items-center gap-1.5 text-[9px] sm:text-[11px]">
                                    <img src={locationimg} alt="" className="size-2.5 sm:size-3 shrink-0" />
                                    <span className="truncate">{item.Location?.name}</span>
                                </p>
                                <p className="mt-1 text-[#D1D5DB] flex items-center gap-1.5 text-[9px] sm:text-[11px]">
                                    <img src={calendar} alt="" className="size-2.5 sm:size-3 shrink-0" />
                                    {item.date?.substring(0, 10)}
                                </p>
                                <p className="mt-1 text-[#9ca3af] text-[9px] sm:text-[10px] truncate">
                                    By: <span className="text-white">{item.reporter?.fullname}</span>
                                </p>

                                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-[#5DCEA6] text-black text-[9px] sm:text-[11px] h-6 sm:h-7 rounded-lg hover:opacity-90 transition font-medium"
                                    >
                                        <CheckCircle size={10} className="sm:size-3" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(item.id)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white text-[9px] sm:text-[11px] h-6 sm:h-7 rounded-lg hover:opacity-90 transition font-medium"
                                    >
                                        <XCircle size={10} className="sm:size-3" /> Reject
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