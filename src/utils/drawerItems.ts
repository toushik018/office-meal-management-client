import { USER_ROLE } from "@/constants/role";
import { DrawerItem, TUserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyIcon from "@mui/icons-material/Key";
import IosShareIcon from '@mui/icons-material/IosShare';

export const drawerItems = (role: TUserRole) => {
    const roleMenus: DrawerItem[] = [];
    const defaultMenus = [
        {
            title: "Profile",
            path: `${role}/profile`,
            icon: PersonOutlineIcon,
        },
        {
            title: "Change Password",
            path: "change-password",
            icon: KeyIcon,
        },
    ];
    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon,
                },
                {
                    title: "Manage Users",
                    path: `${role}/manage-users`,
                    icon: GroupIcon,
                },
                {
                    title: "Add Items",
                    path: `${role}/add-items`,
                    icon: GroupIcon,
                },
                {
                    title: "Manage Items",
                    path: `${role}/manage-items`,
                    icon: GroupIcon,
                },
                {
                    title: "Manage Meals",
                    path: `${role}/manage-meals`,
                    icon: GroupIcon,
                }
            );
            break;

        case USER_ROLE.USER:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon,
                },
                {
                    title: "Order Meal",
                    path: `${role}/order-meal`,
                    icon: AddBusinessIcon,
                },
                {
                    title: "My Orders",
                    path: `${role}/my-orders`,
                    icon: ApartmentIcon,
                },
                {
                    title: "Meal Schedule",
                    path: `${role}/meal-schedule`,
                    icon: IosShareIcon,
                }
            );
            break;

        default:
            break;
    }

    return [...roleMenus, ...defaultMenus];
};
