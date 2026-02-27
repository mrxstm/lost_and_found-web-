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
            toast.error(err?.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="bg-[#1f2937] p-5 w-full flex flex-col">

            <button onClick={close} className='w-2 sm:w-3 flex self-end'>
                <img src={closecross} alt="" />
            </button>

            <h1 className='text-white text-sm sm:text-lg font-bold'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='mt-2 sm:mt-4'>
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

                <div className='mt-2 sm:mt-3'>
                    <label htmlFor="password" className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Password</label>
                    <div className="relative">
                        <InputField
                            type={showPassword ? "text" : "password"}
                            leading_icon={lock}
                            placeholder="Password"
                            width="full"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                        >
                            {showPassword ? <Eye size={11} /> : <EyeOff size={11} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[9px]">{errors.password.message}</p>}
                </div>

                {error && <p className="text-red-500 text-[9px]">{error}</p>}

                <button type='submit' className='bg-[#5DCEA6] w-full h-6 sm:h-8 rounded-lg mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium'>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className='flex items-center justify-between mt-2 sm:mt-3'>
                    <p className='flex gap-1 text-[#9ca3af] text-[9px] sm:text-[10px]'>
                        Don't have an account?{' '}
                        <span className='text-[#5DCEA6] cursor-pointer' onClick={openSignup}>Sign up</span>
                    </p>
                    <p className='text-[#9ca3af] text-[9px] sm:text-[10px] cursor-pointer hover:text-[#5DCEA6]'>Forgot password?</p>
                </div>
            </form>
        </div>
    );
}

export default LoginPopup;