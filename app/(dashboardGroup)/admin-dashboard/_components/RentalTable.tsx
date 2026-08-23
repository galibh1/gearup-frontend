"use client";


type Rental = {

id:string;

status:string;

totalAmount:number;

customer?:{
    name:string;
}
|
string;


gear?:{
    name:string;
}
|
string;


};



export default function RentalTable({

rentals

}:{

rentals:Rental[]

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

Rental Orders

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
Customer
</th>


<th>
Gear
</th>


<th>
Amount
</th>


<th>
Status
</th>


</tr>

</thead>





<tbody>


{

rentals.map((rental)=>(


<tr
key={rental.id}
className="border-b"
>



<td className="p-3">

{
typeof rental.customer === "object"
?
rental.customer?.name
:
rental.customer || "N/A"
}

</td>




<td>

{
typeof rental.gear === "object"
?
rental.gear?.name
:
rental.gear || "N/A"
}

</td>




<td>

${rental.totalAmount}

</td>




<td>

<span
className="
rounded-full
bg-blue-100
px-3
py-1
text-sm
"
>

{rental.status}

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