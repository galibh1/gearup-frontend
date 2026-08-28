import Link from "next/link";

export default function CustomerDashboard() {
    return (
        <main className="min-h-screen bg-[#f2efe4] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="border-b border-black/[0.08] bg-[#faf9f5]">

                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

                    {/* Logo */}

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


                    {/* Navigation */}

                    <nav className="hidden items-center gap-1 rounded-full bg-[#f2efe4] p-1 md:flex">

                        <Link
                            href="/dashboard"
                            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#211f1a] shadow-sm"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/gear"
                            className="rounded-full px-5 py-2 text-sm font-semibold text-[#726c60] transition hover:text-[#211f1a]"
                        >
                            Browse Gear
                        </Link>

                        <Link
                            href="/dashboard/rentals"
                            className="rounded-full px-5 py-2 text-sm font-semibold text-[#726c60] transition hover:text-[#211f1a]"
                        >
                            My Rentals
                        </Link>

                    </nav>


                    {/* Account */}

                    <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-3 py-2 transition hover:border-[#d97757]"
                    >

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce4d7] text-sm font-bold text-[#66765a]">
                            G
                        </div>

                        <span className="hidden text-sm font-semibold sm:block">
                            My Account
                        </span>

                    </Link>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <section className="relative overflow-hidden">

                {/* Background decoration */}

                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#dce4d7]/70 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 top-72 h-96 w-96 rounded-full bg-[#d97757]/10 blur-3xl" />


                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

                    {/* ================= WELCOME ================= */}

                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

                        <div>

                            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#bd5f3f]">

                                <span className="h-px w-5 bg-[#bd5f3f]" />

                                Your GearUp

                            </div>


                            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                                Ready for your next adventure?
                            </h1>


                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#726c60]">
                                Manage your rentals, discover new equipment,
                                and get everything ready for your next trip.
                            </p>

                        </div>


                        <Link
                            href="/gear"
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#d97757]
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-[#bd5f3f]
                                hover:shadow-lg
                            "
                        >
                            Browse Gear →
                        </Link>

                    </div>


                    {/* ================= QUICK ACCESS ================= */}

                    <div className="mt-14">

                        <div className="mb-6">

                            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bd5f3f]">
                                Quick access
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                Manage your GearUp
                            </h2>

                        </div>


                        <div className="grid gap-5 md:grid-cols-3">

                            {/* ================= MY RENTALS ================= */}

                            <Link
                                href="/dashboard/rentals"
                                className="
                                    group
                                    rounded-[1.5rem]
                                    border
                                    border-black/[0.08]
                                    bg-[#faf9f5]
                                    p-7
                                    shadow-sm
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#211f1a] text-lg text-white">
                                        ↗
                                    </div>

                                    <span className="text-xl text-[#a49d8c] transition group-hover:translate-x-1 group-hover:text-[#d97757]">
                                        →
                                    </span>

                                </div>


                                <h3 className="mt-7 text-xl font-bold">
                                    My Rentals
                                </h3>


                                <p className="mt-2 text-sm leading-6 text-[#726c60]">
                                    View your active and previous rental
                                    orders, dates, and payment status.
                                </p>


                                <p className="mt-5 text-sm font-semibold text-[#bd5f3f]">
                                    View rentals →
                                </p>

                            </Link>


                            {/* ================= DISCOVER GEAR ================= */}

                            <Link
                                href="/gear"
                                className="
                                    group
                                    rounded-[1.5rem]
                                    border
                                    border-black/[0.08]
                                    bg-[#faf9f5]
                                    p-7
                                    shadow-sm
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dce4d7] text-lg text-[#66765a]">
                                        +
                                    </div>

                                    <span className="text-xl text-[#a49d8c] transition group-hover:translate-x-1 group-hover:text-[#d97757]">
                                        →
                                    </span>

                                </div>


                                <h3 className="mt-7 text-xl font-bold">
                                    Discover Gear
                                </h3>


                                <p className="mt-2 text-sm leading-6 text-[#726c60]">
                                    Explore tents, bikes, kayaks, and other
                                    equipment available from providers.
                                </p>


                                <p className="mt-5 text-sm font-semibold text-[#bd5f3f]">
                                    Browse equipment →
                                </p>

                            </Link>


                            {/* ================= PROFILE ================= */}

                            <Link
                                href="/dashboard/profile"
                                className="
                                    group
                                    rounded-[1.5rem]
                                    border
                                    border-black/[0.08]
                                    bg-[#faf9f5]
                                    p-7
                                    shadow-sm
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3ddd4] text-lg text-[#bd5f3f]">
                                        G
                                    </div>

                                    <span className="text-xl text-[#a49d8c] transition group-hover:translate-x-1 group-hover:text-[#d97757]">
                                        →
                                    </span>

                                </div>


                                <h3 className="mt-7 text-xl font-bold">
                                    Your Profile
                                </h3>


                                <p className="mt-2 text-sm leading-6 text-[#726c60]">
                                    Manage your account information and
                                    personal details.
                                </p>


                                <p className="mt-5 text-sm font-semibold text-[#bd5f3f]">
                                    Manage profile →
                                </p>

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}