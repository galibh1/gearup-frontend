import { getAccessToken } from "@/lib/auth";


export const getAllUsers = async () => {


    const token =
    await getAccessToken();



    const response =
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        {

            method:"GET",

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