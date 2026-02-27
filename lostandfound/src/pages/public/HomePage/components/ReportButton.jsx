
function ReportButton({ icon, label, color, labelcolor }) {
    return (
        <button
            className="w-36 sm:w-30 h-10 sm:h-10 flex rounded-[40px] items-center justify-center gap-2 hover:scale-105 transition-all duration-300 text-xs sm:text-[14px]"
            style={{ background: color }}
        >
            <img src={icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <p style={{ color: labelcolor }}>{label}</p>
        </button>
    );
}

export default ReportButton;