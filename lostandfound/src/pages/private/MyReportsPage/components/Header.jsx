import MyInfoCard from "./MyInfoCard";

function Header() {
    return(      
        
           <div className="bg-[#1F2937] flex flex-col gap-4 h-72 mt-10">
               
                <h1 className='text-2xl font-bold text-white mt-12 ml-12 text-2xl'>My Reports</h1>
                <p className="text-white ml-12 text-sm text-[#9ca3af]">Track and manage all your lost and found item reports</p>

                <div className="w-full h-px bg-gray-600 my-4"></div>
            
                <div className="grid grid-cols-4">
                    <MyInfoCard
                        name="yo"
                    />
                </div>
        </div>
    );
}

export default Header;