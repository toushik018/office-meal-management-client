"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/UI/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/UI/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";
import { IItem } from "@/types/items/items";
import {
  useDeleteItemMutation,
  useGetAllItemsQuery,
  useUpdateItemMutation,
} from "@/redux/api/items";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const ManageItems = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [editItem, setEditItem] = useState<Partial<IItem> | null>(null);

  const { data, isLoading, error } = useGetAllItemsQuery({
    page,
    limit: pageSize,
  });
  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const handleDelete = async (itemId: string) => {
    try {
      await deleteItem({ id: itemId }).unwrap();
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleEdit = (item: IItem) => {
    setEditItem(item);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    try {
      await updateItem(editItem).unwrap();
      toast.success("Item updated successfully");
      setEditItem(null);
    } catch (error) {
      console.error("Failed to update item:", error);
      toast.error("Failed to update item");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Error loading items</div>;
  }

  const items: IItem[] = data?.items || [];
  const totalItems: number = data?.meta.total || 0;
  const totalPages: number = Math.ceil(totalItems / pageSize);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Items</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <FaPenToSquare className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Item</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Item Name
                            </label>
                            <Input
                              id="name"
                              type="text"
                              value={editItem?.name || ""}
                              onChange={(e) =>
                                setEditItem({
                                  ...editItem,
                                  name: e.target.value,
                                })
                              }
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="category"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Category
                            </label>
                            <Input
                              id="category"
                              type="text"
                              value={editItem?.category || ""}
                              onChange={(e) =>
                                setEditItem({
                                  ...editItem,
                                  category: e.target.value,
                                })
                              }
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="mr-2">
                              Save changes
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => setEditItem(null)}
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaRegTrashCan className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Items: {totalItems}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
                aria-disabled={page === 1}
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
                href="#"
                onClick={() => handlePageChange(page + 1)}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ManageItems;
