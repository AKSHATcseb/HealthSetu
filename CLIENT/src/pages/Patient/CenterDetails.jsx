import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ClinicHeader from "../../components/centerDetails/ClinicHeader";
import ClinicStats from "../../components/centerDetails/ClinicStats";
import SidebarInfo from "../../components/centerDetails/SidebarInfo";

export default function HospitalDetails() {

  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/hospitals/${id}`
        );

        setHospital(res.data);
      } catch (err) {

        // 👇 If backend sent 404
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          console.error("Error fetching hospital:", err);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading hospital details...
      </div>
    );
  }

  // ❌ Hospital not found
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Hospital Not Found
        </h2>
        <p className="text-gray-600">
          No hospital exists with this ID.
        </p>
      </div>
    );
  }

  // ⚠️ Safety check
  if (!hospital) {
    return (
      <div className="text-center py-20 text-gray-600">
        Something went wrong. Please try again.
      </div>
    );
  }

  // ✅ Normal UI
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

      {/* MAIN */}
      <div className="lg:col-span-2">
        <ClinicHeader hospital={hospital} />
        <ClinicStats hospital={hospital} />
      </div>

      {/* SIDEBAR */}
      <SidebarInfo hospital={hospital} />

    </div>
  );
}
