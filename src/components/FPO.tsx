

import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Fpo = () => {
  const [fpos, setFpos] = useState([{
    "id": "string",
    "fpo_id": "string",
    "constitution": "string",
    "entity_name": "string",
    "no_of_farmers": 0,
    "address": "string",
    "state": "string",
    "district": "string",
    "area_of_operation": 0,
    "establishment_year": "string",
    "major_crop_produced": [
      "string"
    ],
    "previous_year_turnover": 0,
    "contact_person_name": "string",
    "contact_person_phone": "+01233037605",
    "pan_no": "string",
    "is_pan_copy_collected": true,
    "pan_image": "string",
    "is_incorporation_doc_collected": true,
    "incorporation_doc_img": "string",
    "is_registration_no_collected": true,
    "registration_no": "string",
    "registration_no_img": "string",
    "is_director_shareholder_list_collected": true,
    "director_shareholder_list_image": "string",
    "active": true,
    "created_at": "string",
    "updated_at": "string"
  }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFpos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/fpos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("keycloak-token")}`,
          },
        });
        setFpos(response.data);
      } catch (error) {
        console.error("Error fetching FPOs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFpos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📋 FPO List</h1>

      {loading ? (
        <div className="text-gray-500">Loading FPOs...</div>
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
              {fpos.map((fpo) => (
                <tr key={fpo.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{fpo.entity_name}</td>
                  <td className="px-4 py-2">{fpo.no_of_farmers}</td>
                  <td className="px-4 py-2">{fpo.state}</td>
                  <td className="px-4 py-2">{fpo.district}</td>
                  <td className="px-4 py-2">{fpo.contact_person_phone}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/fpo/${fpo.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
              {fpos.length === 0 && (
                <tr>
                  <td  className="px-4 py-4 text-center text-gray-500">
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
