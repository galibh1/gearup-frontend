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

    provider?: {
        name?: string;
    };

    [key: string]: unknown;
};


type GearBrowserProps = {
    gears: Gear[];
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


    const [appliedFilters, setAppliedFilters] =
        useState({
            search: "",
            brand: "",
            category: "all",
            minPrice: "",
            maxPrice: "",
        });


    /* =========================================================
       HELPERS
    ========================================================= */

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


    /* =========================================================
       CATEGORIES
    ========================================================= */

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


    /* =========================================================
       FILTERING
    ========================================================= */

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


                    return (
                        matchesSearch &&
                        matchesBrand &&
                        matchesCategory &&
                        matchesMinimum &&
                        matchesMaximum
                    );

                }
            );

        }, [
            gears,
            appliedFilters,
        ]);


    /* =========================================================
       APPLY
    ========================================================= */

    function applyFilters() {

        setAppliedFilters({
            search,
            brand,
            category,
            minPrice,
            maxPrice,
        });

    }


    /* =========================================================
       RESET
    ========================================================= */

    function resetFilters() {

        setSearch("");

        setBrand("");

        setCategory("all");

        setMinPrice("");

        setMaxPrice("");


        setAppliedFilters({
            search: "",
            brand: "",
            category: "all",
            minPrice: "",
            maxPrice: "",
        });

    }


    /* =========================================================
       ENTER SEARCH
    ========================================================= */

    function handleSearchKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {

        if (
            event.key === "Enter"
        ) {

            applyFilters();

        }

    }


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

                    {/* Search Icon */}

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


                    {/* Input */}

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


                    {/* Search */}

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


            {/* =====================================================
                MOBILE SEARCH BUTTON
            ===================================================== */}

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


                    {/* Brand */}

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


                    {/* Category */}

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


                    {/* Minimum */}

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


                    {/* Maximum */}

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


                    {/* Buttons */}

                    <div className="mt-6 space-y-2.5">

                        <button
                            type="button"
                            onClick={
                                applyFilters
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


                    {/* Header */}

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


                    {/* Cards */}

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