import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Agent = () => {
  const [agents, setAgents] = useState([
    {
      "id": "FARMER001",
      "agent_id": "AGENT001",
      "first_name": "John",
      "middle_name": "Doe",
      "last_name": "Smith",
      "registered_phone": "9876543210",
      "profession": "Farmer",
      "qualification": "B.Sc Agriculture",
      "address": "123 Farm Lane, Village Green, UP",
      "pan": "ABCDE1234F",
      "poa_image": "https://example.com/poa/FARMER001.jpg",
      "bank_account_no": "1234567890123456",
      "bank_name": "State Bank of India",
      "ifsc_code": "SBIN0001234",
      "alternate_phone": "9876543220",
      "fpo_reference_no": "FPO001",
      "is_mapped": false,
      "active": true,
      "created_at": "2025-04-01T12:00:00Z",
      "updated_at": "2025-04-01T12:00:00Z"
    },
    {
      "id": "FARMER002",
      "agent_id": "AGENT002",
      "first_name": "Alice",
      "middle_name": "Mary",
      "last_name": "Johnson",
      "registered_phone": "9876543211",
      "profession": "Farmer",
      "qualification": "M.Sc Agriculture",
      "address": "456 Rural Road, Greenfield, Haryana",
      "pan": "XYZAB1234G",
      "poa_image": "https://example.com/poa/FARMER002.jpg",
      "bank_account_no": "6543210987654321",
      "bank_name": "HDFC Bank",
      "ifsc_code": "HDFC0001234",
      "alternate_phone": "9876543221",
      "fpo_reference_no": "FPO002",
      "is_mapped": true,
      "active": true,
      "created_at": "2025-04-02T12:00:00Z",
      "updated_at": "2025-04-02T12:00:00Z"
    },
    {
      "id": "FARMER003",
      "agent_id": "AGENT003",
      "first_name": "David",
      "middle_name": "Lee",
      "last_name": "Brown",
      "registered_phone": "9876543212",
      "profession": "Farmer",
      "qualification": "Diploma in Horticulture",
      "address": "789 Orchard Blvd, Sunnyvale, Punjab",
      "pan": "LMNOP5678P",
      "poa_image": "https://example.com/poa/FARMER003.jpg",
      "bank_account_no": "7890123456789012",
      "bank_name": "Punjab National Bank",
      "ifsc_code": "PNB0001234",
      "alternate_phone": "9876543222",
      "fpo_reference_no": "FPO003",
      "is_mapped": false,
      "active": true,
      "created_at": "2025-04-03T12:00:00Z",
      "updated_at": "2025-04-03T12:00:00Z"
    }
  ]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/agents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("keycloak-token")}`,
          },
        });
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🧑‍💼 Agent List</h1>

      {loading ? (
        <div className="text-gray-500">Loading agents...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Phone</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Profession</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Qualification</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Bank</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">FPO Ref</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{`${agent.first_name} ${agent.middle_name} ${agent.last_name}`}</td>
                  <td className="px-4 py-2">{agent.registered_phone}</td>
                  <td className="px-4 py-2">{agent.profession}</td>
                  <td className="px-4 py-2">{agent.qualification}</td>
                  <td className="px-4 py-2">{agent.bank_name}</td>
                  <td className="px-4 py-2">{agent.fpo_reference_no}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/agent/${agent.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    No agents found.
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

export default Agent;
