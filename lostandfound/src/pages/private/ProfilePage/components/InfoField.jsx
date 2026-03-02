function InfoField({ label, value, htmlfor, isEditing, name, onChange, type = "text", options = [] }) {
    const inputClasses = `h-7 sm:h-10 w-full p-1 sm:p-2 mt-1 rounded-xl text-[10px] sm:text-xs
        ${isEditing ? "text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" : "text-white bg-gray-700"}`;

    return (
        <div className="flex flex-col">
            <label htmlFor={htmlfor} className="text-[10px] sm:text-xs text-white">{label}</label>

            {isEditing ? (
                type === "select" ? (
                    <select
                        id={htmlfor}
                        name={name}
                        value={value || options[0]}
                        onChange={onChange}
                        className={inputClasses}
                    >
                        {options.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={htmlfor}
                        type={type}
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        className={inputClasses}
                    />
                )
            ) : (
                <input
                    id={htmlfor}
                    type="text"
                    value={value || ""}
                    disabled
                    className={inputClasses}
                />
            )}
        </div>
    );
}

export default InfoField;