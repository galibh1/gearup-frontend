"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";





export async function createPaymentAction(
    rentalOrderId: string
) {


    try {


        if (!rentalOrderId) {

            return {

                success: false,

                message:
                    "Rental order ID missing"

            };

        }




        const cookieStore =
            await cookies();



        const accessToken =
            cookieStore.get(
                "accessToken"
            )?.value;




        if (!accessToken) {

            return {

                success: false,

                message:
                    "Authentication required"

            };

        }





        const response =
            await fetch(
                `${API_URL}/api/payments/create`,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Cookie:
                            `accessToken=${accessToken}`

                    },


                    body: JSON.stringify({

                        rentalOrderId

                    }),


                    cache:
                        "no-store"

                }
            );





        const result =
            await response.json();





        console.log(
            "PAYMENT RESPONSE:",
            result
        );






        if (!response.ok) {


            return {

                success: false,

                message:
                    result.message ||
                    "Payment creation failed"

            };

        }





        const checkoutUrl =
            result
                ?.data
                ?.checkoutSession
                ?.url;





        if (!checkoutUrl) {


            return {

                success: false,

                message:
                    "Stripe checkout URL missing"

            };

        }





        return {


            success: true,


            message:
                "Checkout created successfully",


            checkoutUrl


        };






    } catch (error: any) {


        console.error(
            "PAYMENT ERROR:",
            error
        );



        return {


            success: false,


            message:
                error.message ||
                "Payment failed"

        };


    }


}