import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const publicRoutes = [
    "/",
    "/login",
    "/register",
];



export function proxy(
    request: NextRequest
) {

    const pathname =
        request.nextUrl.pathname;


    const token =
        request.cookies.get(
            "accessToken"
        )?.value;



    // Allow public routes

    if (
        publicRoutes.includes(pathname)
    ) {

        return NextResponse.next();

    }



    const protectedRoutes = [
        "/dashboard",
        "/provider-dashboard",
        "/admin-dashboard",
    ];



    const isProtectedRoute =
        protectedRoutes.some(
            (route) =>
                pathname.startsWith(route)
        );



    // If user is not logged in

    if (
        isProtectedRoute &&
        !token
    ) {

        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );

    }



    // Verify JWT and check role

    if(token){

        try {


            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_ACCESS_SECRET!
                ) as {
                    id:string;
                    name:string;
                    email:string;
                    role:
                    | "CUSTOMER"
                    | "PROVIDER"
                    | "ADMIN";
                };



            const role =
                decoded.role;



            // CUSTOMER

            if(
                pathname.startsWith(
                    "/dashboard"
                )
                &&
                role !== "CUSTOMER"
            ){

                return NextResponse.redirect(
                    new URL(
                        "/",
                        request.url
                    )
                );

            }



            // PROVIDER

            if(
                pathname.startsWith(
                    "/provider-dashboard"
                )
                &&
                role !== "PROVIDER"
            ){

                return NextResponse.redirect(
                    new URL(
                        "/",
                        request.url
                    )
                );

            }



            // ADMIN

            if(
                pathname.startsWith(
                    "/admin-dashboard"
                )
                &&
                role !== "ADMIN"
            ){

                return NextResponse.redirect(
                    new URL(
                        "/",
                        request.url
                    )
                );

            }



        } catch(error){


            return NextResponse.redirect(
                new URL(
                    "/login",
                    request.url
                )
            );


        }

    }



    return NextResponse.next();

}





export const config = {

    matcher:[

        "/dashboard/:path*",

        "/provider-dashboard/:path*",

        "/admin-dashboard/:path*",

    ],

};