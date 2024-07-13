"use client";

import React, { useState, useEffect } from "react";
import {
  useCreateOrderMutation,
  useGetWeeklyMealSchedulesQuery,
} from "@/redux/api/orderApi";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import Select from "react-select";
import { toast } from "sonner";
import { IMeal, IMealSchedule } from "@/types/meal/meal";
import { format, startOfWeek } from "date-fns";

const dayOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const MealOrderPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [noMeal, setNoMeal] = useState(false);
  const weekStart = format(startOfWeek(new Date()), "yyyy-MM-dd");
  const {
    data: mealSchedules,
    isLoading,
    error,
  } = useGetWeeklyMealSchedulesQuery({ weekStart });
  const [createOrder] = useCreateOrderMutation();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleMealChange = (selected: any) => {
    setSelectedMeal(selected);
  };

  const handleNoMealChange = () => {
    setNoMeal(!noMeal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      await createOrder({
        mealId: noMeal ? undefined : selectedMeal?.value, // Set mealId to undefined if noMeal is true
        orderDate: selectedDate,
        noMeal,
      }).unwrap();
      toast.success("Order placed successfully");
      setSelectedDate("");
      setSelectedMeal(null);
      setNoMeal(false);
    } catch (error: any) {
      console.error("Failed to place order:", error);
      toast.error(error?.data?.message || "Failed to place order");
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
    return (
      <div className="alert alert-error">Error loading meal schedules</div>
    );
  }

  // Remove duplicate meals and filter out undefined values
  const uniqueMeals = Array.from(
    new Set(
      mealSchedules?.data.meals.map(
        (mealSchedule: IMealSchedule) => mealSchedule.meal.id
      )
    )
  )
    .map((id) =>
      mealSchedules?.data.meals.find(
        (mealSchedule: IMealSchedule) => mealSchedule.meal.id === id
      )
    )
    .filter(
      (mealSchedule): mealSchedule is IMealSchedule =>
        mealSchedule !== undefined
    );

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Order Your Meals
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full">
            <label
              htmlFor="orderDate"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <Input
              id="orderDate"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Select Meal
            </label>
            <Select
              options={uniqueMeals.map((mealSchedule: IMealSchedule) => ({
                value: mealSchedule.meal.id,
                label: mealSchedule.meal.name,
              }))}
              value={selectedMeal}
              onChange={handleMealChange}
              placeholder="Select meal..."
              isDisabled={noMeal}
              className="mt-2"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="noMeal"
            checked={noMeal}
            onChange={handleNoMealChange}
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="noMeal"
            className="block text-sm font-medium text-gray-700"
          >
            No Meal
          </label>
        </div>
        <Button
          type="submit"
        >
          Place Order
        </Button>
      </form>

      <h3 className="text-xl font-semibold mt-10 text-gray-800">
        Weekly Meal Schedules
      </h3>
      <div className="overflow-x-auto mt-4 rounded-lg min-w-96">
        <table className="bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Meal
              </th>
            </tr>
          </thead>
          <tbody>
            {mealSchedules?.data.meals.map((mealSchedule: IMealSchedule) => (
              <tr key={mealSchedule.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-200">
                  {`${format(
                    new Date(mealSchedule.date),
                    "EEEE, MMMM dd, yyyy"
                  )}`}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {mealSchedule.meal.name} -{" "}
                  {mealSchedule.meal.mealItems
                    .map((item: { item: { name: any } }) => item.item.name)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealOrderPage;
