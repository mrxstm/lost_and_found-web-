function Footer() {
    return(
        <div className="bg-[#111827] h-[450px] flex items-center justify-center ">
            <div className="bg-[#1F2937] h-[70%] w-full m-60 rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#5DCEA6]">
                <h1 className="text-2xl font-bold text-white">Ready to Get Started?</h1>
                <p className="text-white">Join our community and help reunite lost items with owners</p>
                <button className="text-black bg-[#5DCEA6] rounded-3xl h-10 w-40 text-sm font-semibold hover:scale-105 transition-all duration-300">
                    Create Free Account
                    </button>
            </div>
        </div>
    );
}

export default Footer;