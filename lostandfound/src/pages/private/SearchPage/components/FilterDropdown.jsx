
function FilterDropdown({label, options, value, onChange}) {
    return(
        <div>
            <label htmlFor={label} className="ml-2 text-white">
                {label} 
            </label> <br />
            <select
             id={label}
             onChange={onChange}
             value={value}
             className="mt-2 border w-[480px] h-10 rounded-lg flex p-2 pr-8 px-4 cursor-pointer border-[#374151] hover:border-[#393328] text-white bg-[#111827]">

                {options.map((option)=> (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
                )};
            </select>
        </div>
    );
}

export default FilterDropdown;