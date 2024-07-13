export interface Orders {
    id: string;
    mealId: string;
    orderDate: string;
    noMeal: Boolean;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    status: "ACTIVE" | "BANNED";
    createdAt: string;
    updatedAt: string;
    orders: Orders[]
}


export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED"
}