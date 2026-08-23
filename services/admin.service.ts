import { getAccessToken } from "@/lib/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;



export const getAllUsers = async () => {


    const token =
    await getAccessToken();



    const response =
    await fetch(
        `${API_URL}/admin/users`,
        {

            headers:{
                Authorization:
                `Bearer ${token}`
            },

            cache:"no-store"

        }
    );



    const result =
    await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to fetch users"
        );

    }



    return result;

};






export const updateUserStatus = async (

    id:string,

    status:string

) => {


    const token =
    await getAccessToken();



    const response =
    await fetch(
        `${API_URL}/admin/users/${id}`,
        {

            method:"PATCH",

            headers:{

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`

            },


            body:JSON.stringify({

                activeStatus:status

            })


        }
    );



    const result =
    await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to update user status"
        );

    }



    return result;

};






export const getAllGear = async () => {


    const token =
    await getAccessToken();



    const response =
    await fetch(
        `${API_URL}/admin/gear`,
        {

            headers:{
                Authorization:
                `Bearer ${token}`
            },

            cache:"no-store"

        }
    );



    const result =
    await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to fetch gear"
        );

    }



    return result;

};







export const getAllRentals = async () => {


    const token =
    await getAccessToken();



    const response =
    await fetch(
        `${API_URL}/admin/rentals`,
        {

            headers:{
                Authorization:
                `Bearer ${token}`
            },

            cache:"no-store"

        }
    );



    const result =
    await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to fetch rentals"
        );

    }



    return result;

};