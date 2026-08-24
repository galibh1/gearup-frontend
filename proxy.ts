import {
    NextRequest,
    NextResponse
} from "next/server";

import jwt from "jsonwebtoken";



const publicRoutes = [

    "/",
    "/login",
    "/register",

];



const protectedRoutes = [

    "/dashboard",
    "/provider-dashboard",
    "/admin-dashboard",

];





export function proxy(

    request:NextRequest

){


    const pathname =
        request.nextUrl.pathname;



    const token =
        request.cookies.get(
            "accessToken"
        )?.value;




    if(
        publicRoutes.includes(pathname)
    ){

        return NextResponse.next();

    }






    const isProtected =
        protectedRoutes.some(
            route =>
                pathname.startsWith(route)
        );






    if(
        isProtected &&
        !token
    ){

        return NextResponse.redirect(

            new URL(
                "/login",
                request.url
            )

        );

    }





    if(token){


        try{


            const decoded =
                jwt.decode(token) as {
                    role?:string
                };



            const role =
                decoded?.role;



            if(
                pathname.startsWith(
                    "/dashboard"
                )
                &&
                role !== "CUSTOMER"
            ){

                return NextResponse.redirect(

                    new URL(
                        "/unauthorized",
                        request.url
                    )

                );

            }





            if(
                pathname.startsWith(
                    "/provider-dashboard"
                )
                &&
                role !== "PROVIDER"
            ){

                return NextResponse.redirect(

                    new URL(
                        "/unauthorized",
                        request.url
                    )

                );

            }





            if(
                pathname.startsWith(
                    "/admin-dashboard"
                )
                &&
                role !== "ADMIN"
            ){

                return NextResponse.redirect(

                    new URL(
                        "/unauthorized",
                        request.url
                    )

                );

            }




        }

        catch{


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