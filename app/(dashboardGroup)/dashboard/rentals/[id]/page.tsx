import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

import PayButton from "./PayButton";


const API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:8000";



async function getRental(id:string){

  const cookieStore = await cookies();


  const response = await fetch(

    `${API_URL}/api/rentals/${id}`,

    {
      headers:{
        Cookie: cookieStore.toString(),
      },

      cache:"no-store",
    }

  );


  if(!response.ok){

    return null;

  }


  const result =
    await response.json();


  return result.data ?? result;

}






export default async function RentalDetailsPage({

params,

}:{

params: Promise<{
  id:string
}>

}){


  const {id} =
    await params;



  const rental =
    await getRental(id);



  if(!rental){

    notFound();

  }




  const isPaid =
    rental.status === "PAID";


  const canPay =
    rental.status === "CONFIRMED";






return (

<main
className="
min-h-screen
bg-gray-50
py-12
px-5
"
>


<div
className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-10
"
>


<Link

href="/dashboard/rentals"

className="
text-blue-600
font-semibold
"

>

← Back to Rentals

</Link>




<h1
className="
mt-8
text-4xl
font-bold
text-gray-900
"
>

Rental Details

</h1>





<div

className="
mt-8
space-y-4
text-gray-700
"

>


<p>
<strong>Rental ID:</strong>{" "}
{rental.id}
</p>



<p>
<strong>Status:</strong>{" "}

<span

className="
bg-yellow-100
text-yellow-700
px-4
py-2
rounded-full
text-sm
font-semibold
"

>

{rental.status}

</span>

</p>




<p>
<strong>Start:</strong>{" "}

{
new Date(
rental.startDate
).toLocaleDateString()
}

</p>



<p>

<strong>End:</strong>{" "}

{
new Date(
rental.endDate
).toLocaleDateString()
}

</p>



</div>








<div

className="
mt-10
bg-gray-50
rounded-2xl
p-6
"

>

<h2
className="
text-2xl
font-bold
"
>

Provider

</h2>



<p className="mt-3">

<strong>Name:</strong>{" "}

{rental.provider?.name}

</p>



<p>

<strong>Email:</strong>{" "}

{rental.provider?.email}

</p>



</div>









<div className="mt-10">


<h2
className="
text-2xl
font-bold
"
>

Rental Items

</h2>



<div className="mt-5 space-y-5">


{

rental.items?.map((item:any)=>(


<div

key={item.id}

className="
border
rounded-2xl
p-6
flex
gap-6
"

>


<img

src={
item.gearItem?.imageUrls?.[0]
||
"/placeholder-gear.jpg"
}

alt="gear"

className="
w-32
h-32
object-cover
rounded-xl
"

/>



<div>

<h3
className="
text-xl
font-bold
"
>

{item.gearItem?.name}

</h3>



<p>
Quantity: {item.quantity}
</p>


<p>
Days: {item.rentalDays}
</p>


<p>
Price/day: ${item.pricePerDay}
</p>


</div>


</div>


))

}



</div>


</div>









<div

className="
mt-10
bg-gray-100
rounded-2xl
p-8
"

>


<h2

className="
text-2xl
font-bold
"

>

Payment Summary

</h2>



<div className="mt-5 space-y-4">


<div className="flex justify-between">

<span>
Subtotal
</span>

<span>
${rental.subtotal}
</span>


</div>




<div className="flex justify-between">

<span>
Deposit
</span>

<span>
${rental.depositTotal}
</span>


</div>





<div

className="
border-t
pt-4
flex
justify-between
font-bold
text-xl
"

>

<span>
Total
</span>


<span>

${rental.totalAmount}

</span>


</div>



</div>









{

isPaid ? (


<div

className="
mt-8
bg-green-100
text-green-700
p-5
rounded-xl
font-semibold
"

>

Payment completed successfully.

</div>



)

:

canPay ? (


<div className="mt-8">


<PayButton

rentalId={rental.id}

/>


</div>



)

:


<div

className="
mt-8
bg-yellow-100
text-yellow-700
p-5
rounded-xl
font-semibold
"

>

Waiting for provider confirmation before payment.

</div>



}



</div>



</div>


</main>


);


}