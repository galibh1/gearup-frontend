"use client";


import { useParams } from "next/navigation";
import PayButton from "./PayButton";



export default function RentalDetailPage(){


    const params =
        useParams();



    const rentalId =
        params.id as string;





    return (

        <div
            className="
            min-h-screen
            bg-gray-50
            p-6
            "
        >


            <div
                className="
                mx-auto
                max-w-3xl
                rounded-xl
                bg-white
                p-8
                shadow
                "
            >


                <h1
                    className="
                    text-2xl
                    font-bold
                    mb-6
                    "
                >

                    Rental Payment

                </h1>




                <PayButton

                    rentalId={
                        rentalId
                    }

                />


            </div>


        </div>

    );


}