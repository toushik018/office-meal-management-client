import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconType } from "react-icons";

export type IMeta = {
    page: number;
    limit: number;
    total: number;
}

export type TUserRole = keyof typeof USER_ROLE;


export interface DrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: IconType;
    child?: DrawerItem[];
}


export type ResponseSuccessType = {
    data: any;
    meta?: IMeta[]
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessage: IGenericErrorMessage[]
}

export type IGenericErrorMessage = {
    path: string | number;
    message: string
}



