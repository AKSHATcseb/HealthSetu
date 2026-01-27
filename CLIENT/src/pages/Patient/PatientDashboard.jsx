import React, { useEffect, useState } from "react";
import Navbar from "../../components/patientDashboard/Navbar";
import HeroSearch from "../../components/patientDashboard/HeroSearch";
import Filters from "../../components/patientDashboard/Filters";
import RecommendationCard from "../../components/patientDashboard/RecommendationCard";
import RecentSearches from "../../components/patientDashboard/RecentSearches";
import LocationCard from "../../components/patientDashboard/LocationCard";
import HealthTip from "../../components/patientDashboard/HealthTip";
import { getMe } from "../../services/userApi";


export default function PatientDashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await getMe();
          setUser(res.data);
        } catch (err) {
          console.error("Profile fetch error:", err);
          // Check if the error indicates an authentication issue
          if (err.message === "Not logged in" || err.response?.status === 401) {
            navigate('/login'); // Redirect to login page
          }
          // Handle other errors as needed
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);

  return (
    <>
        <Navbar user={user} />
      <div className="px-10 bg-teal-50">
        <HeroSearch />

        <div className="grid md:grid-cols-3 gap-8 px-8 py-10">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-bold text-lg">Top Recommendation</h2>
            <RecommendationCard />
          </div>

          <div className="space-y-6 mt-14">
            {/* <LocationCard /> */}
            {/* <RecentSearches /> */}
            <HealthTip />
          </div>
        </div>
      </div>
    </>
  );
}

