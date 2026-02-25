import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import email from '../../assets/images/email.png';
import lock from '../../assets/images/lock.png';
import closecross from '../../assets/images/close.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../../schema/register.schema';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';  

function LoginPopup({ close, openSignup }) {

    const [showPassword, setShowPassword] = useState(false);   

    const navigate = useNavigate();
    const { login } = useAuth();
    const { loading, error, callApi } = useApi();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        try {
            const res = await callApi("POST", "/auth/login", { data });
            login(res.user);
            close();
            navigate(res.user.role === "admin" ? "/admin/dashboard" : "/search");
            toast.success("Login successful");
        } catch (err) {
            console.error("API error:", err);
            toast.error(err?.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="bg-[#1f2937] p-4 w-[100%] flex flex-col">

            <button onClick={close} className='w-4 flex self-end'>
                <img src={closecross} alt="" />
            </button>
            <h1 className='text-white text-2xl font-bold'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

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
                </div>

                <div className='mt-6'>
                    <label htmlFor="password" className='text-[#9ca3af]'>Password</label>

                    {/* Wrapper to position the eye button inside/beside the field */}
                    <div className="relative">
                        <InputField
                            type={showPassword ? "text" : "password"} 
                            leading_icon={lock}
                            placeholder="Password"
                            width="26"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type='submit' className='bg-[#5DCEA6] w-full h-12 rounded-2xl mt-6'>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className='flex items-center justify-between'>
                    <p className='flex gap-2 text-[#9ca3af] text-sm mt-6'>
                        Don't have an account?{' '}
                        <span className='text-[#5DCEA6] cursor-pointer' onClick={openSignup}>Sign up</span>
                    </p>
                    <p className='text-[#9ca3af] mt-6 cursor-pointer hover:text-[#5DCEA6]'>Forgot password?</p>
                </div>
            </form>
        </div>
    );
}

export default LoginPopup;