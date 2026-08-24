"use server";


import {
    createPaymentSession
} from "@/services/payment.service";



export async function createPaymentAction(
    rentalOrderId:string
){


    const result =
        await createPaymentSession({

            rentalOrderId

        });



    return result;


}