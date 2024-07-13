import { USER_ROLE } from "@/constants/role";
import { DrawerItem, TUserRole } from "@/types";
import { FaTachometerAlt, FaUsers, FaUtensils, FaClipboardList } from "react-icons/fa";
import { MdPersonOutline, MdVpnKey, MdShare } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";

export const drawerItems = (role: TUserRole) => {
    const roleMenus: DrawerItem[] = [];
    const defaultMenus = [
        {
            title: "Profile",
            path: `${role}/profile`,
            icon: MdPersonOutline,
        },
        {
            title: "Change Password",
            path: "change-password",
            icon: MdVpnKey,
        },
    ];

    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: FaTachometerAlt,
                },
                {
                    title: "Add Users",
                    path: `${role}/add-user`,
                    icon: FaUsers,
                },
                {
                    title: "Manage Users",
                    path: `${role}/manage-users`,
                    icon: FaUsers,
                },
                {
                    title: "Add Items",
                    path: `${role}/add-items`,
                    icon: FaUtensils,
                },
                {
                    title: "Manage Items",
                    path: `${role}/manage-items`,
                    icon: FaUtensils,
                },
                {
                    title: "Manage Meals",
                    path: `${role}/manage-meals`,
                    icon: BiFoodMenu,
                },
                {
                    title: "Meal Schedule",
                    path: `${role}/meal-schedule`,
                    icon: MdShare,
                },
                {
                    title: "Meals Choices",
                    path: `${role}/meal-choices`,
                    icon: FaClipboardList,
                }
            );
            break;

        case USER_ROLE.USER:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: FaTachometerAlt,
                },
                {
                    title: "Order Meal",
                    path: `${role}/meal-order`,
                    icon: AiOutlineShoppingCart,
                },
                {
                    title: "My Orders",
                    path: `${role}/my-orders`,
                    icon: FaClipboardList,
                }
            );
            break;

        default:
            break;
    }

    return [...roleMenus, ...defaultMenus];
};
