"use client";


import {
    useState
} from "react";


import {
    changeUserStatus
}
from "../_actions/admin.actions";


import {
    useRouter
}
from "next/navigation";




type User = {

    id:string;

    name:string;

    email:string;

    role:string;

    activeStatus:string;

};





export default function UserTable({
    users
}:{
    users:User[]
}){


    const router = useRouter();


    const [loadingId,setLoadingId] =
    useState<string | null>(null);




    async function handleStatus(
        id:string,
        status:string
    ){


        try{


            setLoadingId(id);



            const result =
            await changeUserStatus(
                id,
                status
            );



            if(!result.success){

                alert(
                    result.message ||
                    "Failed to update status"
                );

                return;

            }



            router.refresh();



        }catch(error){


            alert(
                "Something went wrong"
            );


        }finally{


            setLoadingId(null);


        }


    }





    return (

        <div
        className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        "
        >


            <h2
            className="
            text-xl
            font-bold
            mb-5
            "
            >

                Users

            </h2>





            <table
            className="
            w-full
            text-left
            "
            >


                <thead>


                    <tr className="border-b">


                        <th className="p-3">
                            Name
                        </th>


                        <th>
                            Email
                        </th>


                        <th>
                            Role
                        </th>


                        <th>
                            Status
                        </th>


                        <th>
                            Action
                        </th>


                    </tr>


                </thead>






                <tbody>


                {
                    users.map((user)=>(


                        <tr
                        key={user.id}
                        className="border-b"
                        >



                            <td className="p-3">
                                {user.name}
                            </td>




                            <td>
                                {user.email}
                            </td>




                            <td>
                                {user.role}
                            </td>




                            <td>


                                <span
                                className="
                                rounded-full
                                bg-green-100
                                px-3
                                py-1
                                text-sm
                                "
                                >

                                    {user.activeStatus}

                                </span>


                            </td>





                            <td>


                            {
                                user.activeStatus === "ACTIVE"

                                ?

                                <button


                                disabled={
                                    loadingId === user.id
                                }


                                onClick={()=>handleStatus(
                                    user.id,
                                    "SUSPENDED"
                                )}


                                className="
                                rounded-lg
                                bg-red-500
                                px-3
                                py-2
                                text-white
                                text-sm
                                disabled:opacity-50
                                "


                                >

                                {
                                    loadingId === user.id
                                    ?
                                    "Updating..."
                                    :
                                    "Suspend"
                                }


                                </button>


                                :


                                <button


                                disabled={
                                    loadingId === user.id
                                }


                                onClick={()=>handleStatus(
                                    user.id,
                                    "ACTIVE"
                                )}


                                className="
                                rounded-lg
                                bg-green-600
                                px-3
                                py-2
                                text-white
                                text-sm
                                disabled:opacity-50
                                "


                                >

                                {
                                    loadingId === user.id
                                    ?
                                    "Updating..."
                                    :
                                    "Activate"
                                }


                                </button>


                            }



                            </td>



                        </tr>


                    ))
                }



                </tbody>



            </table>



        </div>

    );


}