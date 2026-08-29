import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getAllGear } from "../_actions/gear.actions";
import GearCard from "../_components/GearCard";

export const dynamic = "force-dynamic";

type Gear = {
    id: string;
    [key: string]: unknown;
};

export default async function GearPage() {
    const gears = await getAllGear();

    return (
        <main className="min-h-screen bg-[#f2efe4] text-[#211f1a]">

            {/* =========================================================
                HEADER
            ========================================================= */}

            <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#faf9f5]/95 backdrop-blur-md">

                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                    {/* Logo */}

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#211f1a]
                                text-sm
                                font-extrabold
                                text-[#faf9f5]
                            "
                        >
                            G
                        </div>

                        <div>
                            <div className="text-lg font-bold tracking-tight">
                                Gear<span className="text-[#d97757]">Up</span>
                            </div>

                            <div className="hidden text-[10px] uppercase tracking-[0.12em] text-[#a49d8c] sm:block">
                                Rent · Explore · Repeat
                            </div>
                        </div>
                    </Link>


                    {/* Navigation */}

                    <nav className="hidden items-center gap-1 rounded-full bg-[#eeeade] p-1 md:flex">

                        <Link
                            href="/dashboard"
                            className="
                                rounded-full
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#726c60]
                                transition
                                hover:bg-white
                                hover:text-[#211f1a]
                            "
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/gear"
                            className="
                                rounded-full
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-[#211f1a]
                                shadow-sm
                            "
                        >
                            Browse Gear
                        </Link>

                        <Link
                            href="/dashboard/rentals"
                            className="
                                rounded-full
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#726c60]
                                transition
                                hover:bg-white
                                hover:text-[#211f1a]
                            "
                        >
                            My Rentals
                        </Link>

                    </nav>


                    {/* Account */}

                    <Link
                        href="/dashboard"
                        className="
                            hidden
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-black/[0.08]
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-[#514d45]
                            shadow-sm
                            transition
                            hover:border-[#d97757]
                            hover:text-[#bd5f3f]
                            sm:flex
                        "
                    >
                        <span
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-[#dce4d7]
                                text-xs
                                font-bold
                                text-[#66765a]
                            "
                        >
                            G
                        </span>

                        My Account
                    </Link>

                </div>

            </header>


            {/* =========================================================
                MAIN
            ========================================================= */}

            <section className="relative overflow-hidden">

                {/* Decorative background */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-40
                        top-20
                        h-96
                        w-96
                        rounded-full
                        bg-[#dce4d7]/70
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-40
                        top-80
                        h-96
                        w-96
                        rounded-full
                        bg-[#d97757]/10
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                        px-5
                        py-8
                        sm:px-6
                        lg:px-8
                        lg:py-10
                    "
                >

                    {/* =================================================
                        BACK BUTTON
                    ================================================= */}

                    <div className="mb-8">

                        <Link
                            href="/dashboard"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-black/[0.08]
                                bg-[#faf9f5]
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-[#514d45]
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-x-0.5
                                hover:border-[#d97757]
                                hover:text-[#bd5f3f]
                                hover:shadow-md
                            "
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to Dashboard
                        </Link>

                    </div>


                    {/* =================================================
                        PAGE INTRO
                    ================================================= */}

                    <div className="max-w-3xl">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                font-mono
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-[#bd5f3f]
                            "
                        >

                            <span className="h-px w-6 bg-[#bd5f3f]" />

                            GearUp Marketplace

                        </div>


                        <h1
                            className="
                                mt-4
                                text-4xl
                                font-extrabold
                                tracking-[-0.045em]
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            Explore Gear
                        </h1>


                        <p
                            className="
                                mt-4
                                max-w-2xl
                                text-base
                                leading-7
                                text-[#726c60]
                                sm:text-lg
                            "
                        >
                            Find quality sports and outdoor equipment from
                            GearUp providers and choose what fits your next
                            adventure.
                        </p>

                    </div>


                    {/* =================================================
                        MARKETPLACE HEADING
                    ================================================= */}

                    <div
                        className="
                            mt-12
                            flex
                            items-end
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-[#bd5f3f]
                                "
                            >
                                Available equipment
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-2xl
                                    font-extrabold
                                    tracking-[-0.03em]
                                    sm:text-3xl
                                "
                            >
                                Find your next adventure
                            </h2>

                        </div>


                        {/* Gear count */}

                        <div
                            className="
                                hidden
                                rounded-full
                                border
                                border-black/[0.07]
                                bg-[#faf9f5]
                                px-4
                                py-2
                                text-xs
                                font-medium
                                text-[#726c60]
                                sm:block
                            "
                        >
                            {gears.length}{" "}
                            {gears.length === 1 ? "item" : "items"} available
                        </div>

                    </div>


                    {/* =================================================
                        GEAR GRID
                    ================================================= */}

                    {gears.length > 0 ? (

                        <div
                            className="
                                mt-7
                                grid
                                grid-cols-1
                                gap-6
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >

                            {gears.map((gear: Gear) => (

                                <GearCard
                                    key={gear.id}
                                    gear={gear}
                                />

                            ))}

                        </div>

                    ) : (

                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div
                            className="
                                mt-7
                                rounded-[2rem]
                                border
                                border-black/[0.07]
                                bg-[#faf9f5]
                                px-6
                                py-20
                                text-center
                                shadow-[0_15px_45px_rgba(33,31,26,0.06)]
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#dce4d7]
                                    text-xl
                                    font-bold
                                    text-[#66765a]
                                "
                            >
                                G
                            </div>


                            <h3 className="mt-5 text-xl font-bold">
                                No gear available
                            </h3>


                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-[#726c60]
                                "
                            >
                                There is currently no equipment available in
                                the marketplace. Please check again later.
                            </p>


                            <Link
                                href="/dashboard"
                                className="
                                    mt-6
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-[#d97757]
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[#bd5f3f]
                                "
                            >
                                <ArrowLeft className="h-4 w-4" />

                                Back to Dashboard
                            </Link>

                        </div>

                    )}

                </div>

            </section>


            {/* =========================================================
                FOOTER
            ========================================================= */}

            <footer
                className="
                    mt-12
                    border-t
                    border-black/[0.07]
                    bg-[#faf9f5]
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        max-w-7xl
                        flex-col
                        gap-5
                        px-5
                        py-7
                        sm:px-6
                        md:flex-row
                        md:items-center
                        md:justify-between
                        lg:px-8
                    "
                >

                    <div>

                        <div className="text-lg font-bold">
                            Gear<span className="text-[#d97757]">Up</span>
                        </div>

                        <p className="mt-1 text-xs text-[#a49d8c]">
                            Rent · Explore · Repeat
                        </p>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-5
                            text-sm
                            text-[#726c60]
                        "
                    >

                        <Link
                            href="/dashboard"
                            className="transition hover:text-[#bd5f3f]"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/gear"
                            className="transition hover:text-[#bd5f3f]"
                        >
                            Browse Gear
                        </Link>

                        <Link
                            href="/dashboard/rentals"
                            className="transition hover:text-[#bd5f3f]"
                        >
                            My Rentals
                        </Link>

                    </div>


                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.12em]
                            text-[#a49d8c]
                        "
                    >
                        GearUp © 2026
                    </p>

                </div>

            </footer>

        </main>
    );
}