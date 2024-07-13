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
import Select, { components } from "react-select";
import {
  useGetAllMealsQuery,
  useScheduleMealMutation,
} from "@/redux/api/mealApi";

const ScheduleMeal = () => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const {
    data: mealsData,
    isLoading: mealsLoading,
    error: mealsError,
  } = useGetAllMealsQuery({});
  const [scheduleMeal, { isLoading: scheduling }] = useScheduleMealMutation();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleDate(e.target.value);
  };

  const handleMealChange = (selected: any) => {
    setSelectedMeal(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedMeal) {
      toast.error("Please select a meal");
      return;
    }

    try {
      const result = await scheduleMeal({
        mealId: selectedMeal.value,
        date: scheduleDate,
      }).unwrap();
      toast.success(result.message || "Meal scheduled successfully");
      setScheduleDate("");
      setSelectedMeal(null);
    } catch (error: any) {
      console.error("Failed to schedule meal:", error);
      toast.error(error?.data?.message || "Failed to schedule meal");
    }
  };

  if (mealsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (mealsError) {
    return <div className="alert alert-error">Error loading meals</div>;
  }

  const customOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div>
          <strong>{props.data.label}</strong>
          <div className="text-sm text-black">
            {props.data.items.join(", ")}
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Schedule a Meal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-full">
            <label
              htmlFor="scheduleDate"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <Input
              id="scheduleDate"
              type="date"
              value={scheduleDate}
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
              options={
                mealsData?.data.map(
                  (meal: {
                    id: string;
                    name: string;
                    mealItems: { item: { name: string } }[];
                  }) => ({
                    value: meal.id,
                    label: meal.name,
                    items: meal.mealItems.map(
                      (mealItem: { item: { name: string } }) =>
                        mealItem.item.name
                    ),
                  })
                ) || []
              }
              value={selectedMeal}
              onChange={handleMealChange}
              placeholder="Select meal..."
              className="mt-2"
              components={{ Option: customOption }}
            />
          </div>
        </div>
        <Button type="submit" variant="default" disabled={scheduling}>
          {scheduling ? "Scheduling..." : "Schedule Meal"}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleMeal;
