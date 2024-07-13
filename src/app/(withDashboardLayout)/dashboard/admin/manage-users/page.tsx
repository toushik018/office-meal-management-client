"use client";
import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";
import { Input } from "@/components/UI/input";

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
}

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  const [roleMap, setRoleMap] = useState<{ [key: string]: UserRole }>({});
  const [statusMap, setStatusMap] = useState<{ [key: string]: UserStatus }>({});

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const query: Record<string, any> = {
    page,
    limit: pageSize,
  };

  if (debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, error } = useGetAllUsersQuery(query);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setRoleMap((prev) => ({ ...prev, [userId]: newRole }));
    try {
      await updateUserRole({ userId, newRole }).unwrap();
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleStatusChange = async (userId: string, status: UserStatus) => {
    setStatusMap((prev) => ({ ...prev, [userId]: status }));
    try {
      await updateUserStatus({ userId, status }).unwrap();
      toast.success("User status updated successfully");
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("Failed to update user status");
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser({ userId }).unwrap();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Error loading users</div>;
  }

  const users = data?.users || [];
  const totalUsers = data?.meta.total || 0;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-10 w-full md:w-2/5">
        <h1 className="text-2xl font-bold whitespace-nowrap">Manage Users</h1>
        <Input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered"
          placeholder="Search Users"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={roleMap[user.id] || user.role}
                    onValueChange={(value) =>
                      handleRoleChange(user.id, value as UserRole)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={statusMap[user.id] || user.status}
                    onValueChange={(value) =>
                      handleStatusChange(user.id, value as UserStatus)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={UserStatus.ACTIVE}>
                          Active
                        </SelectItem>
                        <SelectItem value={UserStatus.BANNED}>
                          Banned
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Users: {totalUsers}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page === 1 ? "#" : `#${page - 1}`}
                onClick={() => page !== 1 && handlePageChange(page - 1)}
                aria-disabled={page === 1} // Use aria-disabled to indicate disabled state
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={page === totalPages ? "#" : `#${page + 1}`}
                onClick={() =>
                  page !== totalPages && handlePageChange(page + 1)
                }
                aria-disabled={page === totalPages} // Use aria-disabled to indicate disabled state
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ManageUsers;
