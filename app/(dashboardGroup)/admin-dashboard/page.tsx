import UserTable from "./_components/UserTable";
import GearTable from "./_components/GearTable";
import RentalTable from "./_components/RentalTable";

import {
    fetchUsers,
    fetchAdminGear,
    fetchAdminRentals,
} from "./_actions/admin.actions";


type Result<T> = {
    success: boolean;
    data: T[];
    message?: string;
};


export default async function AdminDashboard() {

    const [
        usersResult,
        gearResult,
        rentalResult,
    ] = await Promise.all([

        fetchUsers(),

        fetchAdminGear(),

        fetchAdminRentals(),

    ]);


    const users =
        usersResult.success
            ? usersResult.data ?? []
            : [];


    const gears =
        gearResult.success
            ? gearResult.data ?? []
            : [];


    const rentals =
        rentalResult.success
            ? rentalResult.data ?? []
            : [];


    return (

        <main
            className="
            min-h-screen
            bg-gray-50
            p-4
            sm:p-6
            lg:p-8
            "
        >

            <div className="mx-auto max-w-7xl">


                {/* Header */}

                <div
                    className="
                    mb-8
                    flex
                    flex-col
                    gap-2
                    "
                >

                    <h1
                        className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        sm:text-4xl
                        "
                    >
                        Admin Dashboard
                    </h1>


                    <p className="text-gray-500">

                        Manage users, gear listings,
                        and rental orders.

                    </p>

                </div>



                {/* Statistics */}

                <div
                    className="
                    mb-8
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    "
                >


                    <div
                        className="
                        rounded-2xl
                        border
                        bg-white
                        p-6
                        shadow-sm
                        "
                    >

                        <p
                            className="
                            text-sm
                            font-medium
                            text-gray-500
                            "
                        >
                            Total Users
                        </p>


                        <p
                            className="
                            mt-2
                            text-4xl
                            font-bold
                            text-gray-900
                            "
                        >
                            {users.length}
                        </p>


                        {!usersResult.success && (

                            <p
                                className="
                                mt-2
                                text-sm
                                text-red-500
                                "
                            >
                                {usersResult.message ||
                                    "User data unavailable"}
                            </p>

                        )}

                    </div>



                    <div
                        className="
                        rounded-2xl
                        border
                        bg-white
                        p-6
                        shadow-sm
                        "
                    >

                        <p
                            className="
                            text-sm
                            font-medium
                            text-gray-500
                            "
                        >
                            Total Gear
                        </p>


                        <p
                            className="
                            mt-2
                            text-4xl
                            font-bold
                            text-gray-900
                            "
                        >
                            {gears.length}
                        </p>


                        {!gearResult.success && (

                            <p
                                className="
                                mt-2
                                text-sm
                                text-red-500
                                "
                            >
                                {gearResult.message ||
                                    "Gear data unavailable"}
                            </p>

                        )}

                    </div>



                    <div
                        className="
                        rounded-2xl
                        border
                        bg-white
                        p-6
                        shadow-sm
                        "
                    >

                        <p
                            className="
                            text-sm
                            font-medium
                            text-gray-500
                            "
                        >
                            Total Rentals
                        </p>


                        <p
                            className="
                            mt-2
                            text-4xl
                            font-bold
                            text-gray-900
                            "
                        >
                            {rentals.length}
                        </p>


                        {!rentalResult.success && (

                            <p
                                className="
                                mt-2
                                text-sm
                                text-red-500
                                "
                            >
                                {rentalResult.message ||
                                    "Rental data unavailable"}
                            </p>

                        )}

                    </div>


                </div>



                {/* User Management */}

                <UserTable users={users} />



                {/* Gear Management */}

                <GearTable gears={gears} />



                {/* Rental Management */}

                <RentalTable rentals={rentals} />


            </div>

        </main>

    );

}