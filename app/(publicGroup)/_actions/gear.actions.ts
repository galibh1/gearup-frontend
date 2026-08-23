"use server";


export async function getGears(){

    try{

        const response = await fetch(
            `${process.env.BACKEND_API_URL}/api/gears`,
            {
                cache:"no-store"
            }
        );


        const result = await response.json();


        if(!response.ok){
            return [];
        }


        return result.data || result;


    }catch(error){

        console.log(error);

        return [];

    }

}