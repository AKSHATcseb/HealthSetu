const TopBar = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-slate-500 text-sm">
          Overview of hospital resources and real-time machine status.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-green-600 bg-green-50 px-4 py-1 rounded-full text-sm">
          ● System Online
        </span>
        <div className="w-9 h-9 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};

export default TopBar;
