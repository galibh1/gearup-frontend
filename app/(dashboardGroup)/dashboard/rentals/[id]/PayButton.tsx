"use client";


import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


import {
    createPaymentAction
} from "./_actions/payment.actions";



interface Props {

    rentalId:string;

}




export default function PayButton({

    rentalId

}:Props){



    const [loading,setLoading] =
        useState(false);





    async function handlePayment(){


        try{


            setLoading(true);



            const result =
                await createPaymentAction(
                    rentalId
                );



            console.log(
                "STRIPE RESULT:",
                result
            );



            const url =
                result
                ?.data
                ?.checkoutSession
                ?.url;



            if(!url){

                throw new Error(
                    "Stripe checkout URL missing"
                );

            }



            window.location.href =
                url;



        }
        catch(error:any){


            toast.error(

                error.message ||
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
            w-full
            rounded-lg
            bg-green-600
            px-5
            py-3
            text-white
            font-semibold
            hover:bg-green-700
            disabled:opacity-50
            flex
            justify-center
            items-center
            gap-2
            "

        >


            {
                loading &&

                <Loader2

                    className="
                    h-5
                    w-5
                    animate-spin
                    "

                />

            }



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