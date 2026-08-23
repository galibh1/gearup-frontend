"use server";


import {

    getAllUsers,

    getAllGear,

    getAllRentals,

    updateUserStatus

}
from "@/services/admin.service";





export async function fetchUsers(){


    try{


        const result =
        await getAllUsers();



        return {

            success:true,

            data:result.data,

        };


    }catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to fetch users"

        };


    }


}







export async function fetchAdminGear(){


    try{


        const result =
        await getAllGear();



        return {

            success:true,

            data:result.data,

        };


    }catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to fetch gear"

        };


    }


}







export async function fetchAdminRentals(){


    try{


        const result =
        await getAllRentals();



        return {

            success:true,

            data:result.data,

        };


    }catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to fetch rentals"

        };


    }


}







export async function fetchAdminStats(){


    try{


        const users =
        await getAllUsers();


        const gear =
        await getAllGear();


        const rentals =
        await getAllRentals();




        return {

            success:true,

            data:{

                users:
                users.data.length,


                gear:
                gear.data.length,


                rentals:
                rentals.data.length,

            }


        };



    }catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to fetch statistics"

        };


    }


}







export async function changeUserStatus(

    id:string,

    status:string

){


    try{


        await updateUserStatus(

            id,

            status

        );



        return {

            success:true

        };



    }catch(error:any){


        return {

            success:false,

            message:
            error.message ||
            "Failed to update user status"

        };


    }


}