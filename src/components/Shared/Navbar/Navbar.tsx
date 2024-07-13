"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import dynamic from "next/dynamic";

const Navbar = () => {
  const user = getUserInfo();
  const router = useRouter();

  const handleProfileClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      event.preventDefault();
      router.push("/login");
    }
  };

  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <div className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700 cursor-pointer">
          Office Meal Management
        </h1>
        <div className="flex space-x-6 items-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
