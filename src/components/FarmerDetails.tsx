import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { farmers } from "../data/farmers";

const FarmerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState<farmers | null>(null); // Define farmer type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const token = localStorage.getItem("keycloak-token");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://dev-api.farmeasytechnologies.com/api/farmers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure the response data matches the Farmer interface
        const farmerData: farmers = response.data;
        setFarmer(farmerData);
      } catch (err) {
        console.error("Error fetching farmer details:", err);
        setError("Failed to fetch farmer details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmerDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading farmer details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold">{error}</div>;
  }

  if (!farmer) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Farmer not found.
      </div>
    );
  }

  const tabs = [
    "Profile",
    "KYC",
    "Farm Info",
    "Land Info",
    "Score Card",
    "Credit Report",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="space-y-2">
            <div><strong>Name:</strong> {farmer.name}</div>
            <div><strong>Gender:</strong> {farmer.gender || "N/A"}</div>
            <div><strong>Phone:</strong> {farmer.phone}</div>
            <div><strong>City:</strong> {farmer.city || "N/A"}</div>
            <div><strong>Created On:</strong> {farmer.createdOn}</div>
            <div><strong>Status:</strong> {farmer.status}</div>
            <div><strong>Approval:</strong> {farmer.approval}</div>
            <div><strong>Amount:</strong> {farmer.amount}</div>
          </div>
        );
      case "KYC":
        return (
          <div className="text-gray-700">
            {/* Dynamic KYC details */}
            KYC Documents Placeholder (e.g., Aadhaar, PAN)
          </div>
        );
      case "Farm Info":
        return (
          <div className="text-gray-700">
            {/* Dynamic Farm Info */}
            Farm Info Placeholder (e.g., Crops, Equipment)
          </div>
        );
      case "Land Info":
        return (
          <div className="text-gray-700">
            {/* Dynamic Land Info */}
            Land Info Placeholder (e.g., Area, Location)
          </div>
        );
      case "Score Card":
        return (
          <div className="text-gray-700">
            {/* Dynamic Score Card */}
            Score Card Placeholder (e.g., Risk Score, Rating)
          </div>
        );
      case "Credit Report":
        return (
          <div className="text-gray-700">
            {/* Dynamic Credit Report */}
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
