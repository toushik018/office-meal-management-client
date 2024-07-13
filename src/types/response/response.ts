// src/types/api.ts
export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface ResetPasswordResponse {
    message: string;
}
