function Header() {
    return (
        <div className="bg-[#1F2937] flex flex-col gap-4 h-60 mt-10">
            <h1 className='text-lg sm:text-md font-bold text-white mt-12 ml-12'>My Reports</h1>
            <p className="text-[#9ca3af] ml-12 text-[10px] sm:text-xs">Track and manage all your lost and found item reports</p>
            <div className="w-full h-px bg-gray-600 my-4"></div>
        </div>
    );
}

export default Header;