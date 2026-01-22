const colorMap = {
  green: "text-green-600",
  blue: "text-blue-600",
  yellow: "text-yellow-500",
};

const StatsCard = ({ title, value, highlight }) => {
  return (
    <div className="bg-teal-600 rounded-xl p-5">
      <p className="text-slate-300 text-sm">{title}</p>
      <h3 className="text-5xl pt-2 text-white font-bold">
        {value}
      </h3>
    </div>
  );
};

export default StatsCard;
