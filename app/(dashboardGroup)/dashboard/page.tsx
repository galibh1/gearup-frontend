import Link from "next/link";


export default function CustomerDashboard(){


return (

<main className="
min-h-screen
bg-gray-50
p-10
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-4xl
font-bold
text-gray-900
">

Customer Dashboard

</h1>



<p className="
mt-3
text-gray-500
">

Manage your rentals and account.

</p>




<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
">

My Rentals

</h2>


<p className="
mt-3
text-gray-500
">

View your active and previous rental orders.

</p>



<Link

href="/dashboard/rentals"

className="
inline-block
mt-5
bg-black
text-white
px-5
py-2
rounded-xl
"

>

View Rentals

</Link>


</div>






<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
">

Browse Gear

</h2>


<p className="
mt-3
text-gray-500
">

Find equipment available for rent.

</p>



<Link

href="/gear"

className="
inline-block
mt-5
bg-green-600
text-white
px-5
py-2
rounded-xl
"

>

Browse

</Link>


</div>







<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
">

Profile

</h2>


<p className="
mt-3
text-gray-500
">

Manage your account information.

</p>


<button

className="
mt-5
bg-gray-800
text-white
px-5
py-2
rounded-xl
"

>

Profile

</button>


</div>



</div>


</div>


</main>

);


}