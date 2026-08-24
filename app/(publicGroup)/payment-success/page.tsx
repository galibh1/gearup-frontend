import Link from "next/link";

import {
    confirmPayment
} from "@/services/payment.service";




export default async function PaymentSuccessPage({

searchParams

}:{

searchParams:
Promise<{
    session_id?:string;
}>

}){


    const params =
        await searchParams;



    const sessionId =
        params.session_id;



    let payment = null;



    if(sessionId){


        try{


            const result =
                await confirmPayment({

                    stripeSessionId:
                    sessionId

                });



            payment =
                result.data;



        }
        catch(error){


            console.log(
                "PAYMENT CONFIRM ERROR:",
                error
            );


        }


    }





    return (

        <main

        className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        px-5
        "

        >


            <div

            className="
            bg-white
            rounded-3xl
            shadow-xl
            p-10
            text-center
            max-w-lg
            "

            >



                <h1

                className="
                text-4xl
                font-bold
                text-green-600
                "

                >

                    Payment Successful 🎉

                </h1>





                <p

                className="
                mt-5
                text-gray-600
                "

                >

                    Your rental payment has been completed successfully.

                </p>






                {
                    payment &&

                    <div

                    className="
                    mt-6
                    bg-gray-100
                    rounded-xl
                    p-4
                    "

                    >

                        <p>

                            Transaction ID

                        </p>


                        <p

                        className="
                        font-semibold
                        break-all
                        "

                        >

                            {payment.transactionId}

                        </p>


                    </div>

                }







                <Link

                href="/dashboard/rentals"

                className="
                inline-block
                mt-8
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-xl
                "

                >

                    Go To Rentals

                </Link>




            </div>


        </main>

    );


}