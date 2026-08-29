import {
    fetchProviderOrders,
    fetchProviderGear,
} from "./_actions/provider.actions";

import ProviderNavbar from "./_components/ProviderNavbar";
import ProviderRentalCard from "./_components/ProviderRentalCard";
import ProviderGearSection from "./_components/ProviderGearSection";

export default async function ProviderDashboard() {
    const [ordersResult, gearResult] = await Promise.all([
        fetchProviderOrders(),
        fetchProviderGear(),
    ]);

    const rentals = ordersResult.data || [];
    const gear = gearResult.data || [];

    const pendingRequests = rentals.filter(
        (rental: any) => rental.status === "PLACED"
    ).length;

    const confirmedRequests = rentals.filter(
        (rental: any) => rental.status === "CONFIRMED"
    ).length;

    return (
        <div className="min-h-screen bg-[#f5f1e8] text-[#24231f]">
            <ProviderNavbar />

            <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:px-10">

                {/* HERO */}
                <section className="mb-12">
                    <div className="rounded-[32px] border border-[#e6dfd2] bg-[#f8f5ed] px-7 py-9 shadow-sm md:px-10 md:py-11">

                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                            <div className="max-w-3xl">

                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-px w-6 bg-[#dc7755]" />

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dc7755]">
                                        Your GearUp
                                    </p>
                                </div>

                                <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                                    Manage your{" "}
                                    <span className="text-[#dc7755]">
                                        GearUp.
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-2xl text-base leading-7 text-[#777267] md:text-lg">
                                    Keep track of customer rental requests,
                                    manage your equipment, and keep your
                                    marketplace running smoothly.
                                </p>

                            </div>

                            <a
                                href="#my-gear"
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-[#dc7755]
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-sm
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-[#cf6c4b]
                                "
                            >
                                Manage My Gear
                                <span className="text-lg">→</span>
                            </a>

                        </div>

                    </div>
                </section>


                {/* OVERVIEW */}
                <section className="mb-12">

                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dc7755]">
                            Overview
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                            Your provider activity
                        </h2>
                    </div>


                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {/* TOTAL REQUESTS */}
                        <div className="
                            rounded-[24px]
                            border
                            border-[#e5ded2]
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <div className="
                                mb-8
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#eeeadf]
                                text-xl
                            ">
                                ↗
                            </div>

                            <p className="text-sm font-medium text-[#8b8579]">
                                Rental Requests
                            </p>

                            <p className="mt-1 text-4xl font-black">
                                {rentals.length}
                            </p>

                            <p className="mt-2 text-sm text-[#9a9489]">
                                Total customer requests
                            </p>
                        </div>


                        {/* PENDING */}
                        <div className="
                            rounded-[24px]
                            border
                            border-[#e5ded2]
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <div className="
                                mb-8
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#f7e8c5]
                                text-lg
                            ">
                                !
                            </div>

                            <p className="text-sm font-medium text-[#8b8579]">
                                Awaiting Action
                            </p>

                            <p className="mt-1 text-4xl font-black">
                                {pendingRequests}
                            </p>

                            <p className="mt-2 text-sm text-[#9a9489]">
                                Requests waiting for you
                            </p>
                        </div>


                        {/* CONFIRMED */}
                        <div className="
                            rounded-[24px]
                            border
                            border-[#e5ded2]
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <div className="
                                mb-8
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#e2eadc]
                                text-lg
                            ">
                                ✓
                            </div>

                            <p className="text-sm font-medium text-[#8b8579]">
                                Confirmed
                            </p>

                            <p className="mt-1 text-4xl font-black">
                                {confirmedRequests}
                            </p>

                            <p className="mt-2 text-sm text-[#9a9489]">
                                Active confirmed rentals
                            </p>
                        </div>


                        {/* GEAR */}
                        <div className="
                            rounded-[24px]
                            border
                            border-[#e5ded2]
                            bg-white
                            p-6
                            shadow-sm
                        ">
                            <div className="
                                mb-8
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#f5ddd3]
                                text-lg
                                text-[#dc7755]
                            ">
                                G
                            </div>

                            <p className="text-sm font-medium text-[#8b8579]">
                                My Gear
                            </p>

                            <p className="mt-1 text-4xl font-black">
                                {gear.length}
                            </p>

                            <p className="mt-2 text-sm text-[#9a9489]">
                                Equipment in your inventory
                            </p>
                        </div>

                    </div>
                </section>


                {/* RENTAL REQUESTS */}
                <section
                    id="rental-requests"
                    className="mb-14 scroll-mt-28"
                >

                    <div className="
                        mb-6
                        flex
                        flex-col
                        gap-4
                        md:flex-row
                        md:items-end
                        md:justify-between
                    ">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dc7755]">
                                Requests
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                                Rental requests
                            </h2>

                            <p className="mt-2 text-[#777267]">
                                Review customer bookings and manage
                                their rental lifecycle.
                            </p>

                        </div>


                        <div className="
                            w-fit
                            rounded-full
                            border
                            border-[#d9e3d2]
                            bg-[#e7eee2]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#617258]
                        ">
                            {rentals.length}{" "}
                            {rentals.length === 1
                                ? "request"
                                : "requests"}
                        </div>

                    </div>


                    {rentals.length === 0 ? (

                        <div className="
                            rounded-[28px]
                            border
                            border-[#e5ded2]
                            bg-white
                            px-6
                            py-16
                            text-center
                            shadow-sm
                        ">

                            <div className="
                                mx-auto
                                mb-5
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#eeeadf]
                                text-2xl
                            ">
                                ✓
                            </div>

                            <h3 className="text-xl font-black">
                                No rental requests
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#888277]">
                                You don't have any customer rental
                                requests at the moment.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {rentals.map((rental: any) => (
                                <ProviderRentalCard
                                    key={rental.id}
                                    rental={rental}
                                />
                            ))}

                        </div>

                    )}

                </section>


                {/* MY GEAR */}
                <section
                    id="my-gear"
                    className="scroll-mt-28"
                >

                    <ProviderGearSection
                        initialGear={gear}
                    />

                </section>


                {/* FOOTER NOTE */}
                <section className="mt-12">

                    <div className="
                        rounded-[24px]
                        border
                        border-[#d9e3d2]
                        bg-[#edf2e9]
                        px-6
                        py-5
                    ">

                        <div className="flex items-start gap-4">

                            <div className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#dce7d7]
                                text-[#617258]
                            ">
                                ✓
                            </div>

                            <div>
                                <p className="font-bold text-[#52634b]">
                                    GearUp Provider Portal
                                </p>

                                <p className="mt-1 text-sm leading-6 text-[#73806d]">
                                    Keep your equipment up to date and
                                    respond to rental requests promptly.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}