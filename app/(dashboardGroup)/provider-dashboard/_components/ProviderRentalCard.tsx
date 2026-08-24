"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    updateRentalStatus
} from "@/services/provider.service";





export default function ProviderRentalCard({

    rental

}:{

    rental:any

}){


    const router =
        useRouter();


    const [loading,setLoading] =
        useState(false);







    async function confirmRental(){


        try{


            setLoading(true);




            await updateRentalStatus(

                rental.id,

                {
                    status:"CONFIRMED"
                }

            );





            alert(
                "Rental confirmed successfully"
            );



            router.refresh();




        }


        catch(error:any){


            console.log(
                error
            );



            alert(

                error?.response?.data?.message
                ||
                "Failed to confirm rental"

            );


        }


        finally{


            setLoading(false);


        }


    }









    return (


        <div

            className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
            "

        >





            <div

                className="
                flex
                justify-between
                items-start
                "

            >





                <div>


                    <h2

                        className="
                        text-xl
                        font-bold
                        text-gray-900
                        "

                    >

                        Rental #{rental.id.slice(0,8)}

                    </h2>





                    <p

                        className="
                        mt-3
                        text-gray-700
                        "

                    >

                        <strong>
                            Customer:
                        </strong>

                        {" "}

                        {
                            rental.customer?.name ||
                            "N/A"
                        }

                    </p>






                    <p

                        className="
                        text-gray-700
                        "

                    >

                        <strong>
                            Email:
                        </strong>

                        {" "}

                        {
                            rental.customer?.email ||
                            "N/A"
                        }

                    </p>



                </div>








                <span

                    className={`
                    
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    
                    ${
                        rental.status === "PLACED"

                        ?

                        "bg-yellow-100 text-yellow-700"

                        :

                        rental.status === "CONFIRMED"

                        ?

                        "bg-blue-100 text-blue-700"

                        :

                        "bg-green-100 text-green-700"

                    }

                    `}

                >

                    {
                        rental.status
                    }

                </span>




            </div>









            <div

                className="
                mt-6
                border-t
                pt-5
                space-y-2
                text-gray-700
                "

            >



                <p>


                    <strong>
                        Start:
                    </strong>


                    {" "}


                    {
                        new Date(
                            rental.startDate
                        )
                        .toLocaleDateString()
                    }


                </p>






                <p>


                    <strong>
                        End:
                    </strong>


                    {" "}


                    {
                        new Date(
                            rental.endDate
                        )
                        .toLocaleDateString()
                    }


                </p>







                <p

                    className="
                    font-bold
                    text-lg
                    mt-4
                    "

                >

                    Total:

                    {" "}

                    ${rental.totalAmount}


                </p>





            </div>









            {
                rental.status === "PLACED" && (


                    <button


                        onClick={
                            confirmRental
                        }



                        disabled={
                            loading
                        }



                        className="
                        mt-6
                        w-full
                        bg-green-600
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        hover:bg-green-700
                        disabled:opacity-50
                        transition
                        "

                    >



                        {

                            loading

                            ?

                            "Confirming..."

                            :

                            "Confirm Rental"

                        }



                    </button>


                )

            }






        </div>


    );

}