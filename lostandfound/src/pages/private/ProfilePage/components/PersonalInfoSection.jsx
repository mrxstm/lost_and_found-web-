import { useState, useEffect } from "react";
import InfoField from "./InfoField";
import edit from "../../../../assets/images/edit-text.png";
import useApi from "../../../../hooks/useAPI.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from '../../../../schema/editprofile.schema.js';

function PersonalInfoSection({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const { callApi } = useApi();
    const [draft, setDraft] = useState({ ...user });

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: { ...draft },
    });

    useEffect(() => {
        for (const key in draft) {
            setValue(key, draft[key]);
        }
    }, [draft, setValue]);

    const toggleEdit = () => {
        if (isEditing) {
            setDraft({ ...user });
            reset({ ...user });
        }
        setIsEditing((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDraft({ ...draft, [name]: value });
        setValue(name, value);
    };

    const handleSave = handleSubmit(async (data) => {
        try {
            const res = await callApi("PUT", "/user/edit-profile", { data });
            setUser(res.data.user);
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.message || "Failed to update profile");
        }
    });

    return (
        <div className="bg-[#1F2937] mt-6 sm:mt-10 w-full rounded-2xl p-3 sm:p-6 sm:w-[560px] lg:w-full">
            <h1 className="text-sm sm:text-lg text-white font-semibold">Personal Information</h1>

            <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 w-full">
                {/* Row 1 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
                    <div className="w-full">
                        <InfoField
                            label="Full name" value={draft.fullname}
                            htmlfor="fullname" isEditing={isEditing}
                            name="fullname" onChange={handleChange}
                        />
                        {errors.fullname && <p className="text-red-500 text-[10px]">{errors.fullname.message}</p>}
                    </div>
                    <div className="w-full">
                        <InfoField
                            label="Email" value={draft.email}
                            htmlfor="email" isEditing={isEditing}
                            name="email" onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
                    <div className="w-full">
                        <InfoField
                            label="Phone Number" value={draft.phone_no}
                            htmlfor="phone_no" isEditing={isEditing}
                            name="phone_no" onChange={handleChange}
                        />
                        {errors.phone_no && <p className="text-red-500 text-[10px]">{errors.phone_no.message}</p>}
                    </div>
                    <div className="w-full">
                        <InfoField
                            label="Gender" value={draft.gender}
                            htmlfor="gender" isEditing={isEditing}
                            name="gender" onChange={handleChange}
                            type="select" options={["male", "female", "other"]}
                        />
                        {errors.gender && <p className="text-red-500 text-[10px]">{errors.gender.message}</p>}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleEdit}
                    className="bg-black text-white flex gap-1 h-5 sm:h-7 w-16 sm:w-24 items-center justify-center rounded-xl mt-4 sm:mt-6 text-[10px] sm:text-xs"
                >
                    <img src={edit} alt="" className="size-3 sm:size-4 object-cover" />
                    {isEditing ? "Cancel" : "Edit"}
                </button>

                {isEditing && (
                    <button
                        className="bg-green-500 text-black flex justify-center h-5 sm:h-7 w-16 sm:w-24 items-center rounded-xl mt-4 sm:mt-6 text-[10px] sm:text-xs"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}

export default PersonalInfoSection;