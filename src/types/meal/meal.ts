export interface IMeal {
    mealItems: any;
    id: string;
    name: string;
    date: string;
    allowedDays: string[];
    items: {
        id: string;
        name: string;
        category: string;
    }[];
}
export interface IMealSchedule {
    id: string;
    mealId: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    meal: IMeal;
}