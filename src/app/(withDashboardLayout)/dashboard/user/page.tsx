"use client";

import React, { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useGetOrdersByUserQuery } from "@/redux/api/orderApi";

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersByUserQuery({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = getUserInfo(); // Fetch the logged-in user's info
      setUser(userInfo);
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        User Dashboard
      </h1>
      {user ? (
        <div className="space-y-6 flex gap-10">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg ">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : ordersError ? (
              <p>Error loading orders</p>
            ) : (
              <p>
                <strong>Number of Orders:</strong>{" "}
                {ordersData?.data?.length || 0}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserDashboard;
