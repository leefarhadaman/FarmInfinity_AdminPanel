import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Agent = () => {
  const [agents, setAgents] = useState([{
    "id": "string",
    "agent_id": "string",
    "first_name": "string",
    "middle_name": "string",
    "last_name": "string",
    "registered_phone": "string",
    "profession": "string",
    "qualification": "string",
    "address": "string",
    "pan": "string",
    "poa_image": "string",
    "bank_account_no": "string",
    "bank_name": "string",
    "ifsc_code": "string",
    "alternate_phone": "string",
    "fpo_reference_no": "string",
    "is_mapped": false,
    "active": true,
    "created_at": "string",
    "updated_at": "string"
  }]);
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
