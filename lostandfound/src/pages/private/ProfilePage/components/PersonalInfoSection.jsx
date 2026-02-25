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

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { ...draft },
  });

  useEffect(() => {
    // Sync draft to form values whenever draft changes
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
      const res = await callApi("PUT", "/user/edit-profile", {
        data,
      });

      setUser(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update profile");
    }
  });

  return (
    <div className="bg-[#1F2937] h-[600px] mt-20 w-full rounded-3xl p-10">
      <h1 className="text-2xl text-white font-semibold">Personal Information</h1>

      <div className="flex flex-col gap-6 items-center mt-8 ml-10">
        <div className="flex gap-20">

            <div>       
                <InfoField
                    label="Full name"
                    value={draft.fullname}
                    htmlfor="fullname"
                    isEditing={isEditing}
                    name="fullname"
                    onChange={handleChange}
                />
                {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
            </div>

            <div>
            <InfoField
                label="Email"
                value={draft.email}
                htmlfor="email"
                isEditing={isEditing}
                name="email"
                onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
        </div>

        <div className="flex gap-20">

            <div>
                <InfoField
                    label="Phone Number"
                    value={draft.phone_no}
                    htmlfor="phone_no"
                    isEditing={isEditing}
                    name="phone_no"
                    onChange={handleChange}
                />
                {errors.phone_no && <p className="text-red-500">{errors.phone_no.message}</p>}
            </div>

            <div>
                <InfoField
                    label="Gender"
                    value={draft.gender}
                    htmlfor="gender"
                    isEditing={isEditing}
                    name="gender"
                    onChange={handleChange}
                    type="select"
                    options={["male", "female", "other"]}
                />
                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleEdit}
          className="bg-black text-white flex gap-2 h-8 w-28 items-center p-5 rounded-xl mt-10 ml-14"
        >
          <img src={edit} alt="" className="size-5 object-cover" />
          {isEditing ? "Cancel" : "Edit"}
        </button>

        {isEditing && (
          <button
            className="bg-green-500 text-black flex justify-center h-8 w-28 items-center p-5 rounded-xl mt-10"
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