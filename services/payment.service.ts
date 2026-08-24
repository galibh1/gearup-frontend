"use server";


import { cookies } from "next/headers";



const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";





export async function createPaymentSession(

    data:{
        rentalOrderId:string;
    }

){



    const cookieStore =
        await cookies();





    const token =
        cookieStore.get(
            "accessToken"
        )?.value;





    if(!token){


        throw new Error(
            "Authentication required"
        );


    }







    const response =
        await fetch(

            `${API_URL}/api/payments/create`,

            {


                method:"POST",



                headers:{


                    "Content-Type":
                    "application/json",



                    Authorization:
                    `Bearer ${token}`


                },



                body:
                JSON.stringify(data)



            }


        );







    const result =
        await response.json();







    console.log(
        "PAYMENT RESPONSE:",
        result
    );







    if(!response.ok){


        throw new Error(

            result?.message ||

            "Payment creation failed"


        );


    }







    return result;



}








export async function confirmPayment(

    data:{
        stripeSessionId:string;
    }

){



    const cookieStore =
        await cookies();





    const token =
        cookieStore.get(
            "accessToken"
        )?.value;





    if(!token){


        throw new Error(
            "Authentication required"
        );


    }







    const response =
        await fetch(

            `${API_URL}/api/payments/confirm`,

            {


                method:"POST",



                headers:{


                    "Content-Type":
                    "application/json",



                    Authorization:
                    `Bearer ${token}`


                },



                body:
                JSON.stringify(data)



            }


        );







    const result =
        await response.json();







    console.log(
        "CONFIRM PAYMENT RESPONSE:",
        result
    );







    if(!response.ok){


        throw new Error(

            result?.message ||

            "Payment confirmation failed"


        );


    }







    return result;



}