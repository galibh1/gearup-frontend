"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";


type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: {
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "CUSTOMER" | "PROVIDER" | "ADMIN";
            activeStatus?: string;
        };
    };
};



export const loginAction = async (
    redirectTo: string,
    prevState: LoginState | null,
    formData: FormData
) => {

    const email = formData.get("email");
    const password = formData.get("password");


    const payload = {
        email,
        password,
    };


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",

            headers:{
                "Content-Type":"application/json",
            },

            body: JSON.stringify(payload),

            cache:"no-store",
        }
    );


    const result = await res.json();



    if(!result.success){

        return result;

    }



    const cookieStore = await cookies();



    cookieStore.set(
        "accessToken",
        result.data.accessToken,
        {
            httpOnly:true,

            maxAge:
                60 * 60 * 24 * 7,

            sameSite:"lax",

            secure:
                process.env.NODE_ENV === "production",
        }
    );



    const decodedToken =
        jwt.decode(
            result.data.accessToken
        ) as JwtPayload;



    if (
        redirectTo &&
        typeof redirectTo === "string" &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
    ) {

        redirect(redirectTo);

    }



    switch(decodedToken.role){


        case "CUSTOMER":

            redirect("/dashboard");


        case "PROVIDER":

            redirect("/provider-dashboard");


        case "ADMIN":

            redirect("/admin-dashboard");


        default:

            redirect("/");

    }

};





export const registerAction = async (
    prevState: unknown,
    formData: FormData
) => {


    const name =
        formData.get("name");


    const email =
        formData.get("email");


    const password =
        formData.get("password");


    const role =
        formData.get("role");



    const payload = {

        name,

        email,

        password,

        role,

    };




    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json",
            },


            body:JSON.stringify(payload),


            cache:"no-store",

        }
    );



    const result =
        await res.json();




    if(!result.success){

        return result;

    }



    redirect("/login");

};