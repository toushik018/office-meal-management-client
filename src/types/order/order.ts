import { IMeal } from "../meal/meal";
import { IUser } from "../user/user";

export interface IOrder {
    id: string;
    userId: string;
    mealId: string;
    orderDate: string;
    noMeal: boolean;
    createdAt: string;
    updatedAt: string;
    meal: IMeal;
    user: IUser;
}