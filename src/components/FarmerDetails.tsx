
import { useParams } from "react-router-dom";
import { farmers } from "../data/farmers";
import { useState } from "react";

const FarmerDetails = () => {
  const { id } = useParams();
  const farmer = farmers.find((f) => f.id === parseInt(id || ""));

  const [activeTab, setActiveTab] = useState("Profile");

  if (!farmer) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Farmer not found.
      </div>
    );
  }

  const tabs = ["Profile", "KYC", "Farm Info", "Land Info", "Score Card", "Credit Report"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="space-y-2">
            <div><strong>Name:</strong> {farmer.name}</div>
            <div><strong>Gender:</strong> {farmer.gender}</div>
            <div><strong>Phone:</strong> {farmer.phone}</div>
            <div><strong>City:</strong> {farmer.city || "N/A"}</div>
            <div><strong>Created On:</strong> {farmer.createdOn}</div>
          </div>
        );
      case "KYC":
        return (
          <div className="text-gray-700">
            KYC Documents Placeholder (e.g., Aadhaar, PAN)
          </div>
        );
      case "Farm Info":
        return (
          <div className="text-gray-700">
            Farm Info Placeholder (e.g., Crops, Equipment)
          </div>
        );
      case "Land Info":
        return (
          <div className="text-gray-700">
            Land Info Placeholder (e.g., Area, Location)
          </div>
        );
      case "Score Card":
        return (
          <div className="text-gray-700">
            Score Card Placeholder (e.g., Risk Score, Rating)
          </div>
        );
      case "Credit Report":
        return (
          <div className="text-gray-700">
            Credit Report Placeholder (e.g., History, Defaults)
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        👨‍🌾 Farmer Details - {farmer.name}
      </h1>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t-md border-b-2 transition ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FarmerDetails;
