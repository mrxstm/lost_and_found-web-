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


function Reportform() {

    const{loading, callApi} = useApi();
    const[locations, setLocations] = useState([]);

    //fetching location according to college
    const fetchLocations = async() => {
        const res = await callApi("GET", "/locations", {});
        setLocations(res.locations)
    }
    useEffect(()=> {
        fetchLocations();
    }, []);

 

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        resolver:zodResolver(itemSchema),
        defaultValues: {
            itemname: "",
            category: "",
            status: "lost", // default to lost
            location: "",
            description: "",
            date: "",
            image_files: []
        }
    });

    const images = watch("image_files"); // watch the image_files field


    //for preview images
    const [selectedImages, setSelectedImages] = useState([]);

   const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prev => {
            const updated = [...prev, ...files].slice(0, 4); // max 4
            setValue("image_files", updated); // update RHF value here
            return updated;
        });
    };


    const onSubmit = async(data) => {
        try {
            
            const formData = new FormData();

            formData.append("itemName", data.itemname);
            formData.append("category", data.category);
            formData.append("status", data.status);
            formData.append("location_id", data.location);
            formData.append("itemDescription", data.description);
            formData.append("date", data.date);

            console.log(formData);
            
            // Append images
            Array.from(data.image_files).forEach((file) => {
            formData.append("image_files", file);
            });

            //api call
            const res = await callApi("POST", "/item/add", {data: formData});
            //success message
            toast.success("Item added!");

            // clearing the form after successfully adding the item
            reset({
                itemname: "",
                category: "",
                status: "",
                location: "",
                description: "",
                date: null,
                image_files: []
            });
            setSelectedImages([]);
        } catch(e) {
            console.error("Error adding item:", e);
        }
    }
    return(
        <div className="bg-[#1F2937] h-[1500px] w-[900px] rounded-2xl text-[#9ca3af] p-6 mt-10">
            <h1 className="text-white font-bold text-xl mb-2">Item Details</h1>
            <p>Please provide as much information as possible</p>
           
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, (errors)=> console.log(errors))}>
                <div className='mt-6'>
                    <label htmlFor="itemname" className='text-[#9ca3af]'>Item Name</label>
                    <input id="itemname" {...register("itemname")} className="bg-[#111827] w-full h-12 flex items-center gap-2 rounded-lg mt-2"/>
                    {errors.itemname && <p style={{color:"red"}}>{errors.itemname.message}</p>}
                </div>
               
                <div className="flex gap-10 items-center">
                    <div className='mt-6 w-1/2'>
                        <label htmlFor="category" className='text-[#9ca3af]'>Category</label>
                            <select
                                {...register("category")}
                                id="category"
                                className="bg-[#111827] w-full h-12 rounded-lg p-2 outline-none border-none text-white"
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
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>
                    <div className='mt-6 w-1/2'>
                        <label htmlFor="status" className='text-[#9ca3af]'>Status</label>
                            <select
                                {...register("status")}
                                id="status"
                                className="bg-[#111827] w-full outline-none border-none text-white h-12 rounded-lg p-2 "
                                defaultValue=""
                                >
                                <option value="" disabled>Status</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                    </div>
                </div>

                <div className="mt-4 flex gap-10 items-center justify-around ">
                    <div className="flex flex-col relative mt-2 w-1/2">
                            <label htmlFor="date" className="text-[#9ca3af]">Date</label>
                            <div className="relative">
                            <DatePicker
                                selected={watch("date")}
                                onChange={date => setValue("date", date.toISOString().split("T")[0])}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="yyyy-mm-dd"
                                className="w-80 bg-[#111827] text-white h-12 rounded-lg p-2 "
                            />
                            <img src={calendar} alt="" className="size-4 absolute right-4 top-1/2 -translate-y-1/2" />
                            </div>
                            {errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
                    </div>

                    <div className="flex flex-col w-1/2">
                        <label htmlFor="location" className="text-[#9ca3af]">Location</label>
                        <select
                        id="location"
                        {...register("location")}
                        className="bg-[#111827] w-full outline-none border-none text-white h-12 rounded-lg p-2"
                        > 
                        <option value="" disabled>Select a location</option>
                        {locations.map((loc)=> {
                                return <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            })
                        }
                        </select>
                        {errors.location && <p className="text-red-500 mt-1">{errors.location.message}</p>}
                    </div>
                </div>

                
                <div className='mt-6'>
                    <label htmlFor="description" className='text-[#9ca3af]'>Description</label>
                    <textarea type="text" id="description" {...register("description")} className="bg-[#111827] w-full outline-none border-none text-white h-40 rounded-lg p-2 resize-none"/>
                    {errors.description && <p style={{color:"red"}}>{errors.description.message}</p>}
                </div>


                <div className="mt-6">
                    <label
                        htmlFor="image"
                        className="cursor-pointer"
                    >
                            <span className="text-[#9ca3af]">Upload Image (1-4)</span>
                            <div className="bg-[#111827] h-52 border border-dashed rounded-xl mt-4 flex flex-col items-center justify-center gap-1 ">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="image"
                                        accept="image/*"
                                        multiple // allows selecting multiple files
                                        onChange={handleImageChange}
                                    />
                                    <img src={imagepng} alt="" className="w-10 h-10"/>
                                    <h4 className="font-semibold">Click to upload image</h4>
                                    <h4 className="text-sm">PNG JPG upto 5MB</h4>
                            </div>
                    </label>
                     {errors.image_files && <p className="text-red-500">{errors.image_files.message}</p>}
                    {images?.length > 0 && (
                        <div className="mt-4 flex justify-center gap-10 flex-wrap">
                           {images?.length > 0 && (
                            <div className="mt-4 flex gap-4 flex-wrap">
                                {selectedImages.map((file, i) => (
                                    <div key={i} className="relative w-20 h-20">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = selectedImages.filter((_, index) => index !== i);
                                                setSelectedImages(updated);
                                                setValue("image_files", updated);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {/* Placeholder slot to add more images (only if less than 4) */}
                                {selectedImages.length < 4 && (
                                    <label htmlFor="image" className="cursor-pointer">
                                        <div className="w-20 h-20 border-2 border-dashed border-[#9ca3af] rounded flex flex-col items-center justify-center text-[#9ca3af] hover:border-white hover:text-white transition">
                                            <span className="text-2xl leading-none">+</span>
                                            <span className="text-xs mt-1">Add</span>
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        className="mt-6 bg-[#9ca3af] text-black px-4 py-2 rounded w-full"
                    >
                       Cancel
                    </button>

                    <button
                        type="submit"
                        className="mt-6 bg-blue-800 text-white px-4 py-2 rounded w-full bg-[#111827]"
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