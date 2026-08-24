"use client";


import {
    useState,
    useTransition
}
from "react";


import {
    toast
}
from "sonner";


import {
    approveRental
}
from "../_actions/provider.actions";





export default function ProviderRentalCard({

rental

}:{

rental:any;

}){


const [
pending,
startTransition
]=useTransition();



const [
status,
setStatus
]=useState(
    rental.status
);





function handleApprove(){


startTransition(async()=>{


try{


const result =
await approveRental(
    rental.id
);



toast.success(
    "Rental confirmed successfully"
);



setStatus(
    "CONFIRMED"
);



}
catch(error:any){


toast.error(

error.message ||
"Failed to confirm rental"

);


}


});


}





return (

<div

className="
border
rounded-2xl
p-6
bg-white
shadow-md
space-y-5
"

>


<h2

className="
text-2xl
font-bold
"

>

Rental Request

</h2>





<div

className="
space-y-2
text-gray-700
"

>


<p>

<strong>
Customer:
</strong>

{" "}

{rental.customer?.name}

</p>




<p>

<strong>
Email:
</strong>

{" "}

{rental.customer?.email}

</p>




<p>

<strong>
Rental ID:
</strong>

{" "}

{rental.id}

</p>




<p>

<strong>
Status:
</strong>

{" "}


<span

className="
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
font-semibold
"

>

{status}

</span>


</p>




<p>

<strong>
Start Date:
</strong>

{" "}

{
new Date(
rental.startDate
).toLocaleDateString()
}

</p>




<p>

<strong>
End Date:
</strong>

{" "}

{
new Date(
rental.endDate
).toLocaleDateString()
}

</p>



<p>

<strong>
Total:
</strong>

{" "}

${rental.totalAmount}

</p>


</div>








<div>


<h3

className="
font-bold
text-lg
mb-3
"

>

Items

</h3>



<div

className="
space-y-3
"

>


{

rental.items?.map(
(item:any)=>(


<div

key={item.id}

className="
border
rounded-xl
p-4
bg-gray-50
"

>


<p

className="
font-semibold
"

>

{
item.gearItem?.name
}

</p>


<p>

Quantity:

{" "}

{
item.quantity
}

</p>



<p>

Price/day:

{" "}

${item.pricePerDay}

</p>



</div>


)

)


}



</div>


</div>









{

status==="PLACED"

&&


<button

onClick={handleApprove}

disabled={pending}

className="
bg-green-600
text-white
px-6
py-3
rounded-xl
font-semibold
hover:bg-green-700
disabled:opacity-50
"

>


{

pending

?

"Confirming..."

:

"Approve Rental"

}


</button>


}





{

status==="CONFIRMED"

&&


<div

className="
bg-green-100
text-green-700
rounded-xl
p-4
font-semibold
"

>

Rental confirmed. Customer can proceed with payment.

</div>


}





</div>


);


}