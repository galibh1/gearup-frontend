import Image from "next/image";
import Link from "next/link";


type GearProps = {

gear:any;

};



export default function GearCard({

gear

}:GearProps){



const image =

gear.imageUrls?.[0] &&
!gear.imageUrls[0].includes("example.com")

?

gear.imageUrls[0]

:

"/placeholder-gear.jpg";





return (


<div

className="
bg-white
rounded-2xl
shadow-md
overflow-hidden
border
"

>


<div

className="
relative
h-56
w-full
"

>


<Image

src={image}

alt={gear.name}

fill

priority

sizes="
(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw
"

className="
object-cover
"

/>


</div>




<div

className="
p-5
"

>



<h2

className="
text-xl
font-bold
"

>

{gear.name}

</h2>



<p

className="
text-gray-500
mt-2
"

>

{gear.provider?.name}

</p>




<div

className="
flex
justify-between
items-center
mt-5
"

>


<span

className="
text-green-600
font-bold
text-xl
"

>

${gear.pricePerDay}/day

</span>




<Link

href={`/gear/${gear.id}`}

className="
bg-black
text-white
px-5
py-2
rounded-xl
"

>

View Details

</Link>



</div>



</div>


</div>



)


}