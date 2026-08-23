import Image from "next/image";
import { notFound } from "next/navigation";



async function getGear(id:string){


const response = await fetch(

`${process.env.BACKEND_API_URL}/api/gear/${id}`,

{
cache:"no-store"
}

);



if(!response.ok){

return null;

}



const result = await response.json();


return result.data || result;


}





export default async function GearDetailsPage({

params

}:{

params:{
id:string
}

}){



const gear = await getGear(params.id);



if(!gear){

notFound();

}



const image =

gear.imageUrls?.[0] &&
!gear.imageUrls[0].includes("example.com")

?

gear.imageUrls[0]

:

"/placeholder-gear.jpg";





return (


<div

className="
max-w-5xl
mx-auto
p-10
"

>


<div

className="
relative
h-[400px]
"

>

<Image

src={image}

alt={gear.name}

fill

sizes="100vw"

className="
object-cover
rounded-2xl
"

/>


</div>



<h1

className="
text-4xl
font-bold
mt-8
"

>

{gear.name}

</h1>




<p

className="
text-gray-600
mt-4
text-lg
"

>

{gear.description}

</p>




<div

className="
mt-6
text-green-600
text-3xl
font-bold
"

>

${gear.pricePerDay}/day

</div>



<button

className="
mt-8
bg-black
text-white
px-10
py-4
rounded-xl
"

>

Rent Now

</button>



</div>


)


}