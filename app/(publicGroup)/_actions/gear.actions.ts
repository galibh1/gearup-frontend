"use server";


export async function getAllGear(){


try{


const response = await fetch(

`${process.env.BACKEND_API_URL}/api/gear`,

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