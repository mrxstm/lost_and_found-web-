function FilterDropdown({ label, options, value, onChange }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="ml-2 text-white text-[10px] sm:text-[14px]">
                {label}
            </label>
            <select
                id={label}
                onChange={onChange}
                value={value}
                className="mt-2 border w-[140px] sm:w-[180px] lg:w-[260px] h-6 sm:h-8 rounded-lg p-1 sm:p-2 px-3 cursor-pointer border-[#374151] hover:border-[#393328] text-white bg-[#111827] text-[10px] sm:text-[14px]"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterDropdown;