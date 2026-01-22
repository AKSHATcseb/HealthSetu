const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 bg-gray-100 p-6 flex-col justify-between ">
      <div>
        <h1 className="text-xl font-bold text-teal-600 mb-8">
          HealthSetu
        </h1>

        <nav className="space-y-4 text-slate-600">
          <p className="font-medium text-teal-600 bg-teal-50 px-4 py-2 rounded-lg">
            Dashboard
          </p>
          <p className="px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            Availability
          </p>
          <p className="px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            Pricing
          </p>
          <p className="px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
            Bookings
          </p>
        </nav>
      </div>

      <button className="text-red-500 text-sm">Logout</button>
    </aside>
  );
};

export default Sidebar;
