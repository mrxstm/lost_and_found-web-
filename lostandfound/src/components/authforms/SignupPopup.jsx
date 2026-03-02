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

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });

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
            toast.success("Registration successful!");
            close();
        } catch (err) {
            console.error("API error : ", err);
        }
    };

    return (
        <div className="bg-[#1f2937] p-3 w-full flex flex-col">

            <button onClick={close} className='w-2 sm:w-3 flex self-end'>
                <img src={closecross} alt="" />
            </button>
            <h1 className='text-white text-sm sm:text-lg font-bold'>Create Account</h1>

            <form onSubmit={handleSubmit(onSubmit, (errors) => { console.log(errors); })}>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="fullname" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Full Name</label>
                    <InputField
                        type="text"
                        leading_icon={people}
                        placeholder="Enter your full name"
                        width="full"
                        {...register("fullname")}
                    />
                    {errors.fullname && <p className="text-red-500 text-[9px]">{errors.fullname.message}</p>}
                </div>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="username" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Username</label>
                    <InputField
                        type="text"
                        leading_icon={people}
                        placeholder="Choose a username"
                        width="full"
                        {...register("username")}
                    />
                    {errors.username && <p className="text-red-500 text-[9px]">{errors.username.message}</p>}
                </div>

                <div className='flex gap-3 sm:gap-6 mt-2 sm:mt-3'>
                    <div className='w-full'>
                        <label htmlFor="email" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Email</label>
                        <InputField
                            type="email"
                            leading_icon={email}
                            placeholder="Email"
                            width="full"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-[9px]">{errors.email.message}</p>}
                    </div>
                    <div className='w-full'>
                        <label htmlFor="phone_no" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Phone</label>
                        <InputField
                            type="text"
                            leading_icon={telephone}
                            placeholder="Phone"
                            width="full"
                            {...register("phone_no")}
                        />
                        {errors.phone_no && <p className="text-red-500 text-[9px]">{errors.phone_no.message}</p>}
                    </div>
                </div>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="password" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Password</label>
                    <div className="relative">
                        <InputField
                            type={showPassword ? "text" : "password"}
                            leading_icon={lock}
                            placeholder="Create a Password"
                            width="full"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                        >
                            {showPassword ? <EyeOff size={11} /> : <Eye size={11} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[9px]">{errors.password.message}</p>}
                </div>

                <div className='mt-2 sm:mt-3'>
                    <div className='flex gap-3 sm:gap-6 items-center'>
                        <label htmlFor="Gender" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Gender</label>
                        <label className="flex items-center gap-1 text-white cursor-pointer text-[9px] sm:text-[10px]">
                            <input type="radio" value="male" {...register("gender")} className="accent-blue-500" />
                            Male
                        </label>
                        <label className="flex items-center gap-1 text-white cursor-pointer text-[9px] sm:text-[10px]">
                            <input type="radio" value="female" {...register("gender")} className="accent-blue-500" />
                            Female
                        </label>
                        <label className="flex items-center gap-1 text-white cursor-pointer text-[9px] sm:text-[10px]">
                            <input type="radio" value="other" {...register("gender")} className="accent-blue-500" />
                            Other
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-[9px]">{errors.gender.message}</p>}
                </div>

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="college" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>College</label>
                    <select
                        id="college"
                        className='bg-[#111827] border border-[#9ca3af] w-full h-6 sm:h-8 rounded-lg mt-1 text-white px-2 text-[9px] sm:text-[10px]'
                        {...register("college")}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            {colleges.length === 0 ? "Loading colleges..." : "Select a college"}
                        </option>
                        {colleges.map(col => (
                            <option key={col.id} value={col.id}>
                                {col.name}
                            </option>
                        ))}
                    </select>
                    {errors.college && <p className="text-red-500 text-[9px]">{errors.college.message}</p>}
                </div>

                {error && <p className="text-red-500 text-[9px]">{error}</p>}

                <button type='submit' className='bg-[#5DCEA6] w-full h-6 sm:h-8 rounded-lg mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium'>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className='flex gap-1 text-[#9ca3af] text-[9px] sm:text-[10px] self-center mt-2 sm:mt-3'>
                    Already have an account?{' '}
                    <span className='text-[#5DCEA6] cursor-pointer' onClick={openLogin}>Sign in</span>
                </p>
            </form>
        </div>
    );
}

export default SignupPopup;