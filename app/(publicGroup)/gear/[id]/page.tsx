import Image from "next/image";
import { notFound } from "next/navigation";

import RentalForm from "../../_components/RentalForm";


const API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:8000";



async function getGear(id:string){


  const response = await fetch(
    `${API_URL}/api/gear/${id}`,
    {
      cache:"no-store"
    }
  );


  if(!response.ok){
    return null;
  }


  const result = await response.json();


  return result.data ?? result;


}





export default async function GearDetailsPage({

params,

}:{

params: Promise<{
 id:string
}>

}){


const {id}= await params;



const gear = await getGear(id);



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

<main className="
min-h-screen
bg-gray-50
py-10
px-5
">


<div className="
max-w-6xl
mx-auto
bg-white
rounded-3xl
shadow-xl
overflow-hidden
grid
md:grid-cols-2
">


<div className="
relative
h-[500px]
">


<Image

src={image}

alt={gear.name}

fill

priority

sizes="(max-width: 768px) 100vw, 50vw"

className="
object-cover
"

/>


</div>





<div className="
p-10
">


<h1 className="
text-4xl
font-bold
text-gray-900
">

{gear.name}

</h1>




<p className="
mt-5
text-gray-500
text-lg
">

{
gear.description ||
"Premium gear available for rental."
}

</p>




<div className="mt-8">


<p className="text-gray-500">

Provider

</p>


<h3 className="
text-xl
font-semibold
">

{
gear.provider?.name ||
"GearUp Provider"
}

</h3>


</div>




<div className="
mt-8
inline-block
bg-green-100
text-green-700
px-5
py-2
rounded-full
">

AVAILABLE

</div>





<div className="
mt-8
text-4xl
font-bold
text-green-600
">

${gear.pricePerDay}/day

</div>





<hr className="my-8"/>





<RentalForm

gearId={gear.id}

/>





</div>


</div>


</main>

)


}