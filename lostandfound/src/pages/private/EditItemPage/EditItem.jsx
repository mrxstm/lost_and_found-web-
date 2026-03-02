import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import backarrow from "../../../assets/images/backarrow.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApi from "../../../hooks/useAPI";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imagepng from "../../../assets/images/image-.png";
import calendar from "../../../assets/images/Calendar.png";

const editItemSchema = z.object({
    itemname:    z.string().min(3, { message: "Name must be at least 3 characters" }),
    category:    z.string().nonempty({ message: "Category is required" }),
    status:      z.string().nonempty({ message: "Status is required" }),
    location:    z.string().nonempty({ message: "Location is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    date:        z.string().nonempty({ message: "Date is required" })
                  .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" })
                  .refine(val => new Date(val) <= new Date(), { message: "Date cannot be in the future" }),
});

function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, callApi } = useApi();

    const [locations, setLocations] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(editItemSchema),
        defaultValues: {
            itemname: "", category: "", status: "",
            location: "", description: "", date: ""
        }
    });

    useEffect(() => {
        const fetchLocations = async () => {
            const res = await callApi("GET", "/locations", {});
            setLocations(res.locations);
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await callApi("GET", `/item/${id}`, {});
                const item = res.data;
                reset({
                    itemname:    item.itemName,
                    category:    item.category,
                    status:      item.status,
                    location:    String(item.location_id),
                    description: item.itemDescription,
                    date:        item.date?.substring(0, 10),
                });
                setExistingImages(item.image_urls || []);
            } catch (e) {
                toast.error("Failed to load item");
            }
        };
        fetchItem();
    }, [id]);

    const handleImageAdd = (e) => {
        const files = Array.from(e.target.files);
        const slotsLeft = 4 - existingImages.length - newImages.length;
        const toAdd = files.slice(0, slotsLeft);
        setNewImages(prev => [...prev, ...toAdd]);
        e.target.value = "";
    };

    const handleRemoveExisting = (url) => {
        setRemovedImages(prev => [...prev, url]);
        setExistingImages(prev => prev.filter(img => img !== url));
    };

    const handleRemoveNew = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        if (existingImages.length + newImages.length === 0) {
            toast.error("At least one image is required");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("itemName",        data.itemname);
            formData.append("category",        data.category);
            formData.append("status",          data.status);
            formData.append("location_id",     data.location);
            formData.append("itemDescription", data.description);
            formData.append("date",            data.date);
            removedImages.forEach(url => formData.append("removed_images", url));
            newImages.forEach(file => formData.append("image_files", file));
            await callApi("PUT", `/item/${id}`, { data: formData });
            toast.success("Item updated successfully!");
            navigate("/myreports");
        } catch (e) {
            toast.error("Failed to update item");
        }
    };

    const totalImages = existingImages.length + newImages.length;

    return (
        <div>
            <div className="bg-[#1F2937] h-12 sm:h-16 w-full z-50 fixed top-0 left-0 flex items-center px-4 sm:px-12 gap-4 sm:gap-10">
                <Link to="/myreports">
                    <img src={backarrow} alt="" className="w-4 sm:w-6" />
                </Link>
                <h1 className="text-white text-sm sm:text-lg font-medium">Edit Item</h1>
            </div>

            <div className="min-h-screen bg-[#111827] flex justify-center pt-16 sm:pt-20 py-6 sm:py-10 px-3 sm:px-4">
            <div className="bg-[#1F2937] w-full max-w-lg rounded-2xl text-[#9ca3af] p-3 sm:p-4 mb-10">

                <form onSubmit={handleSubmit(onSubmit, e => console.log(e))}>

                    {/* Item Name */}
                    <div className="mt-2 sm:mt-3">
                        <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Item Name</label>
                        <input
                            {...register("itemname")}
                            className="bg-[#111827] w-full h-6 sm:h-8 flex items-center rounded-lg mt-1 text-white text-[9px] sm:text-[10px] px-2 outline-none"
                        />
                        {errors.itemname && <p className="text-red-500 text-[9px]">{errors.itemname.message}</p>}
                    </div>

                    {/* Category + Status */}
                    <div className="flex gap-3 sm:gap-4 items-center">
                        <div className="mt-2 sm:mt-3 w-1/2">
                            <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Category</label>
                            <select
                                {...register("category")}
                                className="bg-[#111827] w-full h-6 sm:h-8 rounded-lg px-1 outline-none border-none text-white text-[9px] sm:text-[10px]"
                            >
                                <option value="" disabled>Select a category</option>
                                {["Electronics","Keys","Purse","Documents","Clothing","Books","Bags","Other"].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-[9px]">{errors.category.message}</p>}
                        </div>

                        <div className="mt-2 sm:mt-3 w-1/2">
                            <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Status</label>
                            <select
                                {...register("status")}
                                className="bg-[#111827] w-full h-6 sm:h-8 rounded-lg px-1 outline-none border-none text-white text-[9px] sm:text-[10px]"
                            >
                                <option value="" disabled>Select status</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-[9px]">{errors.status.message}</p>}
                        </div>
                    </div>

                    {/* Date + Location */}
                    <div className="mt-2 sm:mt-3 flex gap-3 sm:gap-4 items-center">
                        <div className="flex flex-col relative w-1/2">
                            <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Date</label>
                            <div className="relative w-full">
                                <DatePicker
                                    selected={watch("date") ? new Date(watch("date")) : null}
                                    onChange={date => setValue("date", date.toISOString().split("T")[0])}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="yyyy-mm-dd"
                                    className="w-full bg-[#111827] text-white h-6 sm:h-8 rounded-lg px-2 pr-6 text-[10px] sm:text-[12px]"
                                    wrapperClassName="w-full"
                                />
                                <img src={calendar} alt="" className="size-2.5 sm:size-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            {errors.date && <p className="text-red-500 text-[9px] mt-1">{errors.date.message}</p>}
                        </div>

                        <div className="flex flex-col w-1/2">
                            <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Location</label>
                            <select
                                {...register("location")}
                                className="bg-[#111827] w-full h-6 sm:h-8 rounded-lg px-1 outline-none border-none text-white text-[9px] sm:text-[10px]"
                            >
                                <option value="" disabled>Select a location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={String(loc.id)}>{loc.name}</option>
                                ))}
                            </select>
                            {errors.location && <p className="text-red-500 text-[9px] mt-1">{errors.location.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-2 sm:mt-3">
                        <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Description</label>
                        <textarea
                            {...register("description")}
                            className="bg-[#111827] w-full outline-none border-none text-white h-16 sm:h-24 rounded-lg p-2 resize-none text-[9px] sm:text-[10px]"
                        />
                        {errors.description && <p className="text-red-500 text-[9px]">{errors.description.message}</p>}
                    </div>

                    {/* Images */}
                    <div className="mt-2 sm:mt-3">
                        <label className="text-[#9ca3af] text-[10px] sm:text-[12px]">Images (1–4)</label>

                        {/* Upload drop zone — only show when no images yet */}
                        {totalImages === 0 && (
                            <label htmlFor="edit-image" className="cursor-pointer">
                                <div className="bg-[#111827] h-20 sm:h-28 border border-dashed rounded-xl mt-1 sm:mt-2 flex flex-col items-center justify-center gap-1">
                                    <img src={imagepng} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                                    <h4 className="font-semibold text-[9px] sm:text-[10px]">Click to upload image</h4>
                                    <h4 className="text-[9px] sm:text-[10px]">PNG JPG upto 5MB</h4>
                                </div>
                            </label>
                        )}

                        {/* Image previews */}
                        {totalImages > 0 && (
                            <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3 flex-wrap">
                                {existingImages.map((url, i) => (
                                    <div key={`existing-${i}`} className="relative w-10 h-10 sm:w-14 sm:h-14">
                                        <img
                                            src={`http://localhost:5000${url}`}
                                            alt="existing"
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExisting(url)}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] hover:bg-red-600"
                                        >✕</button>
                                    </div>
                                ))}

                                {newImages.map((file, i) => (
                                    <div key={`new-${i}`} className="relative w-10 h-10 sm:w-14 sm:h-14">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="new"
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNew(i)}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] hover:bg-red-600"
                                        >✕</button>
                                    </div>
                                ))}

                                {totalImages < 4 && (
                                    <label htmlFor="edit-image" className="cursor-pointer">
                                        <div className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-dashed border-[#9ca3af] rounded flex flex-col items-center justify-center text-[#9ca3af] hover:border-white hover:text-white transition">
                                            <span className="text-base leading-none">+</span>
                                            <span className="text-[9px]">Add</span>
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}

                        <input
                            type="file"
                            id="edit-image"
                            className="hidden"
                            accept="image/jpeg, image/png"
                            multiple
                            onChange={handleImageAdd}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/myreports")}
                            className="bg-[#9ca3af] text-black px-3 py-1 rounded w-full text-[10px] sm:text-[12px]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#5DCEA6] text-black px-3 py-1 rounded w-full text-[10px] sm:text-[12px] h-7"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
            </div>
        </div>
    );
}

export default EditItem;