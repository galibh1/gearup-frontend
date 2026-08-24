"use client";


import {
    useTransition
}
from "react";


import {
    toast
}
from "sonner";


import {
    logoutAction
}
from "@/app/(authGroup)/_actions/logoutAction";





export default function LogoutButton(){


    const [
        pending,
        startTransition
    ] = useTransition();





    function handleLogout(){


        startTransition(async()=>{


            try{


                await logoutAction();


            }

            catch(error:any){


                if(
                    error?.digest?.startsWith(
                        "NEXT_REDIRECT"
                    )
                ){

                    return;

                }



                toast.error(
                    error.message ||
                    "Logout failed"
                );


            }


        });


    }






    return (

        <button

        onClick={handleLogout}

        disabled={pending}

        className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-5
        py-2
        rounded-xl
        font-semibold
        disabled:opacity-50
        "

        >

        {
            pending
            ?
            "Logging out..."
            :
            "Logout"
        }


        </button>

    );


    
}