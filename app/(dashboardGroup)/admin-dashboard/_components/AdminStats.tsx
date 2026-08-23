type AdminStatsProps = {

    stats:{
        users:number;
        gear:number;
        rentals:number;
    }

}



export default function AdminStats({

    stats

}:AdminStatsProps){



const cards = [

    {
        title:"Total Users",
        value:stats.users
    },

    {
        title:"Total Gear",
        value:stats.gear
    },


    {
        title:"Total Rentals",
        value:stats.rentals
    },

];




return (

<div
className="
grid
md:grid-cols-3
gap-6
mb-8
"
>


{
cards.map((card)=>(


<div
key={card.title}
className="
rounded-2xl
bg-white
border
p-6
shadow-sm
"
>


<p
className="
text-gray-500
"
>
{card.title}
</p>



<h2
className="
text-4xl
font-bold
mt-3
"
>

{card.value}

</h2>



</div>


))
}



</div>

);


}