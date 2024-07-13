// import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
    "/dashboard",
    "/dashboard/change-password",
    "/dashboard/edit-profile",
];
const roleBasedPrivateRoutes = {
    USER: [/^\/dashboard\/user/],
    ADMIN: [/^\/dashboard\/admin/],
};
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    const accessToken = cookies().get('accessToken')?.value;
    // const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (
        accessToken &&
        (commonPrivateRoutes.includes(pathname) ||
            commonPrivateRoutes.some((route) => pathname.startsWith(route)))
    ) {
        return NextResponse.next();
    }

    let decodedData = null;

    try {
        if (accessToken) {
            decodedData = jwtDecode(accessToken) as any;
        }
    } catch (error) {
        console.error("Failed to decode JWT", error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = decodedData?.role;

    console.log({ role, decodedData });

    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/login', '/register', '/dashboard/:path*'],
};
