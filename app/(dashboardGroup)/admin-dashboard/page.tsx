import {
fetchUsers
}
from "./_actions/admin.actions";


import UserTable
from "./_components/UserTable";



export default async function AdminDashboard(){


const result =
await fetchUsers();



if(!result.success){

return (

<div className="p-10 text-red-500">

{result.message}

</div>

);

}



return (

<main className="
min-h-screen
bg-gray-50
p-8
">


<h1 className="
text-4xl
font-bold
mb-8
">

Admin Dashboard

</h1>




<div className="
grid
md:grid-cols-3
gap-6
mb-8
">


<div className="
rounded-2xl
bg-white
p-6
shadow
">

<p className="text-gray-500">
Total Users
</p>


<h2 className="
text-4xl
font-bold
">

{result.data.length}

</h2>


</div>


</div>




<UserTable
users={result.data}
/>



</main>

);


}