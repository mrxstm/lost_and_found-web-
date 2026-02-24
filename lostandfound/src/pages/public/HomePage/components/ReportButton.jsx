

function ReportButton({icon, label, color, labelcolor}) {
    return(
        <button className="w-44 h-12 flex rounded-[40px] items-center justify-center gap-2 hover:scale-105 transition-all duration-300" style={{background : color}}>
            <img src={icon} alt="" className="w-5 h-5" />
            <p style={{color: labelcolor}}>{label}</p>
        </button>
    );
}
export default ReportButton;