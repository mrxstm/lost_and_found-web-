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
            const res = await callApi("PUT", `/locations/${id}`, { data: { name: editingName } });
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

    if (loading) return <div className="text-center text-gray-400 mt-20">Loading locations...</div>;

    return (
        <div className="p-10 bg-[#111827] min-h-screen">
            <h1 className="text-white text-2xl font-bold mb-2">Locations</h1>
            <p className="text-[#9ca3af] mb-8">Manage locations for your college</p>

            {/* Add new location */}
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                    placeholder="Enter new location name"
                    className="bg-[#1F2937] text-white rounded-xl px-4 py-2 outline-none flex-1 border border-[#374151] focus:border-[#5DCEA6] transition"
                />
                <button
                    onClick={handleAdd}
                    className="bg-[#5DCEA6] text-black px-5 py-2 rounded-xl flex items-center gap-2 font-medium hover:opacity-90 transition"
                >
                    <Plus size={18} /> Add
                </button>
            </div>

            {/* Locations list */}
            <div className="bg-[#1F2937] rounded-2xl overflow-hidden">
                {locations.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">No locations found</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[#9ca3af] border-b border-[#374151]">
                                <th className="text-left px-6 py-4">#</th>
                                <th className="text-left px-6 py-4">Location Name</th>
                                <th className="text-left px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((loc, index) => (
                                <tr key={loc.id} className="border-b border-[#374151] hover:bg-[#111827] transition">
                                    <td className="px-6 py-4 text-[#9ca3af]">{index + 1}</td>
                                    <td className="px-6 py-4 text-white">
                                        {editingId === loc.id ? (
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={e => setEditingName(e.target.value)}
                                                onKeyDown={e => e.key === "Enter" && handleUpdate(loc.id)}
                                                className="bg-[#111827] text-white rounded-lg px-3 py-1 outline-none border border-[#5DCEA6] w-64"
                                                autoFocus
                                            />
                                        ) : (
                                            loc.name
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {editingId === loc.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdate(loc.id)}
                                                        className="text-green-400 hover:text-green-300 transition"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-gray-400 hover:text-white transition"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(loc.id);
                                                            setEditingName(loc.name);
                                                        }}
                                                        className="text-blue-400 hover:text-blue-300 transition"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(loc.id)}
                                                        className="text-red-400 hover:text-red-300 transition"
                                                    >
                                                        <Trash2 size={18} />
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-80 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">Delete Location</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Are you sure? Items linked to this location may be affected.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
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