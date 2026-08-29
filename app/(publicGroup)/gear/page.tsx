import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getAllGear } from "../_actions/gear.actions";
import GearBrowser from "../_components/GearBrowser";

export const dynamic = "force-dynamic";


type Gear = {
    id: string;
    [key: string]: unknown;
};


export default async function GearPage() {

    const gears =
        await getAllGear();


    return (

        <main
            className="
                min-h-screen
                bg-[#f2efe4]
                text-[#211f1a]
            "
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header
                className="
                    sticky
                    top-0
                    z-50
                    border-b
                    border-black/[0.07]
                    bg-[#faf9f5]/95
                    backdrop-blur-md
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-[76px]
                        max-w-7xl
                        items-center
                        justify-between
                        px-5
                        sm:px-6
                        lg:px-8
                    "
                >

                    {/* Logo */}

                    <Link
                        href="/dashboard"
                        className="
                            flex
                            items-center
                            gap-3
                        "
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

                            <div
                                className="
                                    text-lg
                                    font-bold
                                    tracking-tight
                                "
                            >
                                Gear
                                <span className="text-[#d97757]">
                                    Up
                                </span>
                            </div>


                            <div
                                className="
                                    hidden
                                    text-[10px]
                                    uppercase
                                    tracking-[0.12em]
                                    text-[#a49d8c]
                                    sm:block
                                "
                            >
                                Rent · Explore · Repeat
                            </div>

                        </div>

                    </Link>


                    {/* Navigation */}

                    <nav
                        className="
                            hidden
                            items-center
                            gap-1
                            rounded-full
                            bg-[#eeeade]
                            p-1
                            md:flex
                        "
                    >

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


            {/* =====================================================
                MAIN
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                "
            >

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

                            <ArrowLeft
                                className="h-4 w-4"
                            />

                            Back to Dashboard

                        </Link>

                    </div>


                    {/* =================================================
                        INTRO
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

                            <span
                                className="
                                    h-px
                                    w-6
                                    bg-[#bd5f3f]
                                "
                            />

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
                            Find quality sports and outdoor
                            equipment from GearUp providers
                            and choose what fits your next
                            adventure.
                        </p>

                    </div>


                    {/* =================================================
                        SEARCH + FILTERS + RESULTS
                    ================================================= */}

                    <GearBrowser
                        gears={
                            gears as Gear[]
                        }
                    />

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ===================================================== */}

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

                        <div
                            className="
                                text-lg
                                font-bold
                            "
                        >
                            Gear
                            <span className="text-[#d97757]">
                                Up
                            </span>
                        </div>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-[#a49d8c]
                            "
                        >
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
                            className="
                                transition
                                hover:text-[#bd5f3f]
                            "
                        >
                            Dashboard
                        </Link>


                        <Link
                            href="/gear"
                            className="
                                transition
                                hover:text-[#bd5f3f]
                            "
                        >
                            Browse Gear
                        </Link>


                        <Link
                            href="/dashboard/rentals"
                            className="
                                transition
                                hover:text-[#bd5f3f]
                            "
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