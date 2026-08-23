"use client";


type Gear = {

id:string;

name:string;

pricePerDay:number;

category?:{
    id:string;
    name:string;
    slug:string;
}
|
string;


provider?:{
    name:string;
}
|
string;


availability?:string;

};



export default function GearTable({

gears

}:{

gears:Gear[]

}){


return (

<div
className="
rounded-2xl
border
bg-white
p-6
shadow-sm
mt-8
"
>


<h2
className="
text-xl
font-bold
mb-5
"
>

Gear Listings

</h2>




<table
className="
w-full
text-left
"
>


<thead>

<tr className="border-b">


<th className="p-3">
Name
</th>


<th>
Category
</th>


<th>
Price/day
</th>


<th>
Provider
</th>


<th>
Availability
</th>


</tr>

</thead>





<tbody>


{
gears.map((gear)=>(


<tr
key={gear.id}
className="border-b"
>


<td className="p-3 font-medium">

{gear.name}

</td>




<td>

{
typeof gear.category === "object"
?
gear.category?.name
:
gear.category || "N/A"
}

</td>





<td>

${gear.pricePerDay}

</td>





<td>

{
typeof gear.provider === "object"
?
gear.provider?.name
:
gear.provider || "N/A"
}

</td>





<td>

<span
className="
rounded-full
bg-green-100
px-3
py-1
text-sm
"
>

{gear.availability || "AVAILABLE"}

</span>


</td>



</tr>


))
}


</tbody>


</table>


</div>


);

}