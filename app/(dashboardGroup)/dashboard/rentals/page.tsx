import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";

type RentalItem = {
    quantity?: number;

    gearItem?: {
        name?: string;
    };

    gear?: {
        name?: string;
    };
};

type Rental = {
    id: string;
    status?: string;
    startDate: string;
    endDate: string;
    totalAmount?: string | number;
    items?: RentalItem[];
};

type RentalsResult = {
    success: boolean;
    data: Rental[];
    message?: string;
};

async function getRentals(): Promise<RentalsResult> {
    try {
        const cookieStore = await cookies();

        const response = await fetch(
            `${API_URL}/api/rentals`,
            {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                data: [],
                message:
                    result?.message ||
                    "Failed to load rentals.",
            };
        }

        return {
            success: true,
            data: Array.isArray(result?.data)
                ? result.data
                : [],
        };
    } catch (error: unknown) {
        console.error(
            "Rental fetch error:",
            error
        );

        return {
            success: false,
            data: [],
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to load your rentals.",
        };
    }
}

function getStatusStyle(status: string) {
    switch (status) {
        case "PLACED":
            return {
                wrapper:
                    "bg-[#fff3c4] text-[#9a6a00]",
                dot: "bg-[#d69e00]",
            };

        case "CONFIRMED":
            return {
                wrapper:
                    "bg-[#e4edff] text-[#315b9f]",
                dot: "bg-[#4d79c7]",
            };

        case "PAID":
            return {
                wrapper:
                    "bg-[#e9e4ff] text-[#6652a5]",
                dot: "bg-[#806bc5]",
            };

        case "PICKED_UP":
            return {
                wrapper:
                    "bg-[#eee3ff] text-[#7650a6]",
                dot: "bg-[#9363c7]",
            };

        case "RETURNED":
            return {
                wrapper:
                    "bg-[#dfead8] text-[#56714a]",
                dot: "bg-[#6c875e]",
            };

        case "CANCELLED":
            return {
                wrapper:
                    "bg-[#fbe0da] text-[#a34e3b]",
                dot: "bg-[#c9654e]",
            };

        default:
            return {
                wrapper:
                    "bg-[#eeeae1] text-[#6d675b]",
                dot: "bg-[#898274]",
            };
    }
}

function getGearName(rental: Rental) {
    const firstItem = rental.items?.[0];

    return (
        firstItem?.gearItem?.name ||
        firstItem?.gear?.name ||
        "Gear rental"
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );
}

export default async function RentalsPage() {
    const result = await getRentals();

    return (
        <main className="min-h-screen bg-[#f2efe4] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="border-b border-black/[0.08] bg-[#faf9f5]">

                <div
                    className="
                        mx-auto
                        flex
                        h-[72px]
                        max-w-7xl
                        items-center
                        justify-between
                        px-6
                        lg:px-8
                    "
                >

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


                    {/* Back */}

                    <Link
                        href="/dashboard"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-black/[0.09]
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-[#514c43]
                            shadow-sm
                            transition
                            hover:border-[#d97757]
                            hover:text-[#bd5f3f]
                        "
                    >
                        <span className="text-base">
                            ←
                        </span>

                        Dashboard
                    </Link>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <section className="relative overflow-hidden">

                {/* Background decoration */}

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
                        top-40
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
                        px-6
                        py-12
                        lg:px-8
                        lg:py-16
                    "
                >

                    {/* ================= PAGE HEADING ================= */}

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

                            <span className="h-px w-5 bg-[#bd5f3f]" />

                            Your GearUp

                        </div>


                        <h1
                            className="
                                mt-5
                                text-5xl
                                font-extrabold
                                tracking-[-0.045em]
                                text-[#211f1a]
                                sm:text-6xl
                            "
                        >
                            My Rentals
                        </h1>


                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-base
                                leading-7
                                text-[#726c60]
                                sm:text-lg
                            "
                        >
                            Keep track of your current bookings,
                            rental dates, payments, and past adventures.
                        </p>

                    </div>


                    {/* ================= CONTENT ================= */}

                    {!result.success ? (

                        <div
                            className="
                                mt-10
                                rounded-[2rem]
                                border
                                border-[#e7c8bd]
                                bg-[#fffaf7]
                                p-10
                                shadow-[0_20px_60px_rgba(33,31,26,0.08)]
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
                                    bg-[#f7ddd5]
                                    text-xl
                                    font-bold
                                    text-[#bd5f3f]
                                "
                            >
                                !
                            </div>


                            <div className="mt-5 text-center">

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Unable to load your rentals
                                </h2>


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
                                    {result.message ||
                                        "Something went wrong while loading your rental history."}
                                </p>

                            </div>

                        </div>

                    ) : result.data.length === 0 ? (

                        /* ================= EMPTY STATE ================= */

                        <div
                            className="
                                mt-10
                                rounded-[2rem]
                                border
                                border-black/[0.07]
                                bg-[#faf9f5]
                                px-6
                                py-16
                                text-center
                                shadow-[0_20px_60px_rgba(33,31,26,0.08)]
                                sm:px-10
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#dce4d7]
                                    text-2xl
                                    font-bold
                                    text-[#66765a]
                                "
                            >
                                +
                            </div>


                            <h2
                                className="
                                    mt-6
                                    text-2xl
                                    font-extrabold
                                    tracking-tight
                                "
                            >
                                No rentals yet
                            </h2>


                            <p
                                className="
                                    mx-auto
                                    mt-3
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-[#726c60]
                                "
                            >
                                Your rental adventures will appear here
                                once you book your first piece of gear.
                            </p>


                            <Link
                                href="/gear"
                                className="
                                    mt-7
                                    inline-flex
                                    items-center
                                    gap-2
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
                                    hover:shadow-md
                                "
                            >
                                Explore Gear
                                <span>→</span>
                            </Link>

                        </div>

                    ) : (

                        /* ================= RENTAL LIST ================= */

                        <div className="mt-10 space-y-5">

                            {result.data.map(
                                (rental, index) => {

                                    const status =
                                        rental.status ||
                                        "PLACED";

                                    const statusStyle =
                                        getStatusStyle(status);

                                    const gearName =
                                        getGearName(rental);

                                    return (

                                        <Link
                                            key={rental.id}
                                            href={`/dashboard/rentals/${rental.id}`}
                                            className="
                                                group
                                                block
                                            "
                                        >

                                            <article
                                                className="
                                                    overflow-hidden
                                                    rounded-[1.75rem]
                                                    border
                                                    border-black/[0.07]
                                                    bg-[#faf9f5]
                                                    shadow-[0_10px_35px_rgba(33,31,26,0.06)]
                                                    transition
                                                    duration-200
                                                    group-hover:-translate-y-0.5
                                                    group-hover:shadow-[0_18px_45px_rgba(33,31,26,0.10)]
                                                "
                                            >

                                                {/* Card top */}

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        gap-5
                                                        px-6
                                                        py-6
                                                        sm:flex-row
                                                        sm:items-start
                                                        sm:justify-between
                                                        sm:px-8
                                                    "
                                                >

                                                    <div className="flex items-start gap-4">

                                                        <div
                                                            className="
                                                                hidden
                                                                h-11
                                                                w-11
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-xl
                                                                bg-[#eeeae1]
                                                                text-sm
                                                                font-bold
                                                                text-[#6d675b]
                                                                sm:flex
                                                            "
                                                        >
                                                            {String(
                                                                index + 1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </div>


                                                        <div>

                                                            <p
                                                                className="
                                                                    font-mono
                                                                    text-[10px]
                                                                    font-semibold
                                                                    uppercase
                                                                    tracking-[0.13em]
                                                                    text-[#a49d8c]
                                                                "
                                                            >
                                                                Rental
                                                            </p>


                                                            <h2
                                                                className="
                                                                    mt-1
                                                                    text-xl
                                                                    font-extrabold
                                                                    tracking-tight
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                #
                                                                {rental.id.slice(
                                                                    0,
                                                                    8
                                                                )}
                                                            </h2>

                                                        </div>

                                                    </div>


                                                    {/* Status */}

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            w-fit
                                                            items-center
                                                            gap-2
                                                            rounded-full
                                                            px-3.5
                                                            py-2
                                                            text-[11px]
                                                            font-bold
                                                            uppercase
                                                            tracking-[0.06em]
                                                            ${statusStyle.wrapper}
                                                        `}
                                                    >

                                                        <span
                                                            className={`
                                                                h-1.5
                                                                w-1.5
                                                                rounded-full
                                                                ${statusStyle.dot}
                                                            `}
                                                        />

                                                        {status.replace(
                                                            "_",
                                                            " "
                                                        )}

                                                    </span>

                                                </div>


                                                {/* Details */}

                                                <div
                                                    className="
                                                        grid
                                                        grid-cols-1
                                                        border-t
                                                        border-black/[0.06]
                                                        sm:grid-cols-3
                                                    "
                                                >

                                                    {/* Gear */}

                                                    <div
                                                        className="
                                                            px-6
                                                            py-5
                                                            sm:px-8
                                                            sm:py-6
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                font-mono
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-[0.1em]
                                                                text-[#a49d8c]
                                                            "
                                                        >
                                                            Gear
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-2
                                                                text-base
                                                                font-bold
                                                                text-[#211f1a]
                                                            "
                                                        >
                                                            {gearName}
                                                        </p>

                                                    </div>


                                                    {/* Rental period */}

                                                    <div
                                                        className="
                                                            border-t
                                                            border-black/[0.06]
                                                            px-6
                                                            py-5
                                                            sm:border-l
                                                            sm:border-t-0
                                                            sm:px-8
                                                            sm:py-6
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                font-mono
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-[0.1em]
                                                                text-[#a49d8c]
                                                            "
                                                        >
                                                            Rental Period
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-2
                                                                text-base
                                                                font-bold
                                                                text-[#211f1a]
                                                            "
                                                        >
                                                            {formatDate(
                                                                rental.startDate
                                                            )}

                                                            <span className="mx-2 text-[#b5ae9f]">
                                                                →
                                                            </span>

                                                            {formatDate(
                                                                rental.endDate
                                                            )}
                                                        </p>

                                                    </div>


                                                    {/* Total */}

                                                    <div
                                                        className="
                                                            border-t
                                                            border-black/[0.06]
                                                            px-6
                                                            py-5
                                                            sm:border-l
                                                            sm:border-t-0
                                                            sm:px-8
                                                            sm:py-6
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                font-mono
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-[0.1em]
                                                                text-[#a49d8c]
                                                            "
                                                        >
                                                            Total
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                text-2xl
                                                                font-extrabold
                                                                tracking-tight
                                                                text-[#d97757]
                                                            "
                                                        >
                                                            $
                                                            {rental.totalAmount ??
                                                                "0"}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Footer */}

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        border-t
                                                        border-black/[0.06]
                                                        px-6
                                                        py-4
                                                        sm:px-8
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-sm
                                                            font-semibold
                                                            text-[#bd5f3f]
                                                        "
                                                    >
                                                        View rental details
                                                    </span>


                                                    <span
                                                        className="
                                                            text-lg
                                                            text-[#bd5f3f]
                                                            transition
                                                            group-hover:translate-x-1
                                                        "
                                                    >
                                                        →
                                                    </span>

                                                </div>

                                            </article>

                                        </Link>

                                    );
                                }
                            )}

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}