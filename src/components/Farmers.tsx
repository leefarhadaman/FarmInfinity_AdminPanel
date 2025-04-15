import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { farmers } from "../data/farmers";

const FARMERS_PER_PAGE = 5;

interface DisplayFarmer {
  id: number;
  name: string;
  gender: string;
  phone: string;
  city: string;
  createdOn: string;
  status: string; // For display purposes, this is a string
  approval: string;
  amount: string;
}

const Farmers = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  const [farmerData, setFarmerData] = useState<DisplayFarmer[]>([]); // Use the display interface
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFarmers = async () => {
      if (!initialized || !keycloak.authenticated) {
        console.log("Keycloak not initialized or not authenticated yet");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching farmers...");
        
        // Ensure we have a valid token before making the request
        if (!keycloak.token) {
          console.log("No valid token available");
          setError("Authentication token not available");
          setLoading(false);
          return;
        }

        // Using the proxy URL directly as configured in vite config
        const response = await axios.get("/api/farmers/", {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
          withCredentials: true,
        });

        console.log("API Response:", response);
        
        // Transform the API data to our display format
        let apiFarmers: DisplayFarmer[] = [];
        
        if (response.data?.data) {
          // If API returns data in expected format
          apiFarmers = response.data.data.map((f: farmers) => ({
            id: f.id,
            name: f.name || "—",
            gender: "—",
            phone: f.phone || "—",
            city: f.city || "—",
            createdOn: f.createdOn ? new Date(f.createdOn).toLocaleDateString() : "—",
            status: f.status === 0 ? "Lead" : `Status ${f.status}`,
            approval: "—",
            amount: "—",
          }));
        } else if (Array.isArray(response.data)) {
          // Handle case where API directly returns array
          apiFarmers = response.data.map((f: farmers) => ({
            id: f.id,
            name: f.name || "—",
            gender: "—",
            phone: f.phone || "—",
            city: f.city || "—",
            createdOn: f.createdOn ? new Date(f.createdOn).toLocaleDateString() : "—",
            status: f.status === 0 ? "Lead" : `Status ${f.status}`,
            approval: "—",
            amount: "—",
          }));
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Unexpected data format received from API");
        }

        console.log("Mapped Farmers Data:", apiFarmers);
        setFarmerData(apiFarmers);
        setError("");
      } catch (err: any) {
        console.error("Error fetching farmers:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch farmer data";
        setError(`API Error: ${errorMessage}`);
      } finally {
        setLoading(false);
        console.log("Loading state set to false.");
      }
    };

    // Only fetch data when both conditions are met
    fetchFarmers();
  }, [keycloak, initialized]);

  // Refresh token if it's about to expire
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (initialized && keycloak.authenticated) {
        keycloak.updateToken(70).catch(() => {
          console.error("Failed to refresh token");
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(refreshInterval);
  }, [keycloak, initialized]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    console.log("Search Query:", e.target.value);
  };

  const filteredFarmers = farmerData.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredFarmers.length / FARMERS_PER_PAGE);
  const currentFarmers = filteredFarmers.slice(
    (currentPage - 1) * FARMERS_PER_PAGE,
    currentPage * FARMERS_PER_PAGE
  );

  // Handle authentication status
  if (!initialized) {
    return <div className="p-6 text-center">Initializing authentication...</div>;
  }

  if (!keycloak.authenticated) {
    return (
      <div className="p-6 text-center">
        <p>Not authenticated. Please log in.</p>
        <button 
          onClick={() => keycloak.login()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">👨‍🌾 Farmer List</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          placeholder="🔍 Search farmers"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
          <option>All Statuses</option>
          <option>Lead</option>
        </select>
      </div>

      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City/Town</th>
              <th className="px-4 py-3">Created On</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Approval</th>
              <th className="px-4 py-3">Loan Amt.</th>
              <th className="px-4 py-3 text-center">⋮</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center p-6 text-gray-500">
                  Loading farmers...
                </td>
              </tr>
            ) : currentFarmers.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-6 text-gray-500">
                  No farmers found.
                </td>
              </tr>
            ) : (
              currentFarmers.map((farmer) => (
                <tr
                  key={farmer.id}
                  onClick={() => navigate(`/farmers/${farmer.id}`)}
                  className="hover:bg-blue-50 cursor-pointer border-b"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{farmer.name}</td>
                  <td className="px-4 py-3">{farmer.gender}</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">{farmer.phone}</td>
                  <td className="px-4 py-3">{farmer.city}</td>
                  <td className="px-4 py-3">{farmer.createdOn}</td>
                  <td className="px-4 py-3 text-yellow-600">{farmer.status}</td>
                  <td className="px-4 py-3">{farmer.approval}</td>
                  <td className="px-4 py-3">{farmer.amount}</td>
                  <td className="px-4 py-3 text-center text-xl text-gray-500">⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Farmers;