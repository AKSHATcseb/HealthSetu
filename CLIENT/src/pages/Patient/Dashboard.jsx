import React from "react";
import Navbar from "../../components/patientDashboard/Navbar";
import HeroSearch from "../../components/patientDashboard/HeroSearch";
import Filters from "../../components/patientDashboard/Filters";
import RecommendationCard from "../../components/patientDashboard/RecommendationCard";
import RecentSearches from "../../components/patientDashboard/RecentSearches";
import LocationCard from "../../components/patientDashboard/LocationCard";
import HealthTip from "../../components/patientDashboard/HealthTip";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <HeroSearch />
      <Filters />

      <div className="grid md:grid-cols-3 gap-8 px-8 py-10">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-bold text-lg">Top AI Recommendation</h2>
          <RecommendationCard />
        </div>

        <div className="space-y-6">
          <LocationCard />
          <RecentSearches />
          <HealthTip />
        </div>
      </div>
    </>
  );
}

