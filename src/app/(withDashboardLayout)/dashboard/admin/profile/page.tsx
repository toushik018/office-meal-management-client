"use client";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import React, { useState } from "react";
import UpdateFormModal from "./components/updateFormMadal";
import Image from "next/image";
import { Card, CardContent } from "@/components/UI/card";
import { Separator } from "@/components/UI/separator";
import { Button } from "@/components/ui/button";


const Profile = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border border-dashed border-gray-800 animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden rounded-lg border">
      <div className="relative h-40 bg-gradient-to-r from-[#9b59b6] to-[#8e44ad]">
        <Image
          src="https://picsum.photos/600/300"
          alt="Header Image"
          height={400}
          width={400}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="text-center p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{data?.data.name}</h3>
          <p className="text-muted-foreground">{data?.data.role}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MailIcon className="w-4 h-4" />
            <span>{data?.data.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {data?.data.status === "BANNED" ? (
              <CircleCheckIcon className="w-4 h-4 text-red-500" />
            ) : (
              <CircleCheckIcon className="w-4 h-4 text-green-500" />
            )}
            <span>{data?.data.status}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>
              Joined {new Date(data?.data.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>
              Last Updated {new Date(data?.data.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" className="px-4 py-2" onClick={handleOpen}>
            <MailIcon className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>
          <Button variant="ghost" className="px-4 py-2">
            <LinkedinIcon className="w-5 h-5 mr-2" />
            LinkedIn
          </Button>
        </div>
      </CardContent>
      <UpdateFormModal
        open={open}
        handleClose={handleClose}
        userData={data?.data}
      />
    </Card>
  );
};

export default Profile;

function CalendarDaysIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function CircleCheckIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LinkedinIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
