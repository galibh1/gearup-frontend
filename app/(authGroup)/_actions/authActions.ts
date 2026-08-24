"use server";


import { redirect } from "next/navigation";
import { cookies } from "next/headers";


const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";





export async function registerAction(

    previousState:any,

    formData:FormData

){


    const body = {


        name:
        String(
            formData.get("name") || ""
        ),


        email:
        String(
            formData.get("email") || ""
        ),


        password:
        String(
            formData.get("password") || ""
        ),


        role:
        String(
            formData.get("role") || ""
        ),


    };





    try{


        console.log(
            "REGISTER BODY:",
            body
        );



        const response =
        await fetch(

            `${API_URL}/api/auth/register`,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(body)

            }

        );






        const result =
        await response.json();





        console.log(
            "REGISTER RESPONSE:",
            result
        );






        if(!response.ok){


            return {


                success:false,


                message:
                result.message ||
                "Registration failed"


            };


        }





        return {


            success:true,


            message:
            "Account created successfully"


        };



    }

    catch(error:any){



        console.log(
            "REGISTER ERROR:",
            error
        );



        return {


            success:false,


            message:
            error.message ||
            "Registration failed"


        };


    }


}









export async function loginAction(

    previousState:any,

    formData:FormData

){



    try{



        const body={


            email:String(
                formData.get("email") || ""
            ),



            password:String(
                formData.get("password") || ""
            ),


        };






        const response =
        await fetch(

            `${API_URL}/api/auth/login`,

            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


                },


                body:
                JSON.stringify(body)


            }

        );








        const result =
        await response.json();








        if(!response.ok){



            return {


                success:false,


                message:
                result.message ||
                "Login failed"



            };


        }








        const cookieStore =
        await cookies();








        cookieStore.set(

            "accessToken",

            result.data.accessToken,


            {


                httpOnly:true,


                secure:
                process.env.NODE_ENV==="production",


                sameSite:"lax",


                path:"/",



            }


        );









        const role =
        result.data.user.role;






        if(role==="ADMIN"){


            redirect(
                "/admin-dashboard"
            );


        }



        if(role==="PROVIDER"){


            redirect(
                "/provider-dashboard"
            );


        }



        redirect(
            "/dashboard"
        );






    }



    catch(error:any){



        if(
            error?.digest?.startsWith(
                "NEXT_REDIRECT"
            )
        ){

            throw error;

        }






        return {


            success:false,


            message:
            error.message ||
            "Login failed"


        };



    }


}