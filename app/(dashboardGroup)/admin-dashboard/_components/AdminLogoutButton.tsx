"use client";

import { logoutAction } from "@/app/(authGroup)/_actions/logoutAction";
import { LogOut } from "lucide-react";


export default function AdminLogoutButton(){

    async function handleLogout(){

        await logoutAction();

    }


    return (

        <button
            onClick={handleLogout}
            className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-red-500
                px-5
                py-2.5
                text-white
                font-medium
                hover:bg-red-600
                transition
            "
        >

            <LogOut size={18}/>

            Logout

        </button>

    );

}