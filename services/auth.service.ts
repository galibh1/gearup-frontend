import api from "@/lib/api";



export async function registerService(
    data:any
){

    const response =
    await api.post(

        "/api/auth/register",

        data

    );


    return response.data;

}





export async function loginService(
    data:any
){

    const response =
    await api.post(

        "/api/auth/login",

        data

    );


    return response.data;

}