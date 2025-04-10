// src/pages/Farmers.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Farmers = () => {
  const navigate = useNavigate();

  const farmers = [
    {
      id: 1,
      name: "Kaustav",
      gender: "Male",
      phone: "8399051459",
      city: "",
      createdOn: "11-Nov-2024",
      status: "Lead",
      approval: "None",
      amount: "",
    },
    {
      id: 2,
      name: "Pragyan",
      gender: "Male",
      phone: "7575985255",
      city: "",
      createdOn: "28-Aug-2024",
      status: "Lead",
      approval: "None",
      amount: "",
    },
    {
      id: 3,
      name: "Santanu",
      gender: "Male",
      phone: "8011051894",
      city: "",
      createdOn: "28-Aug-2024",
      status: "Lead",
      approval: "None",
      amount: "",
    },
    {
      id: 4,
      name: "Anant",
      gender: "Male",
      phone: "8822009123",
      city: "Golaghat",
      createdOn: "15-Jul-2024",
      status: "Lead",
      approval: "None",
      amount: "Rs.5,000-Rs.10,000",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">👨‍🌾 Farmer List</h1>

      {/* Filter section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          placeholder="🔍 Search farmers"
          className="w-full md:w-1/2 border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
          <option>All Statuses</option>
          <option>Lead</option>
        </select>
      </div>

      {/* Farmer Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left bg-white">
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
            {farmers.map((farmer) => (
              <tr
                key={farmer.id}
                onClick={() => navigate(`/farmers/${farmer.id}`)}
                className="hover:bg-blue-50 cursor-pointer border-b"
              >
                <td className="px-4 py-3 font-medium text-gray-900">{farmer.name}</td>
                <td className="px-4 py-3">{farmer.gender}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">{farmer.phone}</td>
                <td className="px-4 py-3">{farmer.city || '—'}</td>
                <td className="px-4 py-3">{farmer.createdOn}</td>
                <td className="px-4 py-3 text-yellow-600">{farmer.status}</td>
                <td className="px-4 py-3">{farmer.approval}</td>
                <td className="px-4 py-3">{farmer.amount || '—'}</td>
                <td className="px-4 py-3 text-center text-xl text-gray-500">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;
