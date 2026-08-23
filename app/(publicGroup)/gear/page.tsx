import {

getAllGear

} from "../_actions/gear.actions";


import GearCard from "../_components/GearCard";



export default async function GearPage(){


const gears = await getAllGear();




return (

<div

className="
max-w-7xl
mx-auto
p-10
"

>



<h1

className="
text-5xl
font-bold
mb-10
"

>

Explore Gear

</h1>




<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>


{

gears.map(

(gear:any)=>(


<GearCard

key={gear.id}

gear={gear}

/>


)

)

}



</div>



</div>


)


}