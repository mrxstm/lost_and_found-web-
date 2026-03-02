import { useForm } from "react-hook-form";
import { itemSchema } from "../../../../schema/item.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "../../../../hooks/useAPI";
import imagepng from "../../../../assets/images/image-.png";
import calendar from "../../../../assets/images/Calendar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Reportform() {

    const { loading, callApi } = useApi();
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    const fetchLocations = async () => {
        const res = await callApi("GET", "/locations", {});
        setLocations(res.locations);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            itemname: "", category: "", status: "lost",
            location: "", description: "", date: "", image_files: []
        }
    });

    const images = watch("image_files");
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prev => {
            const updated = [...prev, ...files].slice(0, 4);
            setValue("image_files", updated);
            return updated;
        });
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("itemName", data.itemname);
            formData.append("category", data.category);
            formData.append("status", data.status);
            formData.append("location_id", data.location);
            formData.append("itemDescription", data.description);
            formData.append("date", data.date);
            Array.from(data.image_files).forEach((file) => {
                formData.append("image_files", file);
            });
            await callApi("POST", "/item/add", { data: formData });
            toast.success("Item added!");
            reset({ itemname: "", category: "", status: "", location: "", description: "", date: null, image_files: [] });
            setSelectedImages([]);
        } catch (e) {
            console.error("Error adding item:", e);
        }
    };

    return (
        <div className="bg-[#1F2937] w-full max-w-lg rounded-2xl text-[#9ca3af] p-3 sm:p-4 mb-10">
            <h1 className="text-white font-bold text-xs sm:text-sm mb-1">Item Details</h1>
            <p className="text-[9px] sm:text-[10px]">Please provide as much information as possible</p>

            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="itemname" className='text-[#9ca3af] text-[10px] sm:text-[12px]'>Item Name</label>
                    <input
                        id="itemname"
                        {...register("itemname")}
                        className="bg-[#111827] w-full h-6 sm:h-8 flex items-center rounded-lg mt-1 text-white text-[9px] sm:text-[10px] px-2"
                    />
                    {errors.itemname && <p className="text-red-500 text-[9px]">{errors.itemname.message}</p>}
                </div>

                <div className="flex gap-3 sm:gap-4 items-center">
                    <div className='mt-2 sm:mt-3 w-1/2'>
                        <label htmlFor="category" className='text-[#9ca3af] text-[10px] sm:text-[12px]'>Category</label>
                        <select
                            {...register("category")}
                            id="category"
                            className="bg-[#111827] w-full h-6 sm:h-8 rounded-lg px-1 outline-none border-none text-white text-[9px] sm:text-[10px]"
                            defaultValue=""
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Keys">Keys</option>
                            <option value="Purse">Purse</option>
                            <option value="Documents">Documents</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Books">Books</option>
                            <option value="Bags">Bags</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-[9px]">{errors.category.message}</p>}
                    </div>
                    <div className='mt-2 sm:mt-3 w-1/2'>
                        <label htmlFor="status" className='text-[#9ca3af] text-[10px] sm:text-[12px]'>Status</label>
                        <select
                            {...register("status")}
                            id="status"
                            className="bg-[#111827] w-full outline-none border-none text-white h-6 sm:h-8 rounded-lg px-1 text-[9px] sm:text-[10px]"
                            defaultValue=""
                        >
                            <option value="" disabled>Status</option>
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-[9px]">{errors.status.message}</p>}
                    </div>
                </div>

                <div className="mt-2 sm:mt-3 flex gap-3 sm:gap-4 items-center">
                    <div className="flex flex-col relative w-1/2">
                       <label htmlFor="date" className="text-[#9ca3af] text-[10px] sm:text-[12px]">Date</label>
                        <div className="relative w-full">
                            <DatePicker
                                selected={watch("date")}
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
                        <label htmlFor="location" className="text-[#9ca3af] text-[10px] sm:text-[12px]">Location</label>
                        <select
                            id="location"
                            {...register("location")}
                            className="bg-[#111827] w-full outline-none border-none text-white h-6 sm:h-8 rounded-lg px-1 text-[9px] sm:text-[10px]"
                        >
                            <option value="" disabled>Select a location</option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        {errors.location && <p className="text-red-500 text-[9px] mt-1">{errors.location.message}</p>}
                    </div>
                </div>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="description" className='text-[#9ca3af] text-[10px] sm:text-[12px]'>Description</label>
                    <textarea
                        id="description"
                        {...register("description")}
                        className="bg-[#111827] w-full outline-none border-none text-white h-16 sm:h-24 rounded-lg p-2 resize-none text-[9px] sm:text-[10px]"
                    />
                    {errors.description && <p className="text-red-500 text-[9px]">{errors.description.message}</p>}
                </div>

                <div className="mt-2 sm:mt-3">
                    <label htmlFor="image" className="cursor-pointer">
                        <span className="text-[#9ca3af] text-[10px] sm:text-[12px]">Upload Image (1-4)</span>
                        <div className="bg-[#111827] h-20 sm:h-28 border border-dashed rounded-xl mt-1 sm:mt-2 flex flex-col items-center justify-center gap-1">
                            <input
                                type="file"
                                className="hidden"
                                id="image"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            <img src={imagepng} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
                            <h4 className="font-semibold text-[9px] sm:text-[10px]">Click to upload image</h4>
                            <h4 className="text-[9px] sm:text-[10px]">PNG JPG upto 5MB</h4>
                        </div>
                    </label>
                    {errors.image_files && <p className="text-red-500 text-[9px]">{errors.image_files.message}</p>}

                    {images?.length > 0 && (
                        <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3 flex-wrap">
                            {selectedImages.map((file, i) => (
                                <div key={i} className="relative w-10 h-10 sm:w-14 sm:h-14">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = selectedImages.filter((_, index) => index !== i);
                                            setSelectedImages(updated);
                                            setValue("image_files", updated);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {selectedImages.length < 4 && (
                                <label htmlFor="image" className="cursor-pointer">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-dashed border-[#9ca3af] rounded flex flex-col items-center justify-center text-[#9ca3af] hover:border-white hover:text-white transition">
                                        <span className="text-base leading-none">+</span>
                                        <span className="text-[9px]">Add</span>
                                    </div>
                                </label>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <button className="bg-[#9ca3af] text-black px-3 py-1 rounded w-full text-[10px] sm:text-[12px]"
                     onClick={() => navigate("/myreports")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#111827] text-white px-3 py-1 rounded w-full text-[10px] sm:text-[12px] h-7"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Reportform;