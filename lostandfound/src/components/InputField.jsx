function InputField({type, leading_icon, placeholder, width, ...props}) {

    const widthClasses = {
        10: "w-8",
        26: "w-17",
        full: "w-full"
  };
    return(
        <div className={`bg-[#111827] border border-[#9ca3af] ${widthClasses[width]} h-12 flex items-center gap-2 rounded-2xl mt-2`}>
            <img src={leading_icon} alt="" className="h-6 w-6 ml-4"/>
            <input 
                type={type} 
                className="bg-[#111827] w-full outline-none border-none text-white" 
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}

export default InputField;