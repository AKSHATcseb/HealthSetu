import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const { pid } = useParams();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Dashboard", path: `/patient/dashboard` },
    { name: "Appointments", path: `/patient/myappointments` },
    { name: "Booking", path: `/patient/bookappointment` },
    { name: "Profile", path: `/patient/profile` },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 👇 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex items-center justify-between font-Outfit">

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/src/assets/images/logo.jpg"
          alt="HealthSetu"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-2xl font-bold text-teal-700">
          HealthSetu
        </span>
      </div>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-10 text-slate-600 font-medium">

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative transition ${isActive
                ? "text-teal-700 font-semibold"
                : "hover:text-teal-600"
              }`
            }
          >
            {item.name}

            {/* Active underline */}
            <span
              className={`absolute -bottom-2 left-0 w-full h-[2px] bg-teal-600 rounded-full transition ${window.location.pathname === item.path
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            />
          </NavLink>
        ))}

      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center gap-4" ref={dropdownRef}>

        {/* PROFILE */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-2xl border border-slate-200 hover:border-teal-500 transition"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-r from-teal-600 to-emerald-500 text-white flex items-center justify-center font-semibold text-lg">
            {user?.name?.charAt(0)}
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-slate-700 font-medium">
              {user?.name}
            </span>
          </div>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

            {/* HEADER */}
            <div className="bg-linear-to-r from-teal-600 to-emerald-500 p-5 text-white">
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                  {user?.name?.charAt(0)}
                </div>

                <div className="truncate">
                  <p className="font-semibold text-lg leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-sm opacity-80 truncate">
                    {user?.email}
                  </p>
                </div>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="p-2">

              <button
                onClick={() => {
                  localStorage.clear();     // ✅ clears token + saved data
                  navigate("/");      // ✅ redirect
                }}
                className="w-full px-4 py-3 rounded-xl text-red-600 font-medium
                         hover:bg-red-50 transition flex items-center justify-center"
              >
                Log out
              </button>

            </div>

          </div>
        )}

      </div>

    </nav>
  );

}
