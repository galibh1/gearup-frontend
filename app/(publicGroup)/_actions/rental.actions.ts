"use server";

import { cookies } from "next/headers";


const API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:8000";



export async function createRental(data:{
  startDate:string;
  endDate:string;
  items:{
    gearItemId:string;
    quantity:number;
  }[];
}){


  const cookieStore = await cookies();


  const token =
    cookieStore.get("accessToken")?.value;



  if(!token){

    return {
      success:false,
      message:"You must login before renting gear"
    };

  }



  console.log(
    "RENTAL REQUEST PAYLOAD:",
    JSON.stringify(data,null,2)
  );



  const response = await fetch(
    `${API_URL}/api/rentals`,
    {

      method:"POST",

      headers:{

        "Content-Type":
        "application/json",

        Authorization:
        `Bearer ${token}`

      },

      body:JSON.stringify(data)

    }
  );



  const result =
    await response.json();



  console.log(
    "RENTAL BACKEND RESPONSE:",
    result
  );



  if(!response.ok){

    return {
      success:false,
      message:
        result.message ||
        "Failed to create rental"
    };

  }



  return result;

}