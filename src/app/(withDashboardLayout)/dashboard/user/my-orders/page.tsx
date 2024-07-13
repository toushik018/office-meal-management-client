"use client";

import { format } from "date-fns";
import { useGetOrdersByUserQuery } from "@/redux/api/orderApi";
import { IOrder } from "@/types/order/order";

const MyOrders = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersByUserQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Error loading orders</div>;
  }

  const orders = ordersData?.data || [];

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Orders</h2>
      <div className="overflow-x-auto mt-4 bg-white rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
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
            {orders.map((order: IOrder) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-200">
                  {format(new Date(order.orderDate), "EEEE, MMMM dd, yyyy")}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.noMeal ? "No meal" : order?.meal?.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.noMeal
                    ? "No meal"
                    : order.meal?.mealItems
                        .map(
                          (mealItem: { item: { name: any } }) =>
                            mealItem.item.name
                        )
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

export default MyOrders;
