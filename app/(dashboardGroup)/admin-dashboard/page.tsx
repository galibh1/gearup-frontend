import UserTable from "./_components/UserTable";
import GearTable from "./_components/GearTable";

import { fetchUsers } from "./_actions/admin.actions";

import {
  getAllGear,
} from "@/services/admin.service";



export default async function AdminDashboard(){


  const usersResult =
    await fetchUsers();



  const gearResult =
    await getAllGear();




  if(!usersResult.success){


    return (

      <div
        className="
        p-10
        text-red-500
        "
      >

        {usersResult.message}

      </div>

    );

  }




  return (

    <main
      className="
      min-h-screen
      bg-gray-50
      p-8
      "
    >



      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >

        Admin Dashboard

      </h1>





      {/* Statistics */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mb-8
        "
      >



        <div
          className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          border
          "
        >

          <p className="text-gray-500">

            Total Users

          </p>


          <h2
            className="
            text-4xl
            font-bold
            mt-2
            "
          >

            {usersResult.data.length}

          </h2>


        </div>






        <div
          className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          border
          "
        >

          <p className="text-gray-500">

            Total Gear

          </p>


          <h2
            className="
            text-4xl
            font-bold
            mt-2
            "
          >

            {
              gearResult.success
              ? gearResult.data.length
              : 0
            }

          </h2>


        </div>






        <div
          className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          border
          "
        >

          <p className="text-gray-500">

            Total Rentals

          </p>


          <h2
            className="
            text-4xl
            font-bold
            mt-2
            "
          >

            0

          </h2>


        </div>



      </div>






      {/* User Management */}

      <UserTable

        users={
          usersResult.data
        }

      />







      {/* Gear Moderation */}

      {
        gearResult.success && (

          <GearTable

            gears={
              gearResult.data
            }

          />

        )
      }






    </main>

  );


}