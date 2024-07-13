"use client";

import { format } from "date-fns";
import { useGetMealChoicesForUsersQuery } from "@/redux/api/mealApi";

const MealChoices = () => {
  const { data, isLoading, error } = useGetMealChoicesForUsersQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Error loading meal choices</div>;
  }

  const mealChoices = data?.data || [];

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Meal Choices
      </h2>
      <div className="overflow-x-auto mt-4 bg-white rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                User
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Email
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Meal
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                Items
              </th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">
                No Meal
              </th>
            </tr>
          </thead>
          <tbody>
            {mealChoices.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.user.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.user.email}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {format(new Date(order.orderDate), "MMMM dd, yyyy")}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.meal?.name || "No meal"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.noMeal
                    ? "No meal"
                    : order.meal?.mealItems
                        .map((mealItem: any) => mealItem.item.name)
                        .join(", ")}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.noMeal ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealChoices;
