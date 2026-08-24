"use server";


import {

    getProviderOrders,

    updateRentalStatus

}
from "@/services/provider.service";






export async function fetchProviderOrders(){


    try{


        const result =
        await getProviderOrders();



        return {

            success:true,

            data:
            result.data || []

        };


    }
    catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to fetch provider orders"

        };


    }


}







export async function confirmRental(

    id:string

){


    try{


        await updateRentalStatus(

            id,

            {

                status:"CONFIRMED"

            }

        );



        return {

            success:true

        };



    }
    catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to confirm rental"

        };


    }


}