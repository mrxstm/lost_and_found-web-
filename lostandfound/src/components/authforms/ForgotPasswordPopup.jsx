import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from '../../schema/register.schema';
import { useApi } from '../../hooks/useAPI';
import { toast } from 'react-toastify';
import InputField from '../InputField';
import email from '../../assets/images/email.png';
import closecross from '../../assets/images/close.png';

function ForgotPasswordPopup({ close, openLogin }) {

    const { loading, callApi } = useApi();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = async (data) => {
        try {
            await callApi("POST", "/auth/forgot-password", { data });
            toast.success("If this email exists, a reset link has been sent!");
            close();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-[#1f2937] p-5 w-full flex flex-col">
            <button onClick={close} className='w-2 sm:w-3 flex self-end'>
                <img src={closecross} alt="" />
            </button>

            <h1 className='text-white text-sm sm:text-lg font-bold'>Forgot Password</h1>
            <p className='text-[#9ca3af] text-[9px] sm:text-[10px] mt-1'>
                Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-2 sm:mt-4'>
                    <label className='text-[#9ca3af] text-[9px] sm:text-[10px]'>Email</label>
                    <InputField
                        type="email"
                        leading_icon={email}
                        placeholder="Enter your email"
                        width="full"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[9px]">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type='submit'
                    className='bg-[#5DCEA6] w-full h-6 sm:h-8 rounded-lg mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium'
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className='flex items-center justify-center mt-2 sm:mt-3'>
                    <p className='text-[#9ca3af] text-[9px] sm:text-[10px]'>
                        Remember your password?{' '}
                        <span
                            className='text-[#5DCEA6] cursor-pointer'
                            onClick={openLogin}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default ForgotPasswordPopup;