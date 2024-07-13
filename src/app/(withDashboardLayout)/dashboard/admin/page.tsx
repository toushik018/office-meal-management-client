"use client";

import { useGetAdminStatsQuery } from "@/redux/api/userApi";
import React from "react";
import { FaUsersCog } from "react-icons/fa";
import { MdFastfood, MdShoppingCart } from "react-icons/md";

const AdminPage = () => {
  const { data, error, isLoading } = useGetAdminStatsQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading statistics</div>;
  }

  return (
    <div className="container mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-2">
        <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 bg-[#FF9671] text-white flex items-center justify-center rounded-lg shadow-xl shadow-[#FF9671]/50 -mt-10 group-hover:-mt-14 duration-300">
              <FaUsersCog size={40} />
            </div>
            <div className="text-right pt-1 pb-2">
              <span className="text-[#FF9671] font-bold text-4xl drop-shadow-xl count__up">
                {data?.data?.totalUsers || 0}
              </span>
              <h3 className="text-dark tracking-wider drop-shadow-xl">
                Total Users
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 bg-green-700 text-white flex items-center justify-center rounded-lg shadow-xl shadow-green-800/50 -mt-10 group-hover:-mt-14 duration-300">
              <MdFastfood size={40} />
            </div>
            <div className="text-right pt-1 pb-2">
              <span className="text-green-700 text-4xl drop-shadow-xl font-bold count__up">
                {data?.data?.totalMeals || 0}
              </span>
              <h3 className="text-dark tracking-wider drop-shadow-xl">
                Total Meals
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 shadow-4xl shadow-gray/40 rounded-md px-3 group">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-xl shadow-blue-800/50 -mt-10 group-hover:-mt-14 duration-300">
              <MdShoppingCart size={40} />
            </div>
            <div className="text-right pt-1 pb-2">
              <span className="text-blue-700 text-4xl drop-shadow-xl font-bold count__up">
                {data?.data?.totalOrders || 0}
              </span>
              <h3 className="text-dark tracking-wider drop-shadow-xl">
                Total Orders
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
