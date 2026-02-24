function InfoField({label, value, htmlfor}) {
    return (
        <div>
            <label htmlFor={htmlfor} className="text-xl text-white">{label}</label> <br />
            <input id={htmlfor} type="text" disabled="true" value={value} className="h-18 w-[600px] p-4 mt-2 rounded-2xl "/>
        </div>
    );
}

export default InfoField;