"use client";


import { useState } from "react";
import { createPayment } from "@/lib/api";



export default function PayButton({

    rentalId

}:{

    rentalId:string

}){


    const [loading,setLoading] =
        useState(false);



    async function handlePayment(){


        try{


            setLoading(true);



            console.log(
                "Sending rental id:",
                rentalId
            );



            const result =
                await createPayment(
                    rentalId
                );



            console.log(
                "FULL PAYMENT RESPONSE:",
                result
            );



            if(
                result?.checkoutSession?.url
            ){


                window.location.href =
                    result.checkoutSession.url;


            }

            else{


                alert(
                    "Stripe URL missing. Check console."
                );


            }



        }

        catch(error:any){


            console.error(
                "FULL ERROR:",
                error
            );



            console.error(
                "SERVER RESPONSE:",
                error?.response?.data
            );



            alert(

                error?.response?.data?.message ||

                "Payment failed"

            );


        }


        finally{


            setLoading(false);


        }


    }




    return (

        <button

        onClick={handlePayment}

        disabled={loading}

        className="
        mt-8
        w-full
        bg-black
        text-white
        py-4
        rounded-xl
        font-semibold
        disabled:bg-gray-400
        "

        >

        {
            loading
            ?
            "Redirecting..."
            :
            "Pay Now"
        }


        </button>


    );

}