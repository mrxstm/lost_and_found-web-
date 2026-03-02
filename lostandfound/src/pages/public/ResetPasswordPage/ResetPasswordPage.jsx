import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from '../../../schema/register.schema';
import { useApi } from '../../../hooks/useAPI';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../../../components/InputField';
import lock from '../../../assets/images/lock.png';
import { Eye, EyeOff } from 'lucide-react';

function ResetPasswordPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { loading, callApi } = useApi();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = async (data) => {
        try {
            if (!token) {
                toast.error("Invalid reset link");
                return;
            }
            await callApi("POST", "/auth/reset-password", { 
                data: { token, password: data.password } 
            });
            toast.success("Password reset successful! Please login.");
            navigate("/");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
            <div className="bg-[#1f2937] p-6 rounded-xl w-full max-w-sm">

                <h1 className='text-white text-lg font-bold mb-1'>Reset Password</h1>
                <p className='text-[#9ca3af] text-[10px] mb-4'>
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-2'>
                        <label className='text-[#9ca3af] text-[9px] sm:text-[10px]'>
                            New Password
                        </label>
                        <div className="relative">
                            <InputField
                                type={showPassword ? "text" : "password"}
                                leading_icon={lock}
                                placeholder="New password"
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
                        {errors.password && (
                            <p className="text-red-500 text-[9px]">{errors.password.message}</p>
                        )}
                    </div>

                    <div className='mt-3'>
                        <label className='text-[#9ca3af] text-[9px] sm:text-[10px]'>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <InputField
                                type={showConfirm ? "text" : "password"}
                                leading_icon={lock}
                                placeholder="Confirm new password"
                                width="full"
                                {...register("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(prev => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                            >
                                {showConfirm ? <Eye size={11} /> : <EyeOff size={11} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-[9px]">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='bg-[#5DCEA6] w-full h-8 rounded-lg mt-4 text-xs font-medium'
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    <p
                        className='text-[#9ca3af] text-[9px] text-center mt-3 cursor-pointer hover:text-[#5DCEA6]'
                        onClick={() => navigate("/")}
                    >
                        Back to home
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;