import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center text-center h-[calc(100vh-4rem)]">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        👋 Hello User!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Thank you for coming back. We’re glad to see you again!
      </p>
    </div>
  );
};

export default Dashboard;
