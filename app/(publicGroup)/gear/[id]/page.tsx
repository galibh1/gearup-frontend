import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

import RentalForm from "../../_components/RentalForm";
import GearImageGallery from "../../_components/GearImageGallery";

const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";

async function getGear(id: string) {
    const response = await fetch(
        `${API_URL}/api/gear/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return null;
    }

    const result = await response.json();

    return result.data ?? result;
}

export default async function GearDetailsPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;

    const gear = await getGear(id);

    if (!gear) {
        notFound();
    }

    const imageUrls = Array.isArray(
        gear.imageUrls
    )
        ? gear.imageUrls.filter(
              (url: unknown): url is string =>
                  typeof url === "string" &&
                  url.trim().length > 0 &&
                  !url.includes("example.com")
          )
        : [];

    return (
        <main className="min-h-screen bg-[#f4f1e8] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="border-b border-black/[0.07] bg-[#faf9f5]">

                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        href="/gear"
                        className="group flex items-center gap-3"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211f1a] text-sm font-extrabold text-white transition-transform group-hover:scale-105">
                            G
                        </div>

                        <div>

                            <div className="text-lg font-bold tracking-tight">
                                Gear<span className="text-[#d97757]">
                                    Up
                                </span>
                            </div>

                            <div className="hidden text-[9px] uppercase tracking-[0.16em] text-[#a49d8c] sm:block">
                                Rent · Explore · Repeat
                            </div>

                        </div>

                    </Link>


                    <Link
                        href="/gear"
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-black/[0.08]
                            bg-white
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-[#514d45]
                            transition
                            hover:border-[#d97757]
                            hover:text-[#bd5f3f]
                        "
                    >

                        <ArrowLeft className="h-4 w-4" />

                        <span className="hidden sm:inline">
                            Back to gear
                        </span>

                        <span className="sm:hidden">
                            Back
                        </span>

                    </Link>

                </div>

            </header>


            {/* ================= PAGE ================= */}

            <section className="relative overflow-hidden">

                {/* Decorative background */}

                <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#dce4d7]/70 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#d97757]/10 blur-3xl" />


                <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

                    {/* Breadcrumb */}

                    <div className="mb-7 flex items-center gap-2 text-xs font-medium text-[#8d8678]">

                        <Link
                            href="/gear"
                            className="transition hover:text-[#bd5f3f]"
                        >
                            Explore Gear
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5" />

                        <span className="max-w-[220px] truncate text-[#514d45]">
                            {gear.name}
                        </span>

                    </div>


                    {/* ================= PRODUCT CARD ================= */}

                    <div
                        className="
                            overflow-hidden
                            rounded-[2rem]
                            border
                            border-black/[0.07]
                            bg-[#faf9f5]
                            shadow-[0_24px_70px_rgba(33,31,26,0.10)]
                        "
                    >

                        <div className="grid lg:grid-cols-[1.02fr_0.98fr]">


                            {/* ================= IMAGE GALLERY ================= */}

                            <div className="relative min-h-[380px] bg-[#e7e3d8] sm:min-h-[500px] lg:min-h-[650px]">

                                <GearImageGallery
                                    images={imageUrls}
                                    alt={gear.name}
                                />


                                {/* Image overlay */}

                                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 via-transparent to-transparent p-6 sm:p-8">

                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#211f1a] shadow-sm backdrop-blur">

                                        <span className="h-2 w-2 rounded-full bg-[#66765a]" />

                                        {gear.status === "AVAILABLE"
                                            ? "Available for rental"
                                            : gear.status || "Currently listed"}

                                    </div>

                                </div>

                            </div>


                            {/* ================= DETAILS ================= */}

                            <div className="flex flex-col p-6 sm:p-9 lg:p-11 xl:p-12">

                                {/* Label */}

                                <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bd5f3f]">

                                    <span className="h-px w-5 bg-[#bd5f3f]" />

                                    Gear details

                                </div>


                                {/* Title */}

                                <h1
                                    className="
                                        mt-4
                                        max-w-xl
                                        text-3xl
                                        font-extrabold
                                        leading-[1.08]
                                        tracking-[-0.035em]
                                        text-[#211f1a]
                                        sm:text-4xl
                                        xl:text-[2.7rem]
                                    "
                                >
                                    {gear.name}
                                </h1>


                                {/* Brand */}

                                {gear.brand && (
                                    <p className="mt-3 text-sm font-semibold text-[#827b6d]">
                                        {gear.brand}
                                    </p>
                                )}


                                {/* Description */}

                                <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#726c60]">

                                    {gear.description ||
                                        "Premium gear available for your next adventure."}

                                </p>


                                {/* Provider */}

                                <div className="mt-7 rounded-2xl border border-black/[0.06] bg-white/70 px-5 py-4">

                                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a49d8c]">
                                        Provided by
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-[#211f1a]">

                                        {gear.provider?.name ||
                                            gear.provider?.businessName ||
                                            "GearUp Provider"}

                                    </p>

                                    {gear.location && (
                                        <p className="mt-1 text-xs text-[#827b6d]">
                                            {gear.location}
                                        </p>
                                    )}

                                </div>


                                {/* Price */}

                                <div className="mt-8 flex items-end justify-between gap-4 border-b border-black/[0.07] pb-7">

                                    <div>

                                        <p className="text-xs font-medium text-[#8d8678]">
                                            Rental price
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-1">

                                            <span className="text-4xl font-extrabold tracking-[-0.04em] text-[#159447] sm:text-5xl">
                                                ${gear.pricePerDay}
                                            </span>

                                            <span className="text-sm font-semibold text-[#726c60]">
                                                / day
                                            </span>

                                        </div>

                                    </div>


                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            px-3.5
                                            py-2
                                            text-[11px]
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            ${
                                                gear.status === "AVAILABLE"
                                                    ? "bg-[#dce4d7] text-[#66765a]"
                                                    : "bg-[#f3e4df] text-[#bd5f3f]"
                                            }
                                        `}
                                    >

                                        <Check className="h-3.5 w-3.5" />

                                        {gear.status === "AVAILABLE"
                                            ? "Available"
                                            : gear.status || "Unavailable"}

                                    </div>

                                </div>


                                {/* Stock */}

                                <div className="mt-5 flex flex-wrap gap-3">

                                    {typeof gear.availableStock === "number" && (
                                        <div className="rounded-xl bg-[#eeeade] px-4 py-2.5">

                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918b80]">
                                                Available stock
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-[#211f1a]">
                                                {gear.availableStock}
                                            </p>

                                        </div>
                                    )}

                                    {typeof gear.stock === "number" && (
                                        <div className="rounded-xl bg-[#eeeade] px-4 py-2.5">

                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918b80]">
                                                Total stock
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-[#211f1a]">
                                                {gear.stock}
                                            </p>

                                        </div>
                                    )}

                                    {gear.condition && (
                                        <div className="rounded-xl bg-[#eeeade] px-4 py-2.5">

                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918b80]">
                                                Condition
                                            </p>

                                            <p className="mt-0.5 text-sm font-bold text-[#211f1a]">
                                                {gear.condition}
                                            </p>

                                        </div>
                                    )}

                                </div>


                                {/* Deposit */}

                                {gear.depositAmount !== undefined && (
                                    <p className="mt-4 text-xs text-[#827b6d]">
                                        Security deposit:{" "}
                                        <span className="font-bold text-[#514d45]">
                                            ${gear.depositAmount}
                                        </span>
                                    </p>
                                )}


                                {/* Specifications */}

                                {gear.specifications &&
                                    typeof gear.specifications === "object" &&
                                    Object.keys(
                                        gear.specifications
                                    ).length > 0 && (

                                        <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white/70 p-5">

                                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a49d8c]">
                                                Specifications
                                            </p>

                                            <div className="mt-3 grid gap-2 sm:grid-cols-2">

                                                {Object.entries(
                                                    gear.specifications as Record<
                                                        string,
                                                        unknown
                                                    >
                                                ).map(
                                                    ([key, value]) => (

                                                        <div
                                                            key={key}
                                                            className="rounded-xl bg-[#eeeade] px-3 py-2"
                                                        >

                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918b80]">
                                                                {key}
                                                            </p>

                                                            <p className="mt-0.5 text-xs font-bold text-[#514d45]">
                                                                {String(value)}
                                                            </p>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}


                                {/* Rental section */}

                                {gear.status === "AVAILABLE" &&
                                    Number(
                                        gear.availableStock || 0
                                    ) > 0 && (

                                        <div className="mt-7">

                                            <div className="mb-5 flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eeeade]">

                                                    <CalendarDays className="h-4 w-4 text-[#66765a]" />

                                                </div>

                                                <div>

                                                    <h2 className="text-base font-bold">
                                                        Plan your rental
                                                    </h2>

                                                    <p className="mt-0.5 text-xs text-[#8d8678]">
                                                        Choose your rental dates below.
                                                    </p>

                                                </div>

                                            </div>


                                            <RentalForm
                                                gearId={gear.id}
                                            />

                                        </div>

                                    )}


                                {/* Not available message */}

                                {!(
                                    gear.status === "AVAILABLE" &&
                                    Number(
                                        gear.availableStock || 0
                                    ) > 0
                                ) && (

                                    <div className="mt-7 rounded-2xl border border-[#ead4cc] bg-[#fff7f4] px-5 py-4">

                                        <p className="text-sm font-bold text-[#8f4934]">
                                            This gear is currently unavailable.
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-[#a66b58]">
                                            Please check back later or explore other available gear.
                                        </p>

                                    </div>

                                )}


                                {/* Trust information */}

                                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#dce4d7] bg-[#f1f4ed] px-4 py-3.5">

                                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#66765a]" />

                                    <div>

                                        <p className="text-xs font-semibold text-[#4f5d47]">
                                            Secure checkout
                                        </p>

                                        <p className="mt-0.5 text-[11px] leading-5 text-[#7d8677]">
                                            Payments are securely processed through Stripe.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= BOTTOM INFO ================= */}

                    <div className="mt-6 flex flex-col items-center justify-between gap-3 px-2 text-[11px] text-[#9a9385] sm:flex-row">

                        <p>
                            GearUp marketplace · Rent what you need.
                        </p>

                        <div className="flex items-center gap-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                            Secure account · Secure payments

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}