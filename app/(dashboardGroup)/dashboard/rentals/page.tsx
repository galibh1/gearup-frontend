import Link from "next/link";
import { cookies } from "next/headers";


const API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:8000";



async function getRentals() {


  const cookieStore = await cookies();


  const response = await fetch(
    `${API_URL}/api/rentals`,
    {
      headers:{
        Cookie: cookieStore
          .toString()
      },

      cache:"no-store"
    }
  );



  if(!response.ok){

    console.log(
      "Rental fetch failed",
      response.status
    );

    return [];

  }



  const result =
    await response.json();



  console.log(
    "Rental API result:",
    result
  );



  return result.data ?? result;


}






export default async function RentalsPage(){


const rentals =
  await getRentals();




return(


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
max-w-6xl
mx-auto
"
>


<h1
className="
text-4xl
font-bold
text-gray-900
"
>
My Rentals
</h1>



<p
className="
mt-3
text-gray-500
text-lg
"
>
Your rental history and current orders.
</p>




<div
className="
mt-10
space-y-6
"
>



{
rentals.length === 0 ?


<div
className="
bg-white
rounded-2xl
shadow
p-8
"
>

No rentals found.

</div>



:


rentals.map((rental:any)=>(



<Link

key={rental.id}

href={
`/dashboard/rentals/${rental.id}`
}

className="block"


>



<div

className="
bg-white
rounded-2xl
shadow-sm
p-8
hover:shadow-xl
transition
cursor-pointer
border
border-gray-100
"

>


<div
className="
flex
justify-between
items-center
"
>


<h2
className="
text-xl
font-bold
text-gray-900
"
>

Rental #{rental.id.slice(0,8)}

</h2>



<span
className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
text-sm
font-medium
"
>

{rental.status || "PLACED"}

</span>


</div>





<div
className="
mt-6
text-gray-600
space-y-2
"
>


<p>

<strong>
Start:
</strong>

{" "}

{
new Date(
rental.startDate
)
.toLocaleDateString()
}

</p>




<p>

<strong>
End:
</strong>

{" "}

{
new Date(
rental.endDate
)
.toLocaleDateString()
}

</p>



</div>




<div
className="
mt-6
text-blue-600
font-semibold
"
>

View Rental Details →

</div>



</div>



</Link>


))

}



</div>



</div>



</main>


);


}