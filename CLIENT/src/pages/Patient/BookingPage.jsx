import { useState } from "react";
import Navbar from "../../components/patientDashboard/Navbar";
import DateTimeSelector from "../../components/bookingPage/DateTimeSelector";
import CenterCard from "../../components/bookingPage/CenterCard";
import FiltersSidebar from "../../components/bookingPage/FiltersSidebar";

// Dummy centers data (replace with API later)
const centers = [
  {
    id: 1,
    name: "Apollo Dialysis Center",
    distance: 2.3,
    price: 1500,
    availableDates: ["2026-01-22", "2026-01-23"],
  },
  {
    id: 2,
    name: "Max Dialysis Care",
    distance: 5.1,
    price: 1200,
    availableDates: ["2026-01-22"],
  },
  {
    id: 3,
    name: "Fortis Dialysis Unit",
    distance: 8.4,
    price: 1800,
    availableDates: ["2026-01-24"],
  },
];

export default function BookingPage() {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    distance: 10,
    price: 5000,
  });

  const filteredCenters = centers
    .filter(
      (c) =>
        !filters.date || c.availableDates.includes(filters.date)
    )
    .filter((c) => c.distance <= filters.distance)
    .filter((c) => c.price <= filters.price);

  return (
    <>
      <Navbar />

      <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-5">
        <FiltersSidebar onChange={setFilters} />

        {/* MAIN CONTENT */}
        <div className="">
          {/* LEFT: Centers + DateTime */}
          <div className="">
            {/* Centers */}
            <section>

              <div className="space-y-4">
                {filteredCenters.length ? (
                  filteredCenters.map((center) => (
                    <CenterCard
                      key={center.id}
                      active={selectedCenter?.id === center.id}
                      onClick={() => setSelectedCenter(center)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No centers match your filters.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: Summary */}
        </div>
      </div>
    </>
  );
}
