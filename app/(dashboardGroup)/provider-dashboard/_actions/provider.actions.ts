"use server";


import {
    getProviderOrders,
    updateRentalStatus
}
from "@/services/provider.service";




export async function fetchProviderOrders(){


    return await getProviderOrders();


}





export async function approveRental(
    id:string
){


    return await updateRentalStatus(
        id,
        "CONFIRMED"
    );


}