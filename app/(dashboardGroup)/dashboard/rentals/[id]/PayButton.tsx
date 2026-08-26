"use client";


import {useState} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";

import {
    createPaymentAction
} from "./_actions/payment.actions";



export default function PayButton({

    rentalId

}:{

    rentalId:string;

}){


    const [loading,setLoading]=
        useState(false);





    async function handlePayment(){


        if(!rentalId){

            toast.error(
                "Rental information missing"
            );

            return;

        }



        try{


            setLoading(true);



            const result =
                await createPaymentAction(
                    rentalId
                );



            console.log(
                result
            );




            if(!result.success){


                toast.error(
                    result.message
                );

                return;

            }




            window.location.assign(
                result.checkoutUrl
            );



        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Unable to start payment"
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
                loading ?

                <>

                <Loader2
                    className="
                    h-5
                    w-5
                    animate-spin
                    "
                />

                Redirecting...

                </>

                :

                "Pay Now"

            }


        </button>

    );


}