function StatCard({ value, label }) {
  return (
    <div className="rounded-xl p-6 w-52 text-center bg-[#374151]">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
export default StatCard;