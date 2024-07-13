"use client";

import React, { useState } from "react";
import Select, { components } from "react-select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/UI/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/UI/dialog";
import { useCreateMealMutation } from "@/redux/api/mealApi";
import { useGetAllItemsQuery } from "@/redux/api/items";
import { IItem } from "@/types/items/items";
import { Badge } from "@/components/UI/badge";

export type OptionType = {
  value: string;
  label: string;
};

const dayOptions: OptionType[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <span>{props.data.label}</span>
        <Badge variant="secondary">{props.data.category}</Badge>
      </div>
    </components.Option>
  );
};

const CreateMeal = () => {
  const [mealName, setMealName] = useState("");
  const [mealDate, setMealDate] = useState("");
  const [allowedDays, setAllowedDays] = useState<OptionType[]>([]);
  const [selectedItems, setSelectedItems] = useState<OptionType[]>([]);
  const [createMeal, { isLoading }] = useCreateMealMutation();
  const { data: itemsData } = useGetAllItemsQuery({});

  const handleCreateMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createMeal({
        name: mealName,
        date: mealDate,
        allowedDays: allowedDays.map((day) => day.value),
        items: selectedItems.map((item) => item.value),
      }).unwrap();

      // Check if the server response contains a message
      if (res?.message) {
        toast.success(res.message);
      } else {
        toast.success("Meal created successfully");
      }

      setMealName("");
      setMealDate("");
      setAllowedDays([]);
      setSelectedItems([]);
    } catch (error: any) {
      // Check if the error response contains a message
      const errorMessage = error?.data?.message || "Failed to create meal";
      toast.error(errorMessage);
      console.error("Failed to create meal:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Meal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateMeal}>
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
              onChange={(value) => setAllowedDays(value as OptionType[])}
              placeholder="Select allowed days..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Items
            </label>
            <Select
              isMulti
              components={{ Option: CustomOption }}
              options={
                itemsData?.items.map((item: IItem) => ({
                  value: item.id,
                  label: item.name,
                  category: item.category, // Include category in the option data
                })) || []
              }
              value={selectedItems}
              onChange={(value) => setSelectedItems(value as OptionType[])}
              placeholder="Select items..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Meal"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setMealName("");
                setMealDate("");
                setAllowedDays([]);
                setSelectedItems([]);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeal;
