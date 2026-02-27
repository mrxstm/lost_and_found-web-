import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useAPI";

function Users() {
    const { callApi } = useApi();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);

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

    if (loading) return <div className="bg-[#1F2937] min-h-screen text-center text-gray-400 pt-20 text-xs sm:text-sm">Loading users...</div>;

    return (
        <div className="p-4 sm:p-10 min-h-screen bg-[#1F2937]">
            <h1 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Users</h1>
            <p className="text-[#9ca3af] text-xs sm:text-sm mb-4 sm:mb-8">Manage all registered users</p>

            <div className="bg-[#111827] rounded-2xl overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="text-[#9ca3af] border-b border-[#374151] text-[9px] sm:text-[10px] lg:text-[11px]">
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[20%]">Name</th>
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[18%]">Username</th>
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[28%]">Email</th>
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[16%]">Phone</th>
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[10%]">Gender</th>
                            <th className="text-left px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 w-[8%]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b border-[#374151] hover:bg-[#1F2937] transition text-[9px] sm:text-[10px] lg:text-[11px]">
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-white truncate">{u.fullname}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-[#9ca3af] truncate">@{u.username}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-[#9ca3af] truncate">{u.email}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-[#9ca3af] truncate">{u.phone_no}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-[#9ca3af] capitalize truncate">{u.gender}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                                    <button
                                        onClick={() => setConfirmId(u.id)}
                                        className="text-red-400 hover:text-red-300 transition"
                                    >
                                        <Trash2 size={12} className="sm:size-[14px] lg:size-[18px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {confirmId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#1F2937] p-4 sm:p-6 rounded-2xl w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4">
                        <h2 className="text-white text-sm sm:text-lg font-semibold">Delete User</h2>
                        <p className="text-[#9ca3af] text-[10px] sm:text-sm">
                            Are you sure you want to delete this user? This will also delete all their reported items.
                        </p>
                        <div className="flex justify-end gap-2 sm:gap-3">
                            <button
                                className="bg-gray-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
                                onClick={() => setConfirmId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-sm"
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