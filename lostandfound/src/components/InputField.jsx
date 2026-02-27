function InputField({ type, leading_icon, placeholder, width, ...props }) {

    const widthClasses = {
        10: "w-8",
        26: "w-17",
        full: "w-full"
    };

    return (
        <div className={`bg-[#111827] border border-[#9ca3af] ${widthClasses[width]} h-6 sm:h-7 flex items-center gap-1 rounded-md mt-1`}>
            <img src={leading_icon} alt="" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 ml-2" />
            <input
                type={type}
                className="bg-[#111827] w-full outline-none border-none bg-transparent text-white text-[9px] sm:text-[10px]"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}

export default InputField;