"use client";

import Link from "next/link";
import { useGear } from "@/hooks/useGear";

type Gear = {
    id: string;
    name: string;
    description?: string;
    pricePerDay: number;
    image?: string;
    imageUrl?: string;
    imageUrls?: string[];
    category?: {
        name?: string;
    };
    categoryName?: string;
    availableStock?: number;
};

export default function HomePage() {
    const {
        data,
        isLoading,
        error,
    } = useGear();

    const gears: Gear[] =
        data?.data || data || [];

    const featuredGear = gears.slice(0, 3);

    const getImage = (gear: Gear) =>
        gear.image ||
        gear.imageUrl ||
        gear.imageUrls?.[0];

    const getCategory = (gear: Gear) =>
        gear.category?.name ||
        gear.categoryName ||
        "Adventure Gear";

    return (
        <main className="min-h-screen bg-[#faf9f5] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-[#faf9f5]/85 backdrop-blur-xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">

                    {/* LOGO */}

                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211f1a] text-sm font-extrabold text-[#faf9f5]">
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


                    {/* NAVIGATION */}

                    <nav className="hidden items-center gap-1 rounded-full bg-[#f2efe4] p-1 md:flex">

                        <Link
                            href="/"
                            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#211f1a] shadow-sm"
                        >
                            Home
                        </Link>

                        <Link
                            href="/gear"
                            className="rounded-full px-5 py-2 text-sm font-semibold text-[#726c60] transition hover:text-[#211f1a]"
                        >
                            Browse Gear
                        </Link>

                        <a
                            href="#how-it-works"
                            className="rounded-full px-5 py-2 text-sm font-semibold text-[#726c60] transition hover:text-[#211f1a]"
                        >
                            How It Works
                        </a>

                    </nav>


                    {/* ACTIONS */}

                    <div className="flex items-center gap-2 sm:gap-4">

                        <Link
                            href="/login"
                            className="hidden px-2 py-2 text-sm font-semibold text-[#726c60] transition hover:text-[#211f1a] sm:block"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-full bg-[#d97757] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#bd5f3f] hover:shadow-lg"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </header>


            {/* ================= HERO ================= */}

            <section className="border-b border-black/[0.08] bg-[#f2efe4]">

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">

                    {/* HERO COPY */}

                    <div>

                        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bd5f3f]">

                            <span className="h-px w-4 bg-[#bd5f3f]" />

                            Sports & Outdoor Gear Rental

                        </div>


                        <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

                            Gear up for

                            <br />

                            the adventure,

                            <br />

                            <span className="text-[#d97757]">
                                not the closet.
                            </span>

                        </h1>


                        <p className="mt-7 max-w-xl text-base leading-7 text-[#726c60] sm:text-lg">

                            Find quality sports and outdoor equipment from
                            GearUp providers. Rent what you need, choose your
                            dates, pay securely, and get ready to explore.

                        </p>


                        {/* SEARCH */}

                        <form
                            action="/gear"
                            className="mt-8 flex max-w-xl rounded-full border border-black/[0.08] bg-white p-1.5 shadow-xl shadow-black/[0.08]"
                        >

                            <input
                                name="search"
                                type="text"
                                placeholder="Search tents, bikes, kayaks..."
                                className="min-w-0 flex-1 rounded-full bg-transparent px-5 text-sm text-[#211f1a] outline-none placeholder:text-[#a49d8c]"
                            />

                            <button
                                type="submit"
                                className="rounded-full bg-[#d97757] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bd5f3f]"
                            >
                                Search
                            </button>

                        </form>


                        {/* QUICK BENEFITS */}

                        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-[#726c60]">

                            <span className="flex items-center gap-2">
                                <span className="text-[#66765a]">●</span>
                                Quality gear
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="text-[#66765a]">●</span>
                                Flexible dates
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="text-[#66765a]">●</span>
                                Secure Stripe payment
                            </span>

                        </div>

                    </div>


                    {/* HERO VISUAL */}

                    <div className="relative hidden min-h-[430px] lg:block">

                        {/* decorative strings */}

                        <div className="absolute left-[25%] top-0 h-16 w-px bg-[#a49d8c]/50" />

                        <div className="absolute right-[25%] top-16 h-16 w-px bg-[#a49d8c]/50" />


                        {/* FIRST TAG */}

                        <div className="absolute left-[8%] top-8 z-20 w-60 rotate-[-5deg] rounded-2xl bg-white px-6 pb-7 pt-6 shadow-2xl">

                            <div className="mx-auto mb-5 h-4 w-4 rounded-full border-2 border-[#a49d8c] bg-[#f2efe4]" />

                            <p className="text-sm font-bold">
                                Trail Adventure Gear
                            </p>

                            <p className="mt-2 font-mono text-sm font-semibold text-[#bd5f3f]">
                                Ready to rent
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#66765a]">

                                <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                                Available now

                            </div>

                        </div>


                        {/* SECOND TAG */}

                        <div className="absolute right-[5%] top-36 z-10 w-60 rotate-[5deg] rounded-2xl bg-white px-6 pb-7 pt-6 shadow-xl">

                            <div className="mx-auto mb-5 h-4 w-4 rounded-full border-2 border-[#a49d8c] bg-[#f2efe4]" />

                            <p className="text-sm font-bold">
                                Sports Equipment
                            </p>

                            <p className="mt-2 font-mono text-sm font-semibold text-[#bd5f3f]">
                                Pay by the day
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#66765a]">

                                <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                                Simple & flexible

                            </div>

                        </div>


                        {/* BACKGROUND CIRCLE */}

                        <div className="absolute inset-x-16 bottom-0 top-20 -z-0 rounded-[3rem] bg-[#dce4d7]" />

                        <div className="absolute bottom-5 left-8 h-32 w-32 rounded-full bg-[#66765a]/20 blur-3xl" />

                        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/70 blur-3xl" />

                    </div>

                </div>

            </section>


            {/* ================= CATEGORIES ================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="mb-7 flex items-end justify-between gap-5">

                    <div>

                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bd5f3f]">
                            Explore
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Browse by category
                        </h2>

                    </div>

                    <Link
                        href="/gear"
                        className="hidden border-b border-[#bd5f3f] pb-1 text-sm font-semibold text-[#bd5f3f] sm:block"
                    >
                        View all gear →
                    </Link>

                </div>


                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                    <Link
                        href="/gear"
                        className="group rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-3xl">
                            ⛺
                        </div>

                        <h3 className="mt-5 font-bold">
                            Camping
                        </h3>

                        <p className="mt-1 text-xs text-[#a49d8c]">
                            Tents & outdoor gear
                        </p>

                    </Link>


                    <Link
                        href="/gear"
                        className="group rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-3xl">
                            🚲
                        </div>

                        <h3 className="mt-5 font-bold">
                            Cycling
                        </h3>

                        <p className="mt-1 text-xs text-[#a49d8c]">
                            Bikes & accessories
                        </p>

                    </Link>


                    <Link
                        href="/gear"
                        className="group rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-3xl">
                            🧗
                        </div>

                        <h3 className="mt-5 font-bold">
                            Adventure
                        </h3>

                        <p className="mt-1 text-xs text-[#a49d8c]">
                            Climbing & hiking
                        </p>

                    </Link>


                    <Link
                        href="/gear"
                        className="group rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-3xl">
                            🛶
                        </div>

                        <h3 className="mt-5 font-bold">
                            Water Sports
                        </h3>

                        <p className="mt-1 text-xs text-[#a49d8c]">
                            Kayaks & more
                        </p>

                    </Link>

                </div>

            </section>


            {/* ================= FEATURED GEAR ================= */}

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>

                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bd5f3f]">
                            Featured collection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Gear for your next adventure
                        </h2>

                        <p className="mt-2 text-sm text-[#726c60]">
                            Real gear from the GearUp marketplace.
                        </p>

                    </div>

                    <Link
                        href="/gear"
                        className="font-semibold text-[#bd5f3f] hover:text-[#a84f32]"
                    >
                        Browse everything →
                    </Link>

                </div>


                {isLoading ? (

                    <div className="mt-9 grid gap-6 md:grid-cols-3">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="h-80 animate-pulse rounded-2xl bg-[#f2efe4]"
                            />

                        ))}

                    </div>

                ) : featuredGear.length === 0 ? (

                    <div className="mt-9 rounded-2xl border border-black/[0.08] bg-white p-12 text-center">

                        <p className="font-semibold">
                            No gear is available yet.
                        </p>

                        <p className="mt-2 text-sm text-[#726c60]">
                            New equipment will appear here when providers add listings.
                        </p>

                    </div>

                ) : (

                    <div className="mt-9 grid gap-6 md:grid-cols-3">

                        {featuredGear.map((gear) => {

                            const image = getImage(gear);
                            const category = getCategory(gear);

                            return (

                                <Link
                                    key={gear.id}
                                    href={`/gear/${gear.id}`}
                                    className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    {/* IMAGE */}

                                    <div className="relative h-56 overflow-hidden bg-[#e8ebe0]">

                                        {image ? (

                                            <img
                                                src={image}
                                                alt={gear.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#dce7dc] to-[#b8c7b7]">

                                                <span className="text-6xl">
                                                    ⛰️
                                                </span>

                                            </div>

                                        )}


                                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#bd5f3f] backdrop-blur">
                                            {category}
                                        </span>


                                        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#66765a] backdrop-blur">

                                            <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                                            Available

                                        </span>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-5">

                                        <h3 className="line-clamp-1 text-lg font-bold">
                                            {gear.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#726c60]">
                                            {gear.description ||
                                                "Quality equipment ready for your next adventure."}
                                        </p>


                                        <div className="mt-5 flex items-center justify-between">

                                            <div>

                                                <span className="font-mono text-xl font-bold text-[#bd5f3f]">
                                                    ${gear.pricePerDay}
                                                </span>

                                                <span className="ml-1 text-xs text-[#a49d8c]">
                                                    / day
                                                </span>

                                            </div>

                                            <span className="text-sm font-semibold text-[#211f1a]">
                                                View →
                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section
                id="how-it-works"
                className="border-y border-black/[0.08] bg-white"
            >

                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                    <div className="max-w-xl">

                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bd5f3f]">
                            Simple process
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            How GearUp works
                        </h2>

                    </div>


                    <div className="mt-12 grid gap-8 md:grid-cols-3">

                        <div className="border-t-2 border-[#211f1a] pt-5">

                            <span className="font-mono text-sm font-semibold text-[#bd5f3f]">
                                01
                            </span>

                            <h3 className="mt-4 text-xl font-bold">
                                Find your gear
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#726c60]">
                                Browse the available equipment and choose
                                something that fits your adventure.
                            </p>

                        </div>


                        <div className="border-t-2 border-[#211f1a] pt-5">

                            <span className="font-mono text-sm font-semibold text-[#bd5f3f]">
                                02
                            </span>

                            <h3 className="mt-4 text-xl font-bold">
                                Choose your dates
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#726c60]">
                                Select your rental start and end dates and
                                create your rental order.
                            </p>

                        </div>


                        <div className="border-t-2 border-[#211f1a] pt-5">

                            <span className="font-mono text-sm font-semibold text-[#bd5f3f]">
                                03
                            </span>

                            <h3 className="mt-4 text-xl font-bold">
                                Pay & adventure
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#726c60]">
                                Complete eligible payments securely through
                                Stripe, then collect your gear and go.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PROVIDER CTA ================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                <div className="relative overflow-hidden rounded-[2rem] bg-[#211f1a] px-8 py-12 text-white sm:px-12">

                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d97757]/20 blur-3xl" />

                    <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                        <div className="max-w-2xl">

                            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d97757]">
                                For gear providers
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Have gear sitting around?
                            </h2>

                            <p className="mt-4 leading-7 text-[#c9c3b7]">
                                List your equipment on GearUp and make it
                                available to people looking for their next
                                adventure.
                            </p>

                        </div>


                        <Link
                            href="/register"
                            className="shrink-0 rounded-full bg-[#d97757] px-7 py-3.5 font-semibold text-white transition hover:bg-[#bd5f3f]"
                        >
                            List Your Gear →
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="border-t border-black/[0.08] bg-[#f2efe4]">

                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-[#726c60] sm:flex-row sm:items-center sm:justify-between lg:px-8">

                    <Link
                        href="/"
                        className="text-lg font-bold text-[#211f1a]"
                    >
                        Gear<span className="text-[#d97757]">Up</span>
                    </Link>


                    <div className="flex flex-wrap gap-5">

                        <Link
                            href="/gear"
                            className="transition hover:text-[#211f1a]"
                        >
                            Browse Gear
                        </Link>

                        <Link
                            href="/login"
                            className="transition hover:text-[#211f1a]"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/register"
                            className="transition hover:text-[#211f1a]"
                        >
                            Register
                        </Link>

                    </div>


                    <p className="font-mono text-[10px] uppercase tracking-[0.08em]">
                        GEARUP © 2026
                    </p>

                </div>

            </footer>

        </main>
    );
}
