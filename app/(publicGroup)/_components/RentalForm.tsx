"use client";


import {useState} from "react";
import {useRouter} from "next/navigation";

import {createRental}
from "../_actions/rental.actions";

import DatePicker
from "@/components/ui/date-picker";



export default function RentalForm({

gearId

}:{

gearId:string

}){


const router = useRouter();



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




alert(
"Rental created successfully"
);



router.push(
"/dashboard/rentals"
);



}


catch(error:any){


alert(
error.message ||
"Something went wrong"
);


}



finally{


setLoading(false);


}



}




return (

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
hover:bg-gray-800
transition
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

);


}