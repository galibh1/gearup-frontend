"use server";


import {
    getAllUsers
} from "@/services/admin.service";



export async function fetchUsers(){


    try {


        const result =
            await getAllUsers();


        return {
            success:true,
            data:result.data
        };


    }catch(error:any){


        return {
            success:false,
            message:
            error.message ||
            "Failed to load users"
        };


    }

}