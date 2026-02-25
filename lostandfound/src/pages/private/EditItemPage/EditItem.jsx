import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApi from "../../../hooks/useAPI";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imagepng from "../../../assets/images/image-.png";
import calendar from "../../../assets/images/Calendar.png";

// Relaxed schema for edit — images are optional since existing ones may remain
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
    const [existingImages, setExistingImages] = useState([]);   // saved URLs from server
    const [removedImages, setRemovedImages] = useState([]);     // URLs marked for removal
    const [newImages, setNewImages] = useState([]);             // newly picked File objects

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

    // fetch locations
    useEffect(() => {
        const fetchLocations = async () => {
            const res = await callApi("GET", "/locations", {});
            setLocations(res.locations);
        };
        fetchLocations();
    }, []);

    // fetch item and pre-fill form
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
        // reset file input so same file can be re-selected if removed
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
        // must have at least 1 image total
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

            // tell backend which existing images to delete
            removedImages.forEach(url => formData.append("removed_images", url));

            // attach new images
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
        <div className="min-h-screen bg-[#111827] flex justify-center py-10 px-4">
            <div className="bg-[#1F2937] w-full max-w-[900px] rounded-2xl text-[#9ca3af] p-6">

                <h1 className="text-white font-bold text-xl mb-1">Edit Item</h1>
                <p className="text-sm">Update the details of your reported item</p>

                <form onSubmit={handleSubmit(onSubmit, e => console.log(e))}>

                    {/* Item Name */}
                    <div className="mt-6">
                        <label className="text-[#9ca3af]">Item Name</label>
                        <input
                            {...register("itemname")}
                            className="bg-[#111827] w-full h-12 rounded-lg mt-2 text-white px-4 outline-none"
                        />
                        {errors.itemname && <p className="text-red-500 mt-1">{errors.itemname.message}</p>}
                    </div>

                    {/* Category + Status */}
                    <div className="flex gap-10 mt-6">
                        <div className="flex-1">
                            <label className="text-[#9ca3af]">Category</label>
                            <select
                                {...register("category")}
                                className="bg-[#111827] w-full h-12 rounded-lg p-2 outline-none text-white mt-2"
                            >
                                <option value="" disabled>Select a category</option>
                                {["Electronics","Keys","Purse","Documents","Clothing","Books","Bags","Other"].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
                        </div>

                        <div className="flex-1">
                            <label className="text-[#9ca3af]">Status</label>
                            <select
                                {...register("status")}
                                className="bg-[#111827] w-full h-12 rounded-lg p-2 outline-none text-white mt-2"
                            >
                                <option value="" disabled>Select status</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                            {errors.status && <p className="text-red-500 mt-1">{errors.status.message}</p>}
                        </div>
                    </div>

                    {/* Date + Location */}
                    <div className="flex gap-10 mt-6">
                        <div className="flex-1">
                            <label className="text-[#9ca3af]">Date</label>
                            <div className="relative mt-2">
                                <DatePicker
                                    selected={watch("date") ? new Date(watch("date")) : null}
                                    onChange={date => setValue("date", date.toISOString().split("T")[0])}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="yyyy-mm-dd"
                                    className="bg-[#111827] text-white h-12 rounded-lg p-2 w-full"
                                    wrapperClassName="w-full"
                                />
                                <img src={calendar} alt="" className="size-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            {errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
                        </div>

                        <div className="flex-1">
                            <label className="text-[#9ca3af]">Location</label>
                            <select
                                {...register("location")}
                                className="bg-[#111827] w-full h-12 rounded-lg p-2 outline-none text-white mt-2"
                            >
                                <option value="" disabled>Select a location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={String(loc.id)}>{loc.name}</option>
                                ))}
                            </select>
                            {errors.location && <p className="text-red-500 mt-1">{errors.location.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <label className="text-[#9ca3af]">Description</label>
                        <textarea
                            {...register("description")}
                            className="bg-[#111827] w-full h-40 rounded-lg p-2 outline-none text-white resize-none mt-2"
                        />
                        {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Images */}
                    <div className="mt-6">
                        <label className="text-[#9ca3af]">Images (1–4)</label>
                        <div className="mt-4 flex gap-4 flex-wrap">

                            {/* Existing images from server */}
                            {existingImages.map((url, i) => (
                                <div key={`existing-${i}`} className="relative w-20 h-20">
                                    <img
                                        src={`http://localhost:5000${url}`}
                                        alt="existing"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExisting(url)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                    >✕</button>
                                </div>
                            ))}

                            {/* Newly picked images */}
                            {newImages.map((file, i) => (
                                <div key={`new-${i}`} className="relative w-20 h-20">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="new"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNew(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                    >✕</button>
                                </div>
                            ))}

                            {/* Add more slot */}
                            {totalImages < 4 && (
                                <label htmlFor="edit-image" className="cursor-pointer">
                                    <div className="w-20 h-20 border-2 border-dashed border-[#9ca3af] rounded flex flex-col items-center justify-center text-[#9ca3af] hover:border-white hover:text-white transition">
                                        <span className="text-2xl leading-none">+</span>
                                        <span className="text-xs mt-1">Add</span>
                                    </div>
                                </label>
                            )}
                        </div>

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
                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/my-reports")}
                            className="bg-[#9ca3af] text-black px-4 py-2 rounded-xl w-full h-12"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#5DCEA6] text-black px-4 py-2 rounded-xl w-full h-12"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditItem;