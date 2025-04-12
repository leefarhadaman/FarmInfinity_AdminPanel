

import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Fpo = () => {
  const [fpos, setFpos] = useState([
    {
      "id": "FPO001",
      "fpo_id": "FPOID001",
      "constitution": "Cooperative Society",
      "entity_name": "Green Fields Farmers Organization",
      "no_of_farmers": 120,
      "address": "123 Agro Street, Village Green, Uttar Pradesh",
      "state": "Uttar Pradesh",
      "district": "Meerut",
      "area_of_operation": 5000,
      "establishment_year": "2010",
      "major_crop_produced": [
        "Wheat",
        "Rice",
        "Maize"
      ],
      "previous_year_turnover": 1500000,
      "contact_person_name": "Rajesh Kumar",
      "contact_person_phone": "+01233037605",
      "pan_no": "ABCDE1234X",
      "is_pan_copy_collected": true,
      "pan_image": "https://example.com/pan/FPO001.jpg",
      "is_incorporation_doc_collected": true,
      "incorporation_doc_img": "https://example.com/incorporation/FPO001.jpg",
      "is_registration_no_collected": true,
      "registration_no": "FPO001REG",
      "registration_no_img": "https://example.com/registration/FPO001REG.jpg",
      "is_director_shareholder_list_collected": true,
      "director_shareholder_list_image": "https://example.com/directors/FPO001.jpg",
      "active": true,
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-01T12:00:00Z"
    },
    {
      "id": "FPO002",
      "fpo_id": "FPOID002",
      "constitution": "Private Limited Company",
      "entity_name": "Sunny Acres Farmers Association",
      "no_of_farmers": 85,
      "address": "456 Green Lane, Sunnyville, Haryana",
      "state": "Haryana",
      "district": "Rohtak",
      "area_of_operation": 3500,
      "establishment_year": "2015",
      "major_crop_produced": [
        "Cotton",
        "Sugarcane",
        "Groundnut"
      ],
      "previous_year_turnover": 2000000,
      "contact_person_name": "Ravi Mehta",
      "contact_person_phone": "+01233037605",
      "pan_no": "XYZAB5678G",
      "is_pan_copy_collected": true,
      "pan_image": "https://example.com/pan/FPO002.jpg",
      "is_incorporation_doc_collected": true,
      "incorporation_doc_img": "https://example.com/incorporation/FPO002.jpg",
      "is_registration_no_collected": true,
      "registration_no": "FPO002REG",
      "registration_no_img": "https://example.com/registration/FPO002REG.jpg",
      "is_director_shareholder_list_collected": true,
      "director_shareholder_list_image": "https://example.com/directors/FPO002.jpg",
      "active": true,
      "created_at": "2025-02-15T12:00:00Z",
      "updated_at": "2025-02-15T12:00:00Z"
    },
    {
      "id": "FPO003",
      "fpo_id": "FPOID003",
      "constitution": "Producer Company",
      "entity_name": "Farmers United Co-operative",
      "no_of_farmers": 200,
      "address": "789 Agricultural Blvd, Greenfield, Punjab",
      "state": "Punjab",
      "district": "Ludhiana",
      "area_of_operation": 7000,
      "establishment_year": "2018",
      "major_crop_produced": [
        "Rice",
        "Barley",
        "Sunflower"
      ],
      "previous_year_turnover": 5000000,
      "contact_person_name": "Manoj Singh",
      "contact_person_phone": "+01233037605",
      "pan_no": "LMNOP1234P",
      "is_pan_copy_collected": true,
      "pan_image": "https://example.com/pan/FPO003.jpg",
      "is_incorporation_doc_collected": true,
      "incorporation_doc_img": "https://example.com/incorporation/FPO003.jpg",
      "is_registration_no_collected": true,
      "registration_no": "FPO003REG",
      "registration_no_img": "https://example.com/registration/FPO003REG.jpg",
      "is_director_shareholder_list_collected": true,
      "director_shareholder_list_image": "https://example.com/directors/FPO003.jpg",
      "active": true,
      "created_at": "2025-03-10T12:00:00Z",
      "updated_at": "2025-03-10T12:00:00Z"
    }
  ]
  );
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
