function StatCard({ value, label }) {
  return (
    <div className="rounded-xl p-3 sm:p-4 w-[200px] text-center bg-[#374151]">
      <div className="text-lg sm:text-xl font-bold text-white mb-1">{value}</div>
      <div className="text-[10px] sm:text-xs text-gray-400">{label}</div>
    </div>
  );
}

export default StatCard;