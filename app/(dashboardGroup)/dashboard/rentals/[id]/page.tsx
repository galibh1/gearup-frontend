"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Package,
    ShieldCheck,
} from "lucide-react";

import {
    toast,
} from "sonner";

import PayButton from "./PayButton";

import ReviewSection from "./ReviewSection";

import {
    fetchRentalDetails,
} from "./_actions/rental.actions";


type RentalItem = {
    id?: string;

    gearItemId?: string;

    quantity?: number;

    pricePerDay?: string | number;

    gearItem?: {
        id?: string;
        name?: string;
    };

    gear?: {
        id?: string;
        name?: string;
    };
};


type Rental = {
    id: string;

    status: string;

    startDate: string;

    endDate: string;

    subtotal?: string | number;

    depositTotal?: string | number;

    totalAmount?: string | number;

    items?: RentalItem[];

    reviews?: any[];
};


function formatDate(
    date: string
) {

    return new Date(
        date
    ).toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

}


function getGearName(
    item: RentalItem
) {

    return (
        item.gearItem?.name ||
        item.gear?.name ||
        "Rental Gear"
    );

}


function getStatusInfo(
    status: string
) {

    switch (status) {

        case "PLACED":

            return {
                label: "Awaiting confirmation",
                icon: Clock3,
                className:
                    "bg-[#fff4cf] text-[#946700]",
            };


        case "CONFIRMED":

            return {
                label: "Confirmed",
                icon: CheckCircle2,
                className:
                    "bg-[#e4f1df] text-[#58714d]",
            };


        case "PAID":

            return {
                label: "Paid",
                icon: CheckCircle2,
                className:
                    "bg-[#e4f1df] text-[#58714d]",
            };


        case "RETURNED":

            return {
                label: "Completed",
                icon: CheckCircle2,
                className:
                    "bg-[#e4f1df] text-[#58714d]",
            };


        case "CANCELLED":

            return {
                label: "Cancelled",
                icon: Clock3,
                className:
                    "bg-[#f8e1db] text-[#a6533b]",
            };


        default:

            return {
                label: status,
                icon: Clock3,
                className:
                    "bg-[#eeeae1] text-[#625c50]",
            };

    }

}


export default function RentalDetailPage() {

    const params =
        useParams();

    const router =
        useRouter();


    const rentalId =
        params.id as string;


    const [rental, setRental] =
        useState<Rental | null>(
            null
        );


    const [loading, setLoading] =
        useState(true);


    async function loadRental() {

        setLoading(true);


        const result =
            await fetchRentalDetails(
                rentalId
            );


        if (!result.success) {

            toast.error(
                result.message ||
                "Failed to load rental."
            );

            setLoading(false);

            return;

        }


        setRental(
            result.data
        );

        setLoading(false);

    }


    useEffect(() => {

        if (rentalId) {

            loadRental();

        }

    }, [rentalId]);


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <main
                className="
                min-h-screen
                bg-[#f2efe4]
                px-5
                py-8
                sm:px-8
                "
            >

                <div
                    className="
                    mx-auto
                    max-w-5xl
                    "
                >

                    <div
                        className="
                        h-10
                        w-32
                        animate-pulse
                        rounded-full
                        bg-white/70
                        "
                    />

                    <div
                        className="
                        mt-7
                        h-[500px]
                        animate-pulse
                        rounded-[2rem]
                        bg-white/70
                        "
                    />

                </div>

            </main>

        );

    }


    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!rental) {

        return (

            <main
                className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-[#f2efe4]
                px-5
                "
            >

                <div
                    className="
                    w-full
                    max-w-md
                    rounded-[2rem]
                    border
                    border-black/[0.07]
                    bg-[#faf9f5]
                    p-8
                    text-center
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
                        bg-[#f7e5de]
                        text-[#bd5f3f]
                        "
                    >

                        <Package
                            className="h-6 w-6"
                        />

                    </div>


                    <h1
                        className="
                        mt-5
                        text-2xl
                        font-extrabold
                        text-[#211f1a]
                        "
                    >

                        Rental not found

                    </h1>


                    <p
                        className="
                        mt-2
                        text-sm
                        leading-6
                        text-[#726c60]
                        "
                    >

                        We couldn't find this
                        rental.

                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/dashboard/rentals"
                            )
                        }
                        className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#211f1a]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#35322b]
                        "
                    >

                        <ArrowLeft
                            className="h-4 w-4"
                        />

                        Back to rentals

                    </button>

                </div>

            </main>

        );

    }


    const isReturned =
        rental.status ===
        "RETURNED";


    const isConfirmed =
        rental.status ===
        "CONFIRMED";


    const isPaid =
        rental.status ===
        "PAID";


    const status =
        getStatusInfo(
            rental.status
        );


    const StatusIcon =
        status.icon;


    const firstItem =
        rental.items?.[0];


    const mainGearName =
        firstItem
            ? getGearName(firstItem)
            : "Gear Rental";


    return (

        <main
            className="
            min-h-screen
            bg-[#f2efe4]
            px-5
            py-8
            sm:px-8
            lg:py-10
            "
        >

            <div
                className="
                mx-auto
                max-w-5xl
                "
            >

                {/* =================================================
                    BACK BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/dashboard/rentals"
                        )
                    }
                    className="
                    group
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
                    text-[#625c50]
                    shadow-sm
                    transition
                    hover:border-[#bd5f3f]/30
                    hover:text-[#bd5f3f]
                    "
                >

                    <ArrowLeft
                        className="
                        h-4
                        w-4
                        transition
                        group-hover:-translate-x-0.5
                        "
                    />

                    My Rentals

                </button>


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div
                    className="
                    mt-7
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
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

                            Rental details

                        </p>


                        <h1
                            className="
                            mt-2
                            text-3xl
                            font-extrabold
                            tracking-[-0.035em]
                            text-[#211f1a]
                            sm:text-4xl
                            "
                        >

                            {mainGearName}

                        </h1>


                        <p
                            className="
                            mt-2
                            text-sm
                            text-[#8d8678]
                            "
                        >

                            Rental #
                            {rental.id.slice(
                                0,
                                8
                            )}

                        </p>

                    </div>


                    <div
                        className={`
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        ${status.className}
                        `}
                    >

                        <StatusIcon
                            className="h-4 w-4"
                        />

                        {status.label}

                    </div>

                </div>


                {/* =================================================
                    MAIN RENTAL CARD
                ================================================= */}

                <section
                    className="
                    mt-7
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-black/[0.07]
                    bg-[#faf9f5]
                    shadow-[0_20px_60px_rgba(33,31,26,0.09)]
                    "
                >

                    {/* =============================================
                        DATES
                    ============================================= */}

                    <div
                        className="
                        grid
                        gap-4
                        p-6
                        sm:grid-cols-2
                        sm:p-8
                        "
                    >

                        <div
                            className="
                            rounded-2xl
                            border
                            border-black/[0.06]
                            bg-white
                            p-5
                            "
                        >

                            <div
                                className="
                                flex
                                items-center
                                gap-4
                                "
                            >

                                <div
                                    className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#e8eee2]
                                    text-[#66765a]
                                    "
                                >

                                    <CalendarDays
                                        className="
                                        h-5
                                        w-5
                                        "
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#a49d8c]
                                        "
                                    >

                                        Start date

                                    </p>


                                    <p
                                        className="
                                        mt-1
                                        font-bold
                                        text-[#211f1a]
                                        "
                                    >

                                        {formatDate(
                                            rental.startDate
                                        )}

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div
                            className="
                            rounded-2xl
                            border
                            border-black/[0.06]
                            bg-white
                            p-5
                            "
                        >

                            <div
                                className="
                                flex
                                items-center
                                gap-4
                                "
                            >

                                <div
                                    className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#f7e5de]
                                    text-[#bd5f3f]
                                    "
                                >

                                    <CalendarDays
                                        className="
                                        h-5
                                        w-5
                                        "
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#a49d8c]
                                        "
                                    >

                                        End date

                                    </p>


                                    <p
                                        className="
                                        mt-1
                                        font-bold
                                        text-[#211f1a]
                                        "
                                    >

                                        {formatDate(
                                            rental.endDate
                                        )}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =============================================
                        PRICE SUMMARY
                    ============================================= */}

                    <div
                        className="
                        border-t
                        border-black/[0.07]
                        px-6
                        py-6
                        sm:px-8
                        "
                    >

                        <div
                            className="
                            grid
                            gap-4
                            sm:grid-cols-3
                            "
                        >

                            <div>

                                <p
                                    className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.08em]
                                    text-[#a49d8c]
                                    "
                                >

                                    Subtotal

                                </p>


                                <p
                                    className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    text-[#211f1a]
                                    "
                                >

                                    $
                                    {rental.subtotal ??
                                        "0"}

                                </p>

                            </div>


                            <div>

                                <p
                                    className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.08em]
                                    text-[#a49d8c]
                                    "
                                >

                                    Deposit

                                </p>


                                <p
                                    className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    text-[#211f1a]
                                    "
                                >

                                    $
                                    {rental.depositTotal ??
                                        "0"}

                                </p>

                            </div>


                            <div
                                className="
                                rounded-2xl
                                bg-[#e8eee2]
                                px-5
                                py-4
                                "
                            >

                                <p
                                    className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.08em]
                                    text-[#66765a]
                                    "
                                >

                                    Total

                                </p>


                                <p
                                    className="
                                    mt-1
                                    text-2xl
                                    font-extrabold
                                    text-[#58714d]
                                    "
                                >

                                    $
                                    {rental.totalAmount ??
                                        "0"}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =============================================
                        RENTAL ITEMS
                    ============================================= */}

                    {rental.items &&
                        rental.items.length > 0 && (

                        <div
                            className="
                            border-t
                            border-black/[0.07]
                            px-6
                            py-7
                            sm:px-8
                            "
                        >

                            <div
                                className="
                                flex
                                items-end
                                justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                        font-mono
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.14em]
                                        text-[#bd5f3f]
                                        "
                                    >

                                        Booking

                                    </p>


                                    <h2
                                        className="
                                        mt-1
                                        text-xl
                                        font-extrabold
                                        text-[#211f1a]
                                        "
                                    >

                                        Rental items

                                    </h2>

                                </div>


                                <span
                                    className="
                                    text-xs
                                    text-[#8d8678]
                                    "
                                >

                                    {rental.items.length}{" "}

                                    {rental.items.length ===
                                    1
                                        ? "item"
                                        : "items"}

                                </span>

                            </div>


                            <div
                                className="
                                mt-5
                                space-y-3
                                "
                            >

                                {rental.items.map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const gearId =
                                            item.gearItemId ||
                                            item.gearItem?.id ||
                                            item.gear?.id ||
                                            "";


                                        const gearName =
                                            getGearName(
                                                item
                                            );


                                        return (

                                            <div
                                                key={
                                                    item.id ||
                                                    `${gearId}-${index}`
                                                }
                                                className="
                                                rounded-2xl
                                                border
                                                border-black/[0.06]
                                                bg-white
                                                p-5
                                                "
                                            >

                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    "
                                                >

                                                    <div
                                                        className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-[#eeeae1]
                                                            text-[#625c50]
                                                            "
                                                        >

                                                            <Package
                                                                className="
                                                                h-5
                                                                w-5
                                                                "
                                                            />

                                                        </div>


                                                        <div
                                                            className="
                                                            min-w-0
                                                            "
                                                        >

                                                            <p
                                                                className="
                                                                truncate
                                                                font-bold
                                                                text-[#211f1a]
                                                                "
                                                            >

                                                                {
                                                                    gearName
                                                                }

                                                            </p>


                                                            <p
                                                                className="
                                                                mt-1
                                                                text-sm
                                                                text-[#8d8678]
                                                                "
                                                            >

                                                                Quantity:{" "}

                                                                {
                                                                    item.quantity ??
                                                                    1
                                                                }

                                                            </p>

                                                        </div>

                                                    </div>


                                                    {item.pricePerDay !==
                                                        undefined && (

                                                        <div
                                                            className="
                                                            hidden
                                                            text-right
                                                            sm:block
                                                            "
                                                        >

                                                            <p
                                                                className="
                                                                text-[11px]
                                                                text-[#a49d8c]
                                                                "
                                                            >

                                                                Per day

                                                            </p>


                                                            <p
                                                                className="
                                                                mt-1
                                                                font-bold
                                                                text-[#211f1a]
                                                                "
                                                            >

                                                                $
                                                                {
                                                                    item.pricePerDay
                                                                }

                                                            </p>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* REVIEW */}

                                                {isReturned &&
                                                    gearId && (

                                                    <div
                                                        className="
                                                        mt-5
                                                        border-t
                                                        border-black/[0.06]
                                                        pt-5
                                                        "
                                                    >

                                                        <ReviewSection
                                                            rentalOrderId={
                                                                rental.id
                                                            }
                                                            gearItemId={
                                                                gearId
                                                            }
                                                            gearName={
                                                                gearName
                                                            }
                                                            existingReview={
                                                                rental.reviews?.find(
                                                                    (
                                                                        review: any
                                                                    ) =>
                                                                        review.gearItemId ===
                                                                        gearId
                                                                ) ||
                                                                null
                                                            }
                                                        />

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    )}

                </section>


                {/* =================================================
                    PAYMENT
                ================================================= */}

                {isConfirmed && (

                    <section
                        className="
                        mt-5
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-[#e7cfc5]
                        bg-[#faf9f5]
                        shadow-[0_15px_45px_rgba(33,31,26,0.06)]
                        "
                    >

                        <div
                            className="
                            flex
                            flex-col
                            gap-6
                            p-6
                            sm:p-8
                            md:flex-row
                            md:items-center
                            md:justify-between
                            "
                        >

                            <div
                                className="
                                flex
                                items-start
                                gap-4
                                "
                            >

                                <div
                                    className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#f7e5de]
                                    text-[#bd5f3f]
                                    "
                                >

                                    <CreditCard
                                        className="
                                        h-5
                                        w-5
                                        "
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                        font-mono
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.14em]
                                        text-[#bd5f3f]
                                        "
                                    >

                                        Payment

                                    </p>


                                    <h2
                                        className="
                                        mt-1
                                        text-xl
                                        font-extrabold
                                        text-[#211f1a]
                                        "
                                    >

                                        Rental confirmed

                                    </h2>


                                    <p
                                        className="
                                        mt-1
                                        text-sm
                                        leading-6
                                        text-[#726c60]
                                        "
                                    >

                                        Complete your secure
                                        payment to continue.

                                    </p>

                                </div>

                            </div>


                            <div
                                className="
                                w-full
                                md:w-52
                                md:shrink-0
                                "
                            >

                                <PayButton
                                    rentalId={
                                        rentalId
                                    }
                                />

                            </div>

                        </div>


                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            border-t
                            border-black/[0.06]
                            px-6
                            py-4
                            text-xs
                            text-[#8d8678]
                            sm:px-8
                            "
                        >

                            <ShieldCheck
                                className="
                                h-4
                                w-4
                                text-[#66765a]
                                "
                            />

                            Secure payment powered
                            by Stripe.

                        </div>

                    </section>

                )}


                {/* =================================================
                    PLACED
                ================================================= */}

                {rental.status ===
                    "PLACED" && (

                    <section
                        className="
                        mt-5
                        flex
                        items-start
                        gap-4
                        rounded-[2rem]
                        border
                        border-[#eadfbc]
                        bg-[#fff9e7]
                        p-6
                        sm:p-7
                        "
                    >

                        <div
                            className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#f7edc9]
                            text-[#946700]
                            "
                        >

                            <Clock3
                                className="
                                h-5
                                w-5
                                "
                            />

                        </div>


                        <div>

                            <h2
                                className="
                                font-bold
                                text-[#725000]
                                "
                            >

                                Waiting for provider
                                confirmation

                            </h2>


                            <p
                                className="
                                mt-1
                                text-sm
                                leading-6
                                text-[#8b6d32]
                                "
                            >

                                Your rental request has
                                been placed. The provider
                                needs to confirm it before
                                payment can be completed.

                            </p>

                        </div>

                    </section>

                )}


                {/* =================================================
                    PAID
                ================================================= */}

                {isPaid && (

                    <section
                        className="
                        mt-5
                        flex
                        items-start
                        gap-4
                        rounded-[2rem]
                        border
                        border-[#d7e5d1]
                        bg-[#f1f6ee]
                        p-6
                        sm:p-7
                        "
                    >

                        <div
                            className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#e0ebdc]
                            text-[#58714d]
                            "
                        >

                            <CheckCircle2
                                className="
                                h-5
                                w-5
                                "
                            />

                        </div>


                        <div>

                            <h2
                                className="
                                font-bold
                                text-[#4e6546]
                                "
                            >

                                Payment received

                            </h2>


                            <p
                                className="
                                mt-1
                                text-sm
                                leading-6
                                text-[#66765a]
                                "
                            >

                                Your payment has been
                                received and your rental
                                is being prepared.

                            </p>

                        </div>

                    </section>

                )}


                {/* =================================================
                    RETURNED
                ================================================= */}

                {isReturned && (

                    <section
                        className="
                        mt-5
                        flex
                        items-start
                        gap-4
                        rounded-[2rem]
                        border
                        border-[#d7e5d1]
                        bg-[#f1f6ee]
                        p-6
                        sm:p-7
                        "
                    >

                        <div
                            className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#e0ebdc]
                            text-[#58714d]
                            "
                        >

                            <CheckCircle2
                                className="
                                h-5
                                w-5
                                "
                            />

                        </div>


                        <div>

                            <h2
                                className="
                                font-bold
                                text-[#4e6546]
                                "
                            >

                                Rental completed

                            </h2>


                            <p
                                className="
                                mt-1
                                text-sm
                                leading-6
                                text-[#66765a]
                                "
                            >

                                Thanks for using GearUp.
                                We hope you enjoyed your
                                adventure.

                            </p>

                        </div>

                    </section>

                )}


                {/* =================================================
                    FOOTER TRUST
                ================================================= */}

                <div
                    className="
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-x-4
                    gap-y-2
                    py-8
                    text-[11px]
                    text-[#a49d8c]
                    "
                >

                    <span>
                        Secure account
                    </span>

                    <span>
                        ·
                    </span>

                    <span>
                        Secure payments
                    </span>

                    <span>
                        ·
                    </span>

                    <span>
                        GearUp marketplace
                    </span>

                </div>

            </div>

        </main>

    );

}