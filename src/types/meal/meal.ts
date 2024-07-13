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
