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




const images =

gear.imageUrls?.length > 0

?

gear.imageUrls.filter(

(img:string)=>
!img.includes("example.com")

)

:

[];




const mainImage =

images[0]

||

"/placeholder-gear.jpg";





return (

<main

className="
max-w-7xl
mx-auto
p-8
"

>


<div

className="
grid
lg:grid-cols-2
gap-10
"

>



{/* IMAGE SECTION */}


<div>


<div

className="
relative
h-[450px]
rounded-3xl
overflow-hidden
"

>

<Image

src={mainImage}

alt={gear.name}

fill

priority

className="
object-cover
"

/>


</div>




<div

className="
grid
grid-cols-3
gap-4
mt-5
"

>


{

images.slice(1,4).map(

(img:string,index:number)=>(


<div

key={index}

className="
relative
h-28
rounded-xl
overflow-hidden
"

>


<Image

src={img}

alt={gear.name}

fill

className="
object-cover
"

/>



</div>


)

)


}


</div>


</div>





{/* DETAILS SECTION */}


<div>



<h1

className="
text-5xl
font-bold
"

>

{gear.name}

</h1>




<p

className="
mt-4
text-gray-600
text-lg
"

>

{gear.description}

</p>





<div

className="
flex
gap-3
mt-5
"

>


<span

className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
"

>

{gear.category?.name}

</span>



<span

className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
"

>

{
gear.availableStock > 0

?

"Available"

:

"Unavailable"

}

</span>



</div>





<div

className="
mt-8
"

>


<h2

className="
text-3xl
font-bold
"

>

${gear.pricePerDay}/day

</h2>


</div>





{/* PROVIDER */}


<div

className="
mt-8
bg-gray-50
rounded-2xl
p-5
"

>


<h3

className="
font-bold
text-xl
"

>

Provider

</h3>



<p

className="
mt-2
"

>

{gear.provider?.name}

</p>



<p

className="
text-gray-500
"

>

{gear.provider?.email}

</p>


</div>





{/* SPECIFICATION */}



{

gear.specifications &&


<div

className="
mt-8
"

>


<h3

className="
text-2xl
font-bold
mb-3
"

>

Specifications

</h3>



<pre

className="
bg-gray-100
rounded-xl
p-5
overflow-auto
"

>

{
JSON.stringify(
gear.specifications,
null,
2
)
}

</pre>



</div>



}






{/* RENT BOX */}



<div

className="
mt-8
border
rounded-2xl
p-6
shadow-sm
"

>



<h3

className="
text-2xl
font-bold
"

>

Rent This Gear

</h3>



<p

className="
mt-3
text-gray-500
"

>

Select rental dates and continue to checkout.

</p>



<div

className="
grid
md:grid-cols-2
gap-4
mt-5
"

>


<input

type="date"

className="
border
rounded-xl
p-3
"

/>


<input

type="date"

className="
border
rounded-xl
p-3
"

/>



</div>




<button

className="
mt-6
w-full
bg-black
text-white
py-4
rounded-xl
font-semibold
hover:bg-gray-800
"

>

Rent Now

</button>



</div>




</div>




</div>


</main>


)


}