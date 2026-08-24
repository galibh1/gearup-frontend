import ProviderRentalCard from "./ProviderRentalCard";
import { getProviderOrders } from "@/services/provider.service";




export default async function ProviderDashboard(){



    const result =
    await getProviderOrders();



    const rentals =
    result.data || [];




    return (


        <main
            className="
            min-h-screen
            bg-gray-50
            p-10
            "
        >



            <div
                className="
                max-w-6xl
                mx-auto
                "
            >



                <h1
                    className="
                    text-4xl
                    font-bold
                    "
                >

                    Provider Dashboard

                </h1>





                <p
                    className="
                    mt-3
                    text-gray-600
                    "
                >

                    Manage your rental orders

                </p>








                <div
                    className="
                    mt-10
                    space-y-6
                    "
                >



                    {
                        rentals.length === 0 ?


                        (

                            <div
                                className="
                                bg-white
                                p-8
                                rounded-xl
                                "
                            >

                                No rental orders found.

                            </div>

                        )


                        :


                        rentals.map(
                            (rental:any)=>(


                                <ProviderRentalCard

                                    key={
                                        rental.id
                                    }


                                    rental={
                                        rental
                                    }

                                />


                            )

                        )

                    }



                </div>




            </div>




        </main>


    );

}