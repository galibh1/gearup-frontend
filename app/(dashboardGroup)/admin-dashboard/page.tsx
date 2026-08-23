import UserTable from "./_components/UserTable";
import GearTable from "./_components/GearTable";
import RentalTable from "./_components/RentalTable";


import { fetchUsers } from "./_actions/admin.actions";


import {
  getAllGear,
  getAllRentals,
} from "@/services/admin.service";




export default async function AdminDashboard(){



  const usersResult =
    await fetchUsers();




  const gearResult =
    await getAllGear();




  const rentalResult =
    await getAllRentals();






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






      {/* Statistics Cards */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mb-8
        "
      >




        {/* Users */}

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

            {
              usersResult.data.length
            }

          </h2>


        </div>







        {/* Gear */}

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
              gearResult.data.length
            }

          </h2>


        </div>







        {/* Rentals */}

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

            {
              rentalResult.data.length
            }

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

      <GearTable

        gears={
          gearResult.data
        }

      />









      {/* Rental Moderation */}

      <RentalTable

        rentals={
          rentalResult.data
        }

      />





    </main>

  );


}