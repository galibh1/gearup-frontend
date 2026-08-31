"use client";

import {
    useMemo,
    useState,
} from "react";

import GearCard from "./GearCard";


type Gear = {
    id: string;
    name?: string;
    brand?: string;

    category?:
        | string
        | {
            name?: string;
        };

    pricePerDay?: string | number;

    stock?: number;

    quantity?: number;

    availableQuantity?: number;

    availableStock?: number;

    status?: string;

    availability?: string;

    provider?: {
        name?: string;
    };

    /*
     * These fields allow the filter to work with
     * availability information if the backend provides it.
     */
    unavailableDates?: string[];

    bookings?: Array<{
        startDate?: string;
        endDate?: string;
    }>;

    rentals?: Array<{
        startDate?: string;
        endDate?: string;
        status?: string;
    }>;

    [key: string]: unknown;
};


type GearBrowserProps = {
    gears: Gear[];
};


type AppliedFilters = {
    search: string;
    brand: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    startDate: string;
    endDate: string;
};


export default function GearBrowser({
    gears,
}: GearBrowserProps) {

    const [search, setSearch] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [category, setCategory] =
        useState("all");

    const [minPrice, setMinPrice] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState("");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");


    const [appliedFilters, setAppliedFilters] =
        useState<AppliedFilters>({
            search: "",
            brand: "",
            category: "all",
            minPrice: "",
            maxPrice: "",
            startDate: "",
            endDate: "",
        });


    // =========================================================
    // HELPERS
    // =========================================================

    function getCategory(
        gear: Gear
    ): string {

        if (
            typeof gear.category === "object" &&
            gear.category !== null
        ) {

            return (
                gear.category.name ||
                ""
            );

        }

        return String(
            gear.category ||
            ""
        );

    }


    function getBrand(
        gear: Gear
    ): string {

        return String(
            gear.brand ||
            ""
        );

    }


    function getPrice(
        gear: Gear
    ): number {

        const price =
            Number(
                gear.pricePerDay
            );

        return Number.isFinite(price)
            ? price
            : 0;

    }


    function getTodayString() {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    /*
     * Check whether two date ranges overlap.
     */
    function rangesOverlap(
        requestedStart: string,
        requestedEnd: string,
        existingStart: string,
        existingEnd: string
    ) {

        return (
            requestedStart <= existingEnd &&
            requestedEnd >= existingStart
        );

    }


    /*
     * Determine whether a gear item is available
     * for the requested date range.
     *
     * If the backend does not provide booking/rental
     * date information, the current stock/status is used.
     */
    function isGearAvailableForDates(
        gear: Gear,
        requestedStart: string,
        requestedEnd: string
    ): boolean {

        if (
            !requestedStart &&
            !requestedEnd
        ) {
            return true;
        }


        if (
            !requestedStart ||
            !requestedEnd
        ) {
            return true;
        }


        if (
            requestedEnd <
            requestedStart
        ) {
            return false;
        }


        /*
         * If there is an explicit unavailableDates
         * array, reject the gear if any requested date
         * appears in it.
         */
        if (
            Array.isArray(
                gear.unavailableDates
            ) &&
            gear.unavailableDates.length > 0
        ) {

            const current =
                new Date(
                    `${requestedStart}T00:00:00`
                );

            const end =
                new Date(
                    `${requestedEnd}T00:00:00`
                );


            while (
                current <= end
            ) {

                const year =
                    current.getFullYear();

                const month =
                    String(
                        current.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        current.getDate()
                    ).padStart(2, "0");

                const dateString =
                    `${year}-${month}-${day}`;


                if (
                    gear.unavailableDates.some(
                        (date) =>
                            date.startsWith(
                                dateString
                            )
                    )
                ) {

                    return false;

                }


                current.setDate(
                    current.getDate() + 1
                );

            }

        }


        /*
         * Check bookings returned by the backend.
         */
        if (
            Array.isArray(
                gear.bookings
            )
        ) {

            for (
                const booking
                of gear.bookings
            ) {

                if (
                    !booking.startDate ||
                    !booking.endDate
                ) {
                    continue;
                }


                if (
                    rangesOverlap(
                        requestedStart,
                        requestedEnd,
                        booking.startDate.slice(
                            0,
                            10
                        ),
                        booking.endDate.slice(
                            0,
                            10
                        )
                    )
                ) {

                    return false;

                }

            }

        }


        /*
         * Check rentals returned by the backend.
         *
         * Cancelled rentals do not block availability.
         */
        if (
            Array.isArray(
                gear.rentals
            )
        ) {

            for (
                const rental
                of gear.rentals
            ) {

                if (
                    !rental.startDate ||
                    !rental.endDate
                ) {
                    continue;
                }


                if (
                    rental.status ===
                    "CANCELLED"
                ) {
                    continue;
                }


                if (
                    rangesOverlap(
                        requestedStart,
                        requestedEnd,
                        rental.startDate.slice(
                            0,
                            10
                        ),
                        rental.endDate.slice(
                            0,
                            10
                        )
                    )
                ) {

                    return false;

                }

            }

        }


        /*
         * If explicit stock/status information says
         * there is currently no inventory, do not show
         * it as available.
         */
        const availableStock =
            Number(
                gear.availableStock ??
                gear.availableQuantity ??
                gear.quantity ??
                gear.stock ??
                0
            );


        const status =
            String(
                gear.status ||
                gear.availability ||
                ""
            ).toUpperCase();


        if (
            status === "UNAVAILABLE" ||
            status === "OUT_OF_STOCK" ||
            status === "INACTIVE"
        ) {

            return false;

        }


        if (
            gear.availableStock !== undefined &&
            availableStock <= 0
        ) {

            return false;

        }


        return true;

    }


    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories =
        useMemo(() => {

            const values =
                gears
                    .map(
                        getCategory
                    )
                    .filter(Boolean);


            return Array.from(
                new Set(values)
            ).sort();

        }, [gears]);


    // =========================================================
    // FILTERED GEAR
    // =========================================================

    const filteredGears =
        useMemo(() => {

            const query =
                appliedFilters.search
                    .trim()
                    .toLowerCase();


            const minimum =
                appliedFilters.minPrice
                    ? Number(
                        appliedFilters.minPrice
                    )
                    : null;


            const maximum =
                appliedFilters.maxPrice
                    ? Number(
                        appliedFilters.maxPrice
                    )
                    : null;


            return gears.filter(
                (gear) => {

                    const name =
                        String(
                            gear.name ||
                            ""
                        ).toLowerCase();


                    const gearBrand =
                        getBrand(
                            gear
                        ).toLowerCase();


                    const gearCategory =
                        getCategory(
                            gear
                        ).toLowerCase();


                    const provider =
                        String(
                            gear.provider?.name ||
                            ""
                        ).toLowerCase();


                    const price =
                        getPrice(
                            gear
                        );


                    const matchesSearch =
                        !query ||
                        name.includes(query) ||
                        gearBrand.includes(query) ||
                        gearCategory.includes(query) ||
                        provider.includes(query);


                    const matchesBrand =
                        !appliedFilters.brand ||
                        gearBrand.includes(
                            appliedFilters.brand
                                .trim()
                                .toLowerCase()
                        );


                    const matchesCategory =
                        appliedFilters.category ===
                            "all" ||
                        gearCategory ===
                            appliedFilters.category
                                .toLowerCase();


                    const matchesMinimum =
                        minimum === null ||
                        price >= minimum;


                    const matchesMaximum =
                        maximum === null ||
                        price <= maximum;


                    const matchesDates =
                        isGearAvailableForDates(
                            gear,
                            appliedFilters.startDate,
                            appliedFilters.endDate
                        );


                    return (
                        matchesSearch &&
                        matchesBrand &&
                        matchesCategory &&
                        matchesMinimum &&
                        matchesMaximum &&
                        matchesDates
                    );

                }
            );

        }, [
            gears,
            appliedFilters,
        ]);


    // =========================================================
    // APPLY FILTERS
    // =========================================================

    function applyFilters() {

        if (
            startDate &&
            endDate &&
            endDate < startDate
        ) {

            return;

        }


        setAppliedFilters({
            search,
            brand,
            category,
            minPrice,
            maxPrice,
            startDate,
            endDate,
        });

    }


    // =========================================================
    // RESET FILTERS
    // =========================================================

    function resetFilters() {

        setSearch("");

        setBrand("");

        setCategory("all");

        setMinPrice("");

        setMaxPrice("");

        setStartDate("");

        setEndDate("");


        setAppliedFilters({
            search: "",
            brand: "",
            category: "all",
            minPrice: "",
            maxPrice: "",
            startDate: "",
            endDate: "",
        });

    }


    // =========================================================
    // SEARCH ENTER
    // =========================================================

    function handleSearchKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {

        if (
            event.key === "Enter"
        ) {

            applyFilters();

        }

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="mt-8">


            {/* =====================================================
                SEARCH
            ===================================================== */}

            <div
                className="
                    rounded-[1.5rem]
                    border
                    border-black/[0.07]
                    bg-white/70
                    p-2
                    shadow-[0_10px_30px_rgba(33,31,26,0.05)]
                    backdrop-blur-sm
                "
            >

                <div
                    className="
                        flex
                        min-h-[58px]
                        items-center
                        gap-3
                        rounded-[1.1rem]
                        border
                        border-black/[0.08]
                        bg-white
                        px-4
                        sm:px-5
                    "
                >

                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="
                            shrink-0
                            text-[#9d9687]
                        "
                    >

                        <circle
                            cx="11"
                            cy="11"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="2"
                        />

                        <path
                            d="M16.5 16.5L21 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                    </svg>


                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        onKeyDown={
                            handleSearchKeyDown
                        }
                        placeholder="Search tents, bikes, kayaks, cameras and more..."
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            text-[15px]
                            text-[#211f1a]
                            outline-none
                            placeholder:text-[#a49d8c]
                        "
                    />


                    <button
                        type="button"
                        onClick={
                            applyFilters
                        }
                        className="
                            hidden
                            h-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#d97757]
                            px-6
                            text-sm
                            font-semibold
                            text-white
                            transition-all
                            hover:bg-[#c96546]
                            hover:shadow-md
                            sm:flex
                        "
                    >
                        Search
                    </button>

                </div>

            </div>


            {/* MOBILE SEARCH */}

            <button
                type="button"
                onClick={
                    applyFilters
                }
                className="
                    mt-3
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d97757]
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#c96546]
                    sm:hidden
                "
            >
                Search
            </button>


            {/* =====================================================
                MARKETPLACE
            ===================================================== */}

            <div
                className="
                    mt-8
                    grid
                    grid-cols-1
                    gap-7
                    lg:grid-cols-[270px_minmax(0,1fr)]
                "
            >


                {/* =================================================
                    FILTERS
                ================================================= */}

                <aside
                    className="
                        h-fit
                        rounded-[1.5rem]
                        border
                        border-black/[0.07]
                        bg-[#faf9f5]
                        p-6
                        shadow-[0_8px_25px_rgba(33,31,26,0.04)]
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                font-extrabold
                                tracking-[-0.025em]
                                text-[#211f1a]
                            "
                        >
                            Filters
                        </h2>


                        <p
                            className="
                                mt-1
                                text-sm
                                leading-5
                                text-[#777064]
                            "
                        >
                            Narrow down your search.
                        </p>

                    </div>


                    {/* BRAND */}

                    <div className="mt-6">

                        <label
                            htmlFor="gear-brand"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[#302d27]
                            "
                        >
                            Brand
                        </label>


                        <input
                            id="gear-brand"
                            type="text"
                            value={brand}
                            onChange={(event) =>
                                setBrand(
                                    event.target.value
                                )
                            }
                            placeholder="e.g. Trek"
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-black/[0.09]
                                bg-white
                                px-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-[#d97757]
                                focus:ring-2
                                focus:ring-[#d97757]/10
                            "
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="mt-5">

                        <label
                            htmlFor="gear-category"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[#302d27]
                            "
                        >
                            Category
                        </label>


                        <select
                            id="gear-category"
                            value={category}
                            onChange={(event) =>
                                setCategory(
                                    event.target.value
                                )
                            }
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-black/[0.09]
                                bg-white
                                px-3.5
                                text-sm
                                text-[#514d45]
                                outline-none
                                transition
                                focus:border-[#d97757]
                                focus:ring-2
                                focus:ring-[#d97757]/10
                            "
                        >

                            <option value="all">
                                All Categories
                            </option>


                            {categories.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* MINIMUM PRICE */}

                    <div className="mt-5">

                        <label
                            htmlFor="gear-min-price"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[#302d27]
                            "
                        >
                            Minimum Price
                        </label>


                        <input
                            id="gear-min-price"
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={(event) =>
                                setMinPrice(
                                    event.target.value
                                )
                            }
                            placeholder="0"
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-black/[0.09]
                                bg-white
                                px-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-[#d97757]
                                focus:ring-2
                                focus:ring-[#d97757]/10
                            "
                        />

                    </div>


                    {/* MAXIMUM PRICE */}

                    <div className="mt-5">

                        <label
                            htmlFor="gear-max-price"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[#302d27]
                            "
                        >
                            Maximum Price
                        </label>


                        <input
                            id="gear-max-price"
                            type="number"
                            min="0"
                            value={maxPrice}
                            onChange={(event) =>
                                setMaxPrice(
                                    event.target.value
                                )
                            }
                            placeholder="100"
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-black/[0.09]
                                bg-white
                                px-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-[#d97757]
                                focus:ring-2
                                focus:ring-[#d97757]/10
                            "
                        />

                    </div>


                    {/* =================================================
                        AVAILABILITY DATES
                    ================================================= */}

                    <div
                        className="
                            mt-5
                            border-t
                            border-black/[0.07]
                            pt-5
                        "
                    >

                        <p
                            className="
                                mb-3
                                text-sm
                                font-semibold
                                text-[#302d27]
                            "
                        >
                            Availability Dates
                        </p>


                        {/* START DATE */}

                        <div>

                            <label
                                htmlFor="gear-start-date"
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-medium
                                    text-[#777064]
                                "
                            >
                                Available From
                            </label>


                            <input
                                id="gear-start-date"
                                type="date"
                                min={getTodayString()}
                                value={startDate}
                                onChange={(event) =>
                                    setStartDate(
                                        event.target.value
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-black/[0.09]
                                    bg-white
                                    px-3
                                    text-sm
                                    text-[#514d45]
                                    outline-none
                                    transition
                                    focus:border-[#d97757]
                                    focus:ring-2
                                    focus:ring-[#d97757]/10
                                "
                            />

                        </div>


                        {/* END DATE */}

                        <div className="mt-4">

                            <label
                                htmlFor="gear-end-date"
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-medium
                                    text-[#777064]
                                "
                            >
                                Available Until
                            </label>


                            <input
                                id="gear-end-date"
                                type="date"
                                min={
                                    startDate ||
                                    getTodayString()
                                }
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(
                                        event.target.value
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-black/[0.09]
                                    bg-white
                                    px-3
                                    text-sm
                                    text-[#514d45]
                                    outline-none
                                    transition
                                    focus:border-[#d97757]
                                    focus:ring-2
                                    focus:ring-[#d97757]/10
                                "
                            />

                        </div>


                        {startDate &&
                            endDate &&
                            endDate < startDate && (

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    font-medium
                                    text-red-600
                                "
                            >
                                End date must be after
                                the start date.
                            </p>

                        )}

                    </div>


                    {/* BUTTONS */}

                    <div className="mt-6 space-y-2.5">

                        <button
                            type="button"
                            onClick={
                                applyFilters
                            }
                            disabled={
                                Boolean(
                                    startDate &&
                                    endDate &&
                                    endDate <
                                    startDate
                                )
                            }
                            className="
                                h-11
                                w-full
                                rounded-xl
                                bg-[#211f1a]
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#35322c]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Apply Filters
                        </button>


                        <button
                            type="button"
                            onClick={
                                resetFilters
                            }
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-black/[0.09]
                                bg-white
                                text-sm
                                font-semibold
                                text-[#514d45]
                                transition
                                hover:border-[#d97757]
                                hover:text-[#bd5f3f]
                            "
                        >
                            Reset
                        </button>

                    </div>

                </aside>


                {/* =================================================
                    RESULTS
                ================================================= */}

                <section className="min-w-0">


                    {/* HEADER */}

                    <div
                        className="
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
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#bd5f3f]
                                "
                            >
                                Marketplace
                            </p>


                            <h2
                                className="
                                    mt-1
                                    text-2xl
                                    font-extrabold
                                    tracking-[-0.035em]
                                    text-[#211f1a]
                                    sm:text-3xl
                                "
                            >
                                Available equipment
                            </h2>

                        </div>


                        <div
                            className="
                                shrink-0
                                rounded-full
                                border
                                border-black/[0.07]
                                bg-[#faf9f5]
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-[#726c60]
                            "
                        >

                            {filteredGears.length}{" "}

                            {filteredGears.length === 1
                                ? "item"
                                : "items"}

                        </div>

                    </div>


                    {/* ACTIVE DATE FILTER */}

                    {appliedFilters.startDate &&
                        appliedFilters.endDate && (

                        <div
                            className="
                                mt-4
                                rounded-xl
                                border
                                border-[#dce4d7]
                                bg-[#f1f4ed]
                                px-4
                                py-3
                                text-xs
                                font-medium
                                text-[#4f5d47]
                            "
                        >

                            Showing gear available from{" "}
                            <strong>
                                {appliedFilters.startDate}
                            </strong>{" "}
                            to{" "}
                            <strong>
                                {appliedFilters.endDate}
                            </strong>

                        </div>

                    )}


                    {/* CARDS */}

                    {filteredGears.length > 0 ? (

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-1
                                gap-5
                                sm:grid-cols-2
                                xl:grid-cols-3
                            "
                        >

                            {filteredGears.map(
                                (gear) => (

                                    <GearCard
                                        key={
                                            gear.id
                                        }
                                        gear={
                                            gear
                                        }
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        <div
                            className="
                                mt-5
                                rounded-[1.5rem]
                                border
                                border-black/[0.07]
                                bg-[#faf9f5]
                                px-6
                                py-16
                                text-center
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
                                    bg-[#e2e8dd]
                                    font-bold
                                    text-[#68755f]
                                "
                            >
                                G
                            </div>


                            <h3
                                className="
                                    mt-4
                                    text-xl
                                    font-bold
                                    text-[#211f1a]
                                "
                            >
                                No gear found
                            </h3>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[#777064]
                                "
                            >
                                Try changing your search
                                or filters.
                            </p>


                            <button
                                type="button"
                                onClick={
                                    resetFilters
                                }
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-[#d97757]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[#c96546]
                                "
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </section>

            </div>

        </div>

    );
}