"use client";


import {useState} from "react";

import {createRental}
from "../_actions/rental.actions";

import DatePicker
from "@/components/ui/date-picker";



export default function RentalForm({

gearId

}:{

gearId:string

}){


const [startDate,setStartDate]
=
useState<Date>();


const [endDate,setEndDate]
=
useState<Date>();


const [loading,setLoading]
=
useState(false);




async function handleRental(){


if(!startDate || !endDate){

alert(
"Please select start and end date"
);

return;

}



try{


setLoading(true);



const result =
await createRental({

startDate:
startDate.toISOString(),


endDate:
endDate.toISOString(),


items:[

{

gearItemId:gearId,

quantity:1

}

]


});



console.log(result);


alert(
"Rental created successfully"
);



}

catch(error:any){

alert(
error.message
);


}

finally{

setLoading(false);

}


}




return(

<div>


<div className="
grid
md:grid-cols-2
gap-5
">


<div>


<label className="
block mb-2
">

Start Date

</label>


<DatePicker

value={startDate}

onChange={setStartDate}

/>


</div>




<div>


<label className="
block mb-2
">

End Date

</label>


<DatePicker

value={endDate}

onChange={setEndDate}

/>


</div>



</div>



<button

onClick={handleRental}

disabled={loading}

className="
mt-8
bg-black
text-white
px-8
py-3
rounded-xl
"

>


{
loading
?
"Creating..."
:
"Rent Now"
}


</button>


</div>


)

}