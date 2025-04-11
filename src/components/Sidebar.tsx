import { useState } from "react";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { RiBankFill,RiDashboardLine } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { TbUserSquareRounded, TbCashBanknote } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden p-4 bg-gray-800">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
        >
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block bg-gray-900  text-amber-50 w-60 p-4 h-screen space-y-4 fixed lg:static z-50 overflow-y-auto `}
      > 
        <div className="font-bold text-lg mb-4 cursor-pointer"><a href="/"><img src="/logo.png" alt=""  /></a></div>

        <div className="font-semibold cursor-pointer flex items-center gap-2 py-10"><RiDashboardLine  /><Link to='/dashboard'>Dashboard</Link></div>

        <div>
          <div className="font-bold mb-2 ">Users</div>
          <div className="space-y-10 pl-4">
            <div className="flex items-center gap-2 cursor-pointer mt-10"><FaUsers /> <Link to='/staff'>Staffs </Link></div>
            <div className="flex items-center gap-2 cursor-pointer"><FaUsers /> <Link to='/farmers'> Farmers</Link></div>
            <div className="flex items-center gap-2 cursor-pointer"><ImUsers /> <Link to='/fpo'> FPO</Link></div>
            <div className="flex items-center gap-2 cursor-pointer"><FaUserSecret /> <Link to='/agent'>Agent</Link></div>
            <div className="flex items-center gap-2 cursor-pointer"><RiBankFill />  <Link to='/bank-agent'>Bank Agent</Link></div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2 py-8">Loan Management</div>
          <div className="space-y-10 pl-4">
            <div className="flex items-center gap-2 cursor-pointer"><TbUserSquareRounded /> Borrower</div>
            <div className="flex items-center gap-2 cursor-pointer"><TbCashBanknote /> Loan</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
