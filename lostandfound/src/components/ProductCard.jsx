import { useState, useRef, useEffect } from 'react';
import locationimg from '../assets/images/location.png';
import calendar from '../assets/images/dates.png';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Trash2, Pencil } from 'lucide-react';

function ProductCard({ id, item_name, image, location, date, fromPage, status, onDelete }) {

    const [showMenu, setShowMenu] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const colors = {
        lost: { bg: 'bg-red-500', text: 'text-white' },
        found: { bg: 'bg-green-400', text: 'text-black' },
    };

    const { bg, text } = colors[status] || { bg: 'bg-gray-500', text: 'text-white' };
    const isHomePage = fromPage === "home";
    const isMyReports = fromPage === "myReports";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const cardContent = (
        <div className={`bg-[#1F2937] h-[480px] w-[380px] rounded-xl shadow-sm ${!isHomePage ? 'cursor-pointer hover:shadow-md' : ''}`}>

            {fromPage === "search" && (
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${bg} ${text} z-10`}>
                    {status}
                </div>
            )}

            <img
                src={image}
                alt={item_name}
                className="h-[250px] w-full object-cover object-center rounded-t-xl"
            />
            <h1 className="mt-4 ml-4 text-white font-semibold">{item_name}</h1>
            <p className='mt-2 ml-5 text-[#D1D5DB] flex items-center gap-2 text-sm'>
                <img src={locationimg} alt="" className='size-3.5' /> {location}
            </p>
            <p className='mt-2 ml-5 text-[#D1D5DB] flex items-center gap-2 text-sm'>
                <img src={calendar} alt="" className='size-3.5' /> {date}
            </p>

            {!isHomePage && (
                <button className='bg-[#5DCEA6] w-[90%] ml-4 mt-4 h-10 rounded-xl text-black'>
                    View Details
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* ── Outer wrapper: handles positioning + hover group ── */}
            <div className="relative group w-fit">

                {/* Card wrapped in Link (except home page) */}
                {isHomePage
                    ? cardContent
                    : <Link to={`/item/${id}`} state={{ from: fromPage }}>{cardContent}</Link>
                }

                {/* ── Triple-dot menu: sits OUTSIDE the Link so clicks don't navigate ── */}
                {isMyReports && (
                    <div
                        ref={menuRef}
                        className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <button
                            type="button"
                            onClick={() => setShowMenu(prev => !prev)}
                            className="bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-1 w-36 bg-[#111827] border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMenu(false);
                                        navigate(`/item/edit/${id}`);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2.5 text-white hover:bg-[#1F2937] text-sm transition"
                                >
                                    <Pencil size={14} /> Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMenu(false);
                                        setShowConfirm(true);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:bg-[#1F2937] text-sm transition"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Delete Confirmation Modal ── */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-2xl w-80 flex flex-col gap-3">
                        <h2 className="text-white text-lg font-semibold">Delete Item</h2>
                        <p className="text-gray-400 text-sm">
                            Are you sure you want to delete{' '}
                            <span className="text-white font-medium">"{item_name}"</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                                onClick={() => {
                                    onDelete(id);
                                    setShowConfirm(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;