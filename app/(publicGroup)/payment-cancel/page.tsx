import Link from "next/link";



export default function PaymentCancelPage(){


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
                text-red-600
                "

                >

                    Payment Cancelled

                </h1>




                <p

                className="
                mt-5
                text-gray-600
                "

                >

                    Your Stripe payment was cancelled.

                </p>




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

                    Back To Rentals

                </Link>



            </div>


        </main>

    );


}