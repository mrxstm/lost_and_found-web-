import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import useApi from "../../../hooks/useAPI";

function AdminLocations() {
    const { callApi } = useApi();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await callApi("GET", "/locations", {});
            setLocations(res.locations);
        } catch (e) {
            toast.error("Failed to fetch locations");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!newName.trim()) return toast.error("Location name is required");
        try {
            const res = await callApi("POST", "/locations", { data: { name: newName } });
            setLocations(prev => [...prev, res.data].sort((a, b) => a.name.localeCompare(b.name)));
            setNewName("");
            toast.success("Location added!");
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to add location");
        }
    };

    const handleUpdate = async (id) => {
        if (!editingName.trim()) return toast.error("Location name is required");
        try {
            await callApi("PUT", `/locations/${id}`, { data: { name: editingName } });
            setLocations(prev =>
                prev.map(loc => loc.id === id ? { ...loc, name: editingName } : loc)
                    .sort((a, b) => a.name.localeCompare(b.name))
            );
            setEditingId(null);
            toast.success("Location updated!");
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to update location");
        }
    };

    const handleDelete = async (id) => {
        try {
            await callApi("DELETE", `/locations/${id}`, {});
            setLocations(prev => prev.filter(loc => loc.id !== id));
            toast.success("Location deleted!");
        } catch (e) {
            toast.error("Failed to delete location");
        } finally {
            setConfirmDeleteId(null);
        }
    };

    if (loading) return <div className="bg-[#111827] min-h-screen text-center text-gray-400 pt-20 text-xs sm:text-sm">Loading locations...</div>;

    return (
        <div className="p-4 sm:p-12 bg-[#111827] min-h-screen">
            <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Locations</h1>
            <p className="text-[#9ca3af] text-xs sm:text-sm mb-4 sm:mb-8">Manage locations for your college</p>

            {/* Add new location */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-8 max-w-lg sm:max-w-xl">
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                    placeholder="Enter new location name"
                    className="bg-[#1F2937] text-white rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 outline-none flex-1 border border-[#374151] focus:border-[#5DCEA6] transition text-[10px] sm:text-sm"
                />
                <button
                    onClick={handleAdd}
                    className="bg-[#5DCEA6] text-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-2 font-medium hover:opacity-90 transition text-[10px] sm:text-sm"
                >
                    <Plus size={14} className="sm:size-[18px]" /> Add
                </button>
            </div>

            {/* Locations list */}
            <div className="bg-[#1F2937] rounded-2xl overflow-hidden max-w-lg sm:max-w-xl">
                {locations.length === 0 ? (
                    <p className="text-center text-gray-400 py-10 text-xs sm:text-sm">No locations found</p>
                ) : (
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="text-[#9ca3af] border-b border-[#374151] text-[9px] sm:text-xs lg:text-sm">
                                <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[10%]">#</th>
                                <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[70%]">Location Name</th>
                                <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[20%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((loc, index) => (
                                <tr key={loc.id} className="border-b border-[#374151] hover:bg-[#111827] transition text-[9px] sm:text-xs lg:text-sm">
                                    <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-[#9ca3af]">{index + 1}</td>
                                    <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-white">
                                        {editingId === loc.id ? (
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={e => setEditingName(e.target.value)}
                                                onKeyDown={e => e.key === "Enter" && handleUpdate(loc.id)}
                                                className="bg-[#111827] text-white rounded-lg px-2 sm:px-3 py-1 outline-none border border-[#5DCEA6] w-full text-[9px] sm:text-xs"
                                                autoFocus
                                            />
                                        ) : (
                                            loc.name
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            {editingId === loc.id ? (
                                                <>
                                                    <button onClick={() => handleUpdate(loc.id)} className="text-green-400 hover:text-green-300 transition">
                                                        <Check size={12} className="sm:size-[18px]" />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white transition">
                                                        <X size={12} className="sm:size-[18px]" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => { setEditingId(loc.id); setEditingName(loc.name); }}
                                                        className="text-blue-400 hover:text-blue-300 transition"
                                                    >
                                                        <Pencil size={12} className="sm:size-[18px]" />
                                                    </button>
                                                    <button onClick={() => setConfirmDeleteId(loc.id)} className="text-red-400 hover:text-red-300 transition">
                                                        <Trash2 size={12} className="sm:size-[18px]" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4">
                        <h2 className="text-white text-sm sm:text-lg font-semibold">Delete Location</h2>
                        <p className="text-[#9ca3af] text-[10px] sm:text-sm">
                            Are you sure? Items linked to this location may be affected.
                        </p>
                        <div className="flex justify-end gap-2 sm:gap-3">
                            <button
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
                                onClick={() => handleDelete(confirmDeleteId)}
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

export default AdminLocations;