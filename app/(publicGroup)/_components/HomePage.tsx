"use client";


import Link from "next/link";

import {
    useGear
} from "@/hooks/useGear";


import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent
} from "@/components/ui/card";



type Gear = {

    id:string;

    name:string;

    description:string;

    pricePerDay:number;

    image?:string;

};




export default function HomePage(){



    const {
        data,
        isLoading,
        error

    } = useGear();



    const gears:Gear[] =
        data?.data || data || [];




    if(isLoading){

        return (

            <main className="
            min-h-screen
            bg-gray-50
            flex
            items-center
            justify-center
            ">

                <p className="
                text-gray-500
                text-lg
                ">
                    Loading gear...
                </p>

            </main>

        );

    }




    if(error){

        return (

            <main className="
            min-h-screen
            flex
            items-center
            justify-center
            ">

                <p className="
                text-red-500
                ">
                    Failed to load gear.
                </p>

            </main>

        );

    }





return (

<main className="
min-h-screen
bg-linear-to-br
from-white
via-gray-50
to-emerald-50
">


<nav className="
flex
justify-between
items-center
max-w-7xl
mx-auto
px-8
py-6
">


<h1 className="
text-2xl
font-bold
text-emerald-600
">
GearUp
</h1>



<div className="flex gap-3">


<Link href="/login">

<Button variant="outline">
Login
</Button>

</Link>


<Link href="/register">

<Button>
Register
</Button>

</Link>


</div>


</nav>





<section className="
max-w-7xl
mx-auto
px-8
py-16
text-center
">


<h2 className="
text-5xl
font-bold
text-gray-900
">

Rent quality gear easily

</h2>


<p className="
mt-4
text-gray-500
">

Find equipment for your next adventure.

</p>


</section>






<section className="
max-w-7xl
mx-auto
px-8
grid
gap-6
md:grid-cols-3
pb-16
">


{
gears.map((gear)=>(


<Card
key={gear.id}
className="
rounded-2xl
shadow-sm
"
>


<CardContent
className="
p-6
space-y-3
"
>


<h3 className="
text-xl
font-semibold
">

{gear.name}

</h3>



<p className="
text-gray-500
">

{gear.description}

</p>



<p className="
text-emerald-600
font-bold
">

${gear.pricePerDay}/day

</p>



</CardContent>


</Card>


))
}



</section>



</main>

);


}