"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/UI/dialog";
import Select from "react-select";
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
  useDeleteMealMutation,
  useGetAllMealsQuery,
  useScheduleMealMutation,
  useUpdateMealMutation,
} from "@/redux/api/mealApi";
import { useGetAllItemsQuery } from "@/redux/api/items";
import { IMeal } from "@/types/meal/meal";
import { IItem } from "@/types/items/items";
import CreateMeal from "../create-meal/page";

const dayOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const ManageMeals = () => {
  const [editMeal, setEditMeal] = useState<IMeal | null>(null);
  const [scheduleMeal, setScheduleMeal] = useState<IMeal | null>(null);
  const [mealName, setMealName] = useState<string>("");
  const [mealDate, setMealDate] = useState<string>("");
  const [allowedDays, setAllowedDays] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedItems, setSelectedItems] = useState<
    { value: string; label: string }[]
  >([]);

  const { data: mealsData, isLoading, error } = useGetAllMealsQuery({});
  const { data: itemsData } = useGetAllItemsQuery({});
  const [deleteMeal] = useDeleteMealMutation();
  const [updateMeal] = useUpdateMealMutation();
  const [scheduleMealMutation] = useScheduleMealMutation();

  const handleDelete = async (mealId: string) => {
    try {
      await deleteMeal({ id: mealId }).unwrap();
      toast.success("Meal deleted successfully");
    } catch (error) {
      console.error("Failed to delete meal:", error);
      toast.error("Failed to delete meal");
    }
  };

  const handleEdit = (meal: IMeal) => {
    setEditMeal(meal);
    setMealName(meal.name);
    setMealDate(meal.date);
    setAllowedDays(
      meal.allowedDays.map(
        (day) =>
          dayOptions.find((option) => option.value === day) as {
            value: string;
            label: string;
          }
      )
    );
    setSelectedItems(
      meal.mealItems.map((mealItem: { item: { id: any; name: any } }) => ({
        value: mealItem.item.id,
        label: mealItem.item.name,
      }))
    );
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMeal) return;

    try {
      const res = await updateMeal({
        id: editMeal.id,
        name: mealName,
        date: new Date(mealDate).toISOString(), // Format date
        allowedDays: allowedDays.map((day) => day.value),
        items: selectedItems.map((item) => item.value),
      }).unwrap();
      toast.success(res.message || "Meal updated successfully");
      setEditMeal(null);
    } catch (error) {
      console.error("Failed to update meal:", error);
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
      ) {
        toast.error((error as any).data.message || "Failed to update meal");
      } else {
        toast.error("Failed to update meal");
      }
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleMeal) return;

    try {
      const res = await scheduleMealMutation({
        mealId: scheduleMeal.id,
        date: new Date(mealDate).toISOString(), // Format date
      }).unwrap();
      toast.success(res.message || "Meal scheduled successfully");
      setScheduleMeal(null);
    } catch (error) {
      console.error("Failed to schedule meal:", error);
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
      ) {
        toast.error((error as any).data.message || "Failed to schedule meal");
      } else {
        toast.error("Failed to schedule meal");
      }
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
    return <div className="alert alert-error">Error loading meals</div>;
  }

  const meals: IMeal[] = mealsData?.data || [];
  const totalMeals = meals.length;
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Manage Meals</h2>
        <CreateMeal />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of meals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Allowed Days</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell className="font-medium">{meal.name}</TableCell>
                <TableCell>{meal.date}</TableCell>
                <TableCell>{meal.allowedDays.join(", ")}</TableCell>
                <TableCell>
                  {meal.mealItems
                    .map((mealItem: any) => mealItem.item.name)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(meal)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Meal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                          <div className="mb-4">
                            <label
                              htmlFor="mealName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Meal Name
                            </label>
                            <Input
                              id="mealName"
                              type="text"
                              value={mealName}
                              onChange={(e) => setMealName(e.target.value)}
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="mealDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date
                            </label>
                            <Input
                              id="mealDate"
                              type="date"
                              value={mealDate}
                              onChange={(e) => setMealDate(e.target.value)}
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Allowed Days
                            </label>
                            <Select
                              isMulti
                              options={dayOptions}
                              value={allowedDays}
                              onChange={(value) =>
                                setAllowedDays(
                                  value as { value: string; label: string }[]
                                )
                              }
                              placeholder="Select allowed days..."
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Items
                            </label>
                            <Select
                              isMulti
                              options={
                                itemsData?.items.map((item: IItem) => ({
                                  value: item.id,
                                  label: `${item.name} (${item.category})`,
                                })) || []
                              }
                              value={selectedItems}
                              onChange={(value) =>
                                setSelectedItems(
                                  value as { value: string; label: string }[]
                                )
                              }
                              placeholder="Select items..."
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            <Button
                              variant="ghost"
                              onClick={() => setEditMeal(null)}
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setScheduleMeal(meal)}
                        >
                          Schedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule Meal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSchedule}>
                          <div className="mb-4">
                            <label
                              htmlFor="scheduleDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date
                            </label>
                            <Input
                              id="scheduleDate"
                              type="date"
                              value={mealDate}
                              onChange={(e) => setMealDate(e.target.value)}
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Schedule</Button>
                            <Button
                              variant="ghost"
                              onClick={() => setScheduleMeal(null)}
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(meal.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Meals: {totalMeals}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ManageMeals;
