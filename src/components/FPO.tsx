import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FpoModel } from "../data/FpoModel";

const Fpo = () => {
  const [fpos, setFpos] = useState<FpoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFpos = async () => {
      setError(null);
      setLoading(true);
      try {
        console.log("Fetching FPOs...");  // Debug statement to indicate fetching started
        const response = await axios.get("/api/fpos/");
        const contentType = response.headers["content-type"];
  
        // Debug the content-type to see if it's JSON
        console.log("Content-Type of response:", contentType);
    
        // Check if the response is JSON
        if (contentType && contentType.includes("application/json")) {
          const data = response.data;
          console.log("Data fetched:", data);  // Debug statement to log fetched data
  
          if (Array.isArray(data)) {
            setFpos(data);
          } else {
            console.warn("Unexpected API response format", data);
            setFpos([]);
          }
        } else {
          console.warn("Received non-JSON response", response);
          setError("Unexpected response format from API.");
        }
      } catch (error: any) {
        console.error("Error fetching FPOs:", error.message);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
        console.log("Loading state set to false.");  // Debug statement to track loading state change
      }
    };
  
    fetchFpos();
  }, []);
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📋 FPO List</h1>

      {loading ? (
        <div className="text-gray-500">Loading FPOs...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Entity Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">No. of Farmers</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">State</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">District</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fpos.length > 0 ? (
                fpos.map((fpo) => (
                  <tr key={fpo.id || fpo._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{fpo.entity_name || "N/A"}</td>
                    <td className="px-4 py-2">{fpo.no_of_farmers || "N/A"}</td>
                    <td className="px-4 py-2">{fpo.state || "N/A"}</td>
                    <td className="px-4 py-2">{fpo.district || "N/A"}</td>
                    <td className="px-4 py-2">{fpo.contact_person_phone || "N/A"}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/fpo/${fpo.id || fpo._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No FPOs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fpo;
