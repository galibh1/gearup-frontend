import api from "@/lib/api";





export async function getProviderOrders(){


    const response =
    await api.get(

        "/api/provider/orders"

    );



    return response.data;


}








export async function updateRentalStatus(

    id:string,

    data:{
        status:string
    }

){


    const response =
    await api.patch(

        `/api/provider/orders/${id}`,

        data

    );



    return response.data;


}