import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import people from '../../assets/images/people.png';
import email from '../../assets/images/email.png';
import lock from '../../assets/images/lock.png';
import telephone from '../../assets/images/telephone.png';
import closecross from '../../assets/images/close.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '../../schema/register.schema';
import { useApi } from '../../hooks/useAPI';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

function SignupPopup({ close, openLogin }) {

    const [showPassword, setShowPassword] = useState(false);
    const [colleges, setColleges] = useState([]);       

    const { loading, error, callApi } = useApi();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    // fetch colleges
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await callApi("GET", "/colleges", {});
                setColleges(res.data);
                
            } catch (err) {
                console.error("Failed to fetch colleges:", err);
            }
        };
        fetchColleges();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await callApi("POST", "/auth/register", { data });
            console.log("Server response:", response.data);
            toast.success("Registration successful!");
            close();
        } catch (err) {
            console.error("API error : ", err);
        }
    };

    return (
        <div className="bg-[#1f2937] p-4 w-[100%] flex flex-col mt-10">

            <button onClick={close} className='w-4 flex self-end'>
                <img src={closecross} alt="" />
            </button>
            <h1 className='text-white text-2xl font-bold'>Create Account</h1>

            <form onSubmit={handleSubmit(onSubmit, (errors) => { console.log(errors); })}>

                <div className='mt-6'>
                    <label htmlFor="fullname" className='text-[#9ca3af]'>Full Name</label>
                    <InputField
                        type="text"
                        leading_icon={people}
                        placeholder="Enter your full name"
                        width="26"
                        {...register("fullname")}
                    />
                    {errors.fullname && <p style={{ color: "red" }}>{errors.fullname.message}</p>}
                </div>

                <div className='mt-6'>
                    <label htmlFor="username" className='text-[#9ca3af]'>Username</label>
                    <InputField
                        type="text"
                        leading_icon={people}
                        placeholder="Choose a username"
                        width="26"
                        {...register("username")}
                    />
                    {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                </div>

                <div className='flex gap-10 mt-6'>
                    <div className='w-full'>
                        <label htmlFor="email" className='text-[#9ca3af]'>Email</label>
                        <InputField
                            type="email"
                            leading_icon={email}
                            placeholder="Email"
                            width="full"
                            {...register("email")}
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                    </div>

                    <div className='w-full'>
                        <label htmlFor="phone_no" className='text-[#9ca3af]'>Phone</label>
                        <InputField
                            type="text"
                            leading_icon={telephone}
                            placeholder="Phone"
                            width="full"
                            {...register("phone_no")}
                        />
                        {errors.phone_no && <p style={{ color: "red" }}>{errors.phone_no.message}</p>}
                    </div>
                </div>

                <div className='mt-6'>
                    <label htmlFor="password" className='text-[#9ca3af]'>Password</label>
                    <div className="relative">
                        <InputField
                            type={showPassword ? "text" : "password"}
                            leading_icon={lock}
                            placeholder="Create a Password"
                            width="26"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </div>

                <div className='mt-6 gap-6'>
                    <div className='flex gap-6'>
                        <label htmlFor="Gender" className='text-[#9ca3af]'>Gender</label>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input type="radio" value="male" {...register("gender")} className="accent-blue-500" />
                            Male
                        </label>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input type="radio" value="female" {...register("gender")} className="accent-blue-500" />
                            Female
                        </label>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input type="radio" value="other" {...register("gender")} className="accent-blue-500" />
                            Other
                        </label>
                    </div>
                    {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
                </div>

                <div className='mt-6'>
                    <label htmlFor="college" className='text-[#9ca3af]'>College</label>
                    <div>
                        <select
                            id="college"
                            className='bg-[#111827] border border-[#9ca3af] w-full h-12 flex items-center gap-2 rounded-lg mt-2 text-white px-4'
                            {...register("college")}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                {colleges.length === 0 ? "Loading colleges..." : "Select a college"}
                            </option>
                            {/* 👇 dynamic colleges from backend */}
                            {colleges.map(col => (
                                <option key={col.id} value={col.id}>
                                    {col.name}
                                </option>
                            ))}
                        </select>
                        {errors.college && <p style={{ color: "red" }}>{errors.college.message}</p>}
                    </div>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type='submit' className='bg-[#5DCEA6] w-full h-12 rounded-2xl mt-6'>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
                <p className='flex gap-2 text-[#9ca3af] text-sm self-center mt-6'>
                    Already have an account?{' '}
                    <span className='text-[#5DCEA6] cursor-pointer' onClick={openLogin}>Sign in</span>
                </p>
            </form>
        </div>
    );
}

export default SignupPopup;