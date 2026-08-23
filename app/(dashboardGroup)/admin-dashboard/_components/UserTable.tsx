"use client";


type User = {

id:string;
name:string;
email:string;
role:string;
activeStatus:string;

}



export default function UserTable({
users
}:{
users:User[]
}){


return (

<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
mb-5
">
Users
</h2>



<table className="
w-full
text-left
">


<thead>

<tr className="
border-b
">

<th className="p-3">
Name
</th>

<th>
Email
</th>

<th>
Role
</th>

<th>
Status
</th>

</tr>

</thead>



<tbody>


{
users.map((user)=>(


<tr
key={user.id}
className="
border-b
"
>


<td className="p-3">
{user.name}
</td>


<td>
{user.email}
</td>


<td>
{user.role}
</td>


<td>

<span className="
rounded-full
bg-green-100
px-3
py-1
text-sm
">

{user.activeStatus}

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