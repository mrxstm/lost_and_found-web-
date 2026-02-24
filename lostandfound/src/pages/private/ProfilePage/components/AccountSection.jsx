import remove from "../../../../assets/images/remove.png"
import { useAuth } from "../../../../context/AuthContext";




function AccountSection() {

    const {logout} = useAuth();

    return (
        <div className="bg-[#1F2937] h-[350px] mt-20 w-full rounded-3xl p-10"> 
            <h1 className="text-2xl text-white font-semibold">Account</h1>
            <div className="flex flex-col gap-6 w-full mt-8">
                <button className="w-full bg-[#111827] text-white h-14 rounded-xl"
                    onClick={logout}
                >Sign out</button>
                <button className="w-full flex items-center justify-center gap-2 text-[#ef4444] h-14 rounded-xl border border-[#ef4444]">
                    <img src={remove} alt="" className="size-6"/>
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default AccountSection;