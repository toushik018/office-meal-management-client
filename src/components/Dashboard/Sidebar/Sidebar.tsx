import { useEffect, useState } from "react";
import Link from "next/link";
import { TUserRole } from "@/types";
import { getUserInfo } from "@/services/auth.service";
import { drawerItems } from "@/utils/drawerItems";
import SidebarItem from "./SidebarItem";
import { Box, Stack, Typography } from "@mui/material";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = getUserInfo() as any;
    setUserRole(user?.role);
  }, []);

  return (
    <Box className="w-64 h-full bg-gray-200 text-black">
      <Box className="p-4">
        <Link href="/" className="flex items-center justify-center space-x-2">
          <Typography variant="h6" className="font-bold uppercase">
            Meal Management
          </Typography>
        </Link>
      </Box>
      <Stack className="flex flex-col space-y-2 p-4">
        {drawerItems(userRole as TUserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default SideBar;
