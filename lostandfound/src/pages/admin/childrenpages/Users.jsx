import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useAPI";

function Users() {
    const { callApi } = useApi();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null); // id of user to delete

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await callApi("GET", "/admin/users", {});
                setUsers(res);
            } catch (e) {
                toast.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await callApi("DELETE", `/admin/users/${id}`, {});
            setUsers(prev => prev.filter(u => u.id !== id));
            toast.success("User deleted successfully");
        } catch (e) {
            toast.error("Failed to delete user");
        } finally {
            setConfirmId(null);
        }
    };

    if (loading) return <div className="bg-[#1F2937] text-center text-gray-400 mt-20">Loading users...</div>;

    return (
        <div className="p-10 min-h-screen bg-[#1F2937]">
            <h1 className="text-white text-2xl font-bold mb-2">Users</h1>
            <p className="text-[#9ca3af] mb-8">Manage all registered users</p>

            <div className="bg-[#111827] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-[#9ca3af] border-b border-[#374151]">
                            <th className="text-left px-6 py-4">Name</th>
                            <th className="text-left px-6 py-4">Username</th>
                            <th className="text-left px-6 py-4">Email</th>
                            <th className="text-left px-6 py-4">Phone</th>
                            <th className="text-left px-6 py-4">Gender</th>
                            <th className="text-left px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b border-[#374151] hover:bg-[#1F2937] transition">
                                <td className="px-6 py-4 text-white">{u.fullname}</td>
                                <td className="px-6 py-4 text-[#9ca3af]">@{u.username}</td>
                                <td className="px-6 py-4 text-[#9ca3af]">{u.email}</td>
                                <td className="px-6 py-4 text-[#9ca3af]">{u.phone_no}</td>
                                <td className="px-6 py-4 text-[#9ca3af] capitalize">{u.gender}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setConfirmId(u.id)}
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

            {/* Delete Confirmation Modal */}
            {confirmId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-80 flex flex-col gap-4">
                        <h2 className="text-white text-lg font-semibold">Delete User</h2>
                        <p className="text-[#9ca3af] text-sm">
                            Are you sure you want to delete this user? This will also delete all their reported items.
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

export default Users;