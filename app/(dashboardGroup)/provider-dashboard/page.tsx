import {
    fetchProviderOrders,
    fetchProviderGear,
} from "./_actions/provider.actions";


import ProviderNavbar
    from "./_components/ProviderNavbar";


import ProviderRentalCard
    from "./_components/ProviderRentalCard";


import ProviderGearSection
    from "./_components/ProviderGearSection";


export default async function ProviderDashboard() {

    const [
        ordersResult,
        gearResult,
    ] = await Promise.all([

        fetchProviderOrders(),

        fetchProviderGear(),

    ]);


    const rentals =
        ordersResult.data || [];


    const gear =
        gearResult.data || [];


    return (

        <div className="
            min-h-screen
            bg-gray-50
        ">

            <ProviderNavbar />


            <main className="
                max-w-7xl
                mx-auto
                px-6
                md:px-10
                py-10
            ">


                {/* Page Header */}

                <section className="
                    mb-10
                ">

                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-4
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-semibold
                                text-blue-600
                                uppercase
                                tracking-wide
                                mb-2
                            ">

                                Provider Portal

                            </p>


                            <h1 className="
                                text-4xl
                                md:text-5xl
                                font-extrabold
                                tracking-tight
                            ">

                                Provider Dashboard

                            </h1>


                            <p className="
                                mt-3
                                text-gray-600
                                text-lg
                            ">

                                Manage your rental requests
                                and equipment.

                            </p>

                        </div>


                        <div className="
                            flex
                            gap-3
                        ">

                            <div className="
                                bg-white
                                border
                                rounded-xl
                                px-5
                                py-3
                                shadow-sm
                            ">

                                <p className="
                                    text-xs
                                    text-gray-500
                                    font-medium
                                ">

                                    Rental Requests

                                </p>

                                <p className="
                                    text-2xl
                                    font-bold
                                ">

                                    {rentals.length}

                                </p>

                            </div>


                            <div className="
                                bg-white
                                border
                                rounded-xl
                                px-5
                                py-3
                                shadow-sm
                            ">

                                <p className="
                                    text-xs
                                    text-gray-500
                                    font-medium
                                ">

                                    My Gear

                                </p>

                                <p className="
                                    text-2xl
                                    font-bold
                                ">

                                    {gear.length}

                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Rental Requests */}

                <section
                    id="rental-requests"
                    className="
                        scroll-mt-28
                    "
                >

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">

                        <div>

                            <h2 className="
                                text-3xl
                                font-bold
                            ">

                                Rental Requests

                            </h2>


                            <p className="
                                text-gray-600
                                mt-1
                            ">

                                Review and manage customer
                                rental requests.

                            </p>

                        </div>


                        <span className="
                            bg-blue-100
                            text-blue-700
                            px-4
                            py-2
                            rounded-full
                            font-semibold
                        ">

                            {rentals.length} requests

                        </span>

                    </div>


                    <div className="
                        grid
                        gap-6
                    ">

                        {rentals.length === 0 ? (

                            <div className="
                                bg-white
                                border
                                rounded-2xl
                                p-10
                                text-center
                            ">

                                <p className="
                                    text-gray-600
                                ">

                                    No rental requests
                                    available.

                                </p>

                            </div>

                        ) : (

                            rentals.map(
                                (rental: any) => (

                                    <ProviderRentalCard
                                        key={rental.id}
                                        rental={rental}
                                    />

                                )
                            )

                        )}

                    </div>

                </section>


                {/* My Gear */}

                <section
                    id="my-gear"
                    className="
                        scroll-mt-28
                    "
                >

                    <ProviderGearSection
                        initialGear={gear}
                    />

                </section>

            </main>

        </div>

    );

}