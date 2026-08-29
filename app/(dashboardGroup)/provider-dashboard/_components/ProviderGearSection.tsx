"use client";

import {
    useEffect,
    useState,
    useTransition,
} from "react";

import { toast } from "sonner";

import {
    fetchProviderGear,
    fetchCategories,
    addProviderGear,
    editProviderGear,
    removeProviderGear,
} from "../_actions/provider.actions";


type Category = {
    id: string;
    name: string;
};


type GearItem = {
    id: string;
    name: string;
    brand?: string;
    pricePerDay?: string | number;
    depositAmount?: string | number;
    stock?: number;
    availableStock?: number;
    condition?: string;
    status?: string;
    location?: string;
    description?: string;
};


export default function ProviderGearSection({
    initialGear,
}: {
    initialGear: GearItem[];
}) {

    const [gear, setGear] =
        useState<GearItem[]>(initialGear || []);

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [showAddForm, setShowAddForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [pending, startTransition] =
        useTransition();


    // ADD FORM
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [stock, setStock] = useState("");
    const [availableStock, setAvailableStock] = useState("");
    const [condition, setCondition] = useState("GOOD");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");


    // EDIT FORM
    const [editPrice, setEditPrice] = useState("");
    const [editStock, setEditStock] = useState("");
    const [editDescription, setEditDescription] = useState("");


    // LOAD CATEGORIES
    useEffect(() => {

        async function loadCategories() {

            const result =
                await fetchCategories();

            if (!result.success) {

                toast.error(
                    result.message ||
                    "Failed to load categories"
                );

                return;
            }

            setCategories(
                (result.data || []) as Category[]
            );
        }

        loadCategories();

    }, []);


    function resetAddForm() {

        setName("");
        setBrand("");
        setPrice("");
        setDepositAmount("");
        setStock("");
        setAvailableStock("");
        setCondition("GOOD");
        setLocation("");
        setDescription("");
        setCategoryId("");

    }


    function closeAddForm() {

        setShowAddForm(false);
        resetAddForm();

    }


    // ADD GEAR
    function handleAddGear() {

        const parsedPrice = Number(price);
        const parsedDeposit = Number(depositAmount);
        const parsedStock = Number(stock);
        const parsedAvailableStock = Number(
            availableStock
        );


        if (!name.trim()) {

            toast.error(
                "Gear name is required"
            );

            return;
        }


        if (
            Number.isNaN(parsedPrice) ||
            parsedPrice < 0
        ) {

            toast.error(
                "Enter a valid daily price"
            );

            return;
        }


        if (
            Number.isNaN(parsedDeposit) ||
            parsedDeposit < 0
        ) {

            toast.error(
                "Enter a valid deposit amount"
            );

            return;
        }


        if (
            Number.isNaN(parsedStock) ||
            parsedStock < 0
        ) {

            toast.error(
                "Enter a valid stock quantity"
            );

            return;
        }


        if (
            Number.isNaN(parsedAvailableStock) ||
            parsedAvailableStock < 0 ||
            parsedAvailableStock > parsedStock
        ) {

            toast.error(
                "Available stock cannot exceed total stock"
            );

            return;
        }


        if (!categoryId) {

            toast.error(
                "Please select a category"
            );

            return;
        }


        startTransition(async () => {

            const slug =
                name
                    .trim()
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-|-$/g,
                        ""
                    );


            const result =
                await addProviderGear({

                    name: name.trim(),

                    slug,

                    description:
                        description.trim(),

                    brand: brand.trim(),

                    pricePerDay:
                        parsedPrice,

                    depositAmount:
                        parsedDeposit,

                    stock:
                        parsedStock,

                    availableStock:
                        parsedAvailableStock,

                    condition,

                    status:
                        "AVAILABLE",

                    imageUrls: [],

                    specifications: {},

                    location:
                        location.trim(),

                    isFeatured:
                        false,

                    categoryId,

                });


            if (!result.success) {

                toast.error(
                    result.message ||
                    "Failed to create gear"
                );

                return;
            }


            toast.success(
                result.message ||
                "Gear created successfully"
            );


            const refreshed =
                await fetchProviderGear();


            if (refreshed.success) {

                setGear(
                    (refreshed.data || []) as GearItem[]
                );

            } else if (result.data) {

                setGear(
                    (current) => [
                        result.data as GearItem,
                        ...current,
                    ]
                );

            }


            closeAddForm();

        });

    }


    // START EDIT
    function startEdit(
        item: GearItem
    ) {

        setEditingId(item.id);

        setEditPrice(
            String(
                item.pricePerDay ?? ""
            )
        );

        setEditStock(
            String(
                item.availableStock ?? ""
            )
        );

        setEditDescription(
            item.description ?? ""
        );

    }


    // CANCEL EDIT
    function cancelEdit() {

        setEditingId(null);

        setEditPrice("");

        setEditStock("");

        setEditDescription("");

    }


    // SAVE EDIT
    function saveEdit(
        id: string
    ) {

        const parsedPrice =
            Number(editPrice);

        const parsedStock =
            Number(editStock);


        if (
            !editPrice ||
            Number.isNaN(parsedPrice) ||
            parsedPrice < 0
        ) {

            toast.error(
                "Enter a valid daily price"
            );

            return;
        }


        if (
            !editStock ||
            Number.isNaN(parsedStock) ||
            parsedStock < 0
        ) {

            toast.error(
                "Enter a valid available stock"
            );

            return;
        }


        startTransition(async () => {

            const result =
                await editProviderGear(
                    id,
                    {
                        pricePerDay:
                            parsedPrice,

                        availableStock:
                            parsedStock,

                        description:
                            editDescription,
                    }
                );


            if (!result.success) {

                toast.error(
                    result.message ||
                    "Failed to update gear"
                );

                return;
            }


            toast.success(
                result.message ||
                "Gear updated successfully"
            );


            setGear(
                (current) =>
                    current.map(
                        (item) =>
                            item.id === id
                                ? {
                                    ...item,

                                    pricePerDay:
                                        parsedPrice,

                                    availableStock:
                                        parsedStock,

                                    description:
                                        editDescription,
                                }
                                : item
                    )
            );


            cancelEdit();

        });

    }


    // DELETE
    function deleteGear(
        id: string
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this gear?"
            );


        if (!confirmed) {
            return;
        }


        startTransition(async () => {

            const result =
                await removeProviderGear(id);


            if (!result.success) {

                toast.error(
                    result.message ||
                    "Failed to delete gear"
                );

                return;
            }


            toast.success(
                result.message ||
                "Gear deleted successfully"
            );


            setGear(
                (current) =>
                    current.filter(
                        (item) =>
                            item.id !== id
                    )
            );

        });

    }


    return (

        <section
            id="my-gear"
            className="
                mt-16
                scroll-mt-28
            "
        >

            {/* HEADER */}

            <div
                className="
                    mb-7
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >

                <div>

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                h-px
                                w-6
                                bg-[#dc7755]
                            "
                        />

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#dc7755]
                            "
                        >
                            Inventory
                        </p>

                    </div>


                    <h2
                        className="
                            text-3xl
                            font-black
                            tracking-tight
                            md:text-4xl
                        "
                    >
                        My Gear
                    </h2>


                    <p
                        className="
                            mt-2
                            text-[#777267]
                        "
                    >
                        Manage the equipment you
                        offer for rental.
                    </p>

                </div>


                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            rounded-full
                            border
                            border-[#d9e3d2]
                            bg-[#e7eee2]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#617258]
                        "
                    >
                        {gear.length}{" "}
                        {gear.length === 1
                            ? "item"
                            : "items"}
                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setShowAddForm(
                                !showAddForm
                            )
                        }
                        className="
                            rounded-full
                            bg-[#dc7755]
                            px-5
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            shadow-sm
                            transition
                            hover:-translate-y-0.5
                            hover:bg-[#cf6c4b]
                        "
                    >
                        {showAddForm
                            ? "Close"
                            : "+ Add Gear"}
                    </button>

                </div>

            </div>


            {/* ADD FORM */}

            {showAddForm && (

                <div
                    className="
                        mb-8
                        rounded-[28px]
                        border
                        border-[#e5ded2]
                        bg-white
                        p-6
                        shadow-sm
                        md:p-8
                    "
                >

                    <div className="mb-7">

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-[#dc7755]
                            "
                        >
                            New listing
                        </p>


                        <h3
                            className="
                                mt-2
                                text-2xl
                                font-black
                            "
                        >
                            Add New Gear
                        </h3>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-[#777267]
                            "
                        >
                            Add equipment to your
                            rental inventory.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            md:grid-cols-2
                        "
                    >

                        {/* NAME */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Gear Name *
                            </label>


                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Canon EOS R5"
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>


                        {/* BRAND */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Brand
                            </label>


                            <input
                                value={brand}
                                onChange={(e) =>
                                    setBrand(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Canon"
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>


                        {/* PRICE */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Price Per Day *
                            </label>


                            <div
                                className="
                                    relative
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-sm
                                        font-bold
                                        text-[#8b8579]
                                    "
                                >
                                    $
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#ddd7cb]
                                        bg-[#faf9f6]
                                        py-3
                                        pl-8
                                        pr-4
                                        text-sm
                                        outline-none
                                        focus:border-[#dc7755]
                                        focus:bg-white
                                    "
                                />

                            </div>

                        </div>


                        {/* DEPOSIT */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Deposit Amount *
                            </label>


                            <div
                                className="
                                    relative
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-sm
                                        font-bold
                                        text-[#8b8579]
                                    "
                                >
                                    $
                                </span>


                                <input
                                    type="number"
                                    min="0"
                                    value={depositAmount}
                                    onChange={(e) =>
                                        setDepositAmount(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-[#ddd7cb]
                                        bg-[#faf9f6]
                                        py-3
                                        pl-8
                                        pr-4
                                        text-sm
                                        outline-none
                                        focus:border-[#dc7755]
                                        focus:bg-white
                                    "
                                />

                            </div>

                        </div>


                        {/* STOCK */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Total Stock *
                            </label>


                            <input
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) =>
                                    setStock(
                                        e.target.value
                                    )
                                }
                                placeholder="1"
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>


                        {/* AVAILABLE */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Available Stock *
                            </label>


                            <input
                                type="number"
                                min="0"
                                value={availableStock}
                                onChange={(e) =>
                                    setAvailableStock(
                                        e.target.value
                                    )
                                }
                                placeholder="1"
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>


                        {/* CONDITION */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Condition
                            </label>


                            <select
                                value={condition}
                                onChange={(e) =>
                                    setCondition(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            >

                                <option value="NEW">
                                    New
                                </option>

                                <option value="LIKE_NEW">
                                    Like New
                                </option>

                                <option value="GOOD">
                                    Good
                                </option>

                                <option value="FAIR">
                                    Fair
                                </option>

                                <option value="USED">
                                    Used
                                </option>

                            </select>

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Category *
                            </label>


                            <select
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            >

                                <option value="">
                                    Select category
                                </option>


                                {categories.map(
                                    (category) => (

                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.id
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* LOCATION */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Location
                            </label>


                            <input
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Dhaka"
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div
                            className="
                                md:col-span-2
                            "
                        >

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-bold
                                    text-[#34322d]
                                "
                            >
                                Description
                            </label>


                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                rows={4}
                                placeholder="Describe your gear..."
                                className="
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border
                                    border-[#ddd7cb]
                                    bg-[#faf9f6]
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    focus:border-[#dc7755]
                                    focus:bg-white
                                "
                            />

                        </div>

                    </div>


                    {/* BUTTONS */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        <button
                            type="button"
                            disabled={pending}
                            onClick={
                                handleAddGear
                            }
                            className="
                                rounded-full
                                bg-[#dc7755]
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-[#cf6c4b]
                                disabled:opacity-50
                            "
                        >
                            {pending
                                ? "Adding..."
                                : "Add Gear"}
                        </button>


                        <button
                            type="button"
                            disabled={pending}
                            onClick={
                                closeAddForm
                            }
                            className="
                                rounded-full
                                border
                                border-[#ddd7cb]
                                bg-[#f3f0e8]
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-[#4e4a42]
                                transition
                                hover:bg-[#e9e5db]
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            )}


            {/* EMPTY STATE */}

            {gear.length === 0 ? (

                <div
                    className="
                        rounded-[28px]
                        border
                        border-[#e5ded2]
                        bg-white
                        px-6
                        py-16
                        text-center
                        shadow-sm
                    "
                >

                    <div
                        className="
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
                        "
                    >
                        📦
                    </div>


                    <h3
                        className="
                            text-xl
                            font-black
                        "
                    >
                        No gear yet
                    </h3>


                    <p
                        className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-6
                            text-[#888277]
                        "
                    >
                        Add your first gear item
                        to start receiving rental
                        requests.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            setShowAddForm(true)
                        }
                        className="
                            mt-6
                            rounded-full
                            bg-[#dc7755]
                            px-5
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-[#cf6c4b]
                        "
                    >
                        + Add your first gear
                    </button>

                </div>

            ) : (

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        lg:grid-cols-2
                    "
                >

                    {gear.map((item) => (

                        <div
                            key={item.id}
                            className="
                                overflow-hidden
                                rounded-[28px]
                                border
                                border-[#e5ded2]
                                bg-white
                                shadow-sm
                                transition
                                hover:-translate-y-0.5
                                hover:shadow-md
                            "
                        >

                            <div
                                className="
                                    p-6
                                    md:p-7
                                "
                            >

                                {/* CARD HEADER */}

                                <div
                                    className="
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            min-w-0
                                        "
                                    >

                                        <h3
                                            className="
                                                text-xl
                                                font-black
                                                leading-tight
                                                tracking-tight
                                            "
                                        >
                                            {item.name}
                                        </h3>


                                        {item.brand && (

                                            <p
                                                className="
                                                    mt-1.5
                                                    text-sm
                                                    font-medium
                                                    text-[#918b80]
                                                "
                                            >
                                                {item.brand}
                                            </p>

                                        )}

                                    </div>


                                    <span
                                        className={`
                                            shrink-0
                                            rounded-full
                                            px-3
                                            py-1.5
                                            text-xs
                                            font-bold
                                            ${
                                                item.status ===
                                                "UNAVAILABLE"
                                                    ? "bg-[#f6ddd5] text-[#b85d40]"
                                                    : "bg-[#e2eadc] text-[#617258]"
                                            }
                                        `}
                                    >
                                        {item.status ||
                                            "AVAILABLE"}
                                    </span>

                                </div>


                                {editingId === item.id ? (

                                    /* EDIT */

                                    <div
                                        className="
                                            mt-6
                                            rounded-2xl
                                            bg-[#f8f5ed]
                                            p-5
                                        "
                                    >

                                        <p
                                            className="
                                                mb-5
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-[0.15em]
                                                text-[#dc7755]
                                            "
                                        >
                                            Edit listing
                                        </p>


                                        <div
                                            className="
                                                space-y-4
                                            "
                                        >

                                            <div>

                                                <label
                                                    className="
                                                        mb-2
                                                        block
                                                        text-sm
                                                        font-bold
                                                    "
                                                >
                                                    Price per day
                                                </label>


                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        editPrice
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setEditPrice(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#ddd7cb]
                                                        bg-white
                                                        px-4
                                                        py-3
                                                        outline-none
                                                        focus:border-[#dc7755]
                                                    "
                                                />

                                            </div>


                                            <div>

                                                <label
                                                    className="
                                                        mb-2
                                                        block
                                                        text-sm
                                                        font-bold
                                                    "
                                                >
                                                    Available stock
                                                </label>


                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        editStock
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setEditStock(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        rounded-xl
                                                        border
                                                        border-[#ddd7cb]
                                                        bg-white
                                                        px-4
                                                        py-3
                                                        outline-none
                                                        focus:border-[#dc7755]
                                                    "
                                                />

                                            </div>


                                            <div>

                                                <label
                                                    className="
                                                        mb-2
                                                        block
                                                        text-sm
                                                        font-bold
                                                    "
                                                >
                                                    Description
                                                </label>


                                                <textarea
                                                    value={
                                                        editDescription
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setEditDescription(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    rows={4}
                                                    className="
                                                        w-full
                                                        resize-none
                                                        rounded-xl
                                                        border
                                                        border-[#ddd7cb]
                                                        bg-white
                                                        px-4
                                                        py-3
                                                        outline-none
                                                        focus:border-[#dc7755]
                                                    "
                                                />

                                            </div>


                                            <div
                                                className="
                                                    flex
                                                    flex-wrap
                                                    gap-3
                                                    pt-1
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    disabled={
                                                        pending
                                                    }
                                                    onClick={() =>
                                                        saveEdit(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        rounded-full
                                                        bg-[#dc7755]
                                                        px-5
                                                        py-2.5
                                                        text-sm
                                                        font-bold
                                                        text-white
                                                        transition
                                                        hover:bg-[#cf6c4b]
                                                        disabled:opacity-50
                                                    "
                                                >
                                                    {pending
                                                        ? "Saving..."
                                                        : "Save Changes"}
                                                </button>


                                                <button
                                                    type="button"
                                                    disabled={
                                                        pending
                                                    }
                                                    onClick={
                                                        cancelEdit
                                                    }
                                                    className="
                                                        rounded-full
                                                        bg-[#e8e4dc]
                                                        px-5
                                                        py-2.5
                                                        text-sm
                                                        font-bold
                                                        text-[#4e4a42]
                                                        transition
                                                        hover:bg-[#ddd8ce]
                                                    "
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ) : (

                                    /* NORMAL CARD */

                                    <>

                                        <div
                                            className="
                                                mt-6
                                                grid
                                                grid-cols-2
                                                gap-4
                                                border-y
                                                border-[#eee9df]
                                                py-5
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wide
                                                        text-[#9a9489]
                                                    "
                                                >
                                                    Price / day
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-xl
                                                        font-black
                                                        text-[#dc7755]
                                                    "
                                                >
                                                    $
                                                    {
                                                        item.pricePerDay ??
                                                        "0"
                                                    }
                                                </p>

                                            </div>


                                            <div>

                                                <p
                                                    className="
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wide
                                                        text-[#9a9489]
                                                    "
                                                >
                                                    Stock
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-xl
                                                        font-black
                                                    "
                                                >
                                                    {
                                                        item.availableStock ??
                                                        0
                                                    }

                                                    <span
                                                        className="
                                                            ml-1
                                                            text-sm
                                                            font-medium
                                                            text-[#999287]
                                                        "
                                                    >
                                                        /
                                                        {
                                                            item.stock ??
                                                            0
                                                        }
                                                    </span>

                                                </p>

                                            </div>

                                        </div>


                                        {item.location && (

                                            <div
                                                className="
                                                    mt-5
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-[#777267]
                                                "
                                            >

                                                <span
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-[#eeeadf]
                                                        text-xs
                                                    "
                                                >
                                                    ●
                                                </span>


                                                <span>
                                                    {
                                                        item.location
                                                    }
                                                </span>

                                            </div>

                                        )}


                                        {item.description && (

                                            <p
                                                className="
                                                    mt-4
                                                    line-clamp-3
                                                    text-sm
                                                    leading-6
                                                    text-[#777267]
                                                "
                                            >
                                                {
                                                    item.description
                                                }
                                            </p>

                                        )}


                                        <div
                                            className="
                                                mt-6
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEdit(
                                                        item
                                                    )
                                                }
                                                className="
                                                    rounded-full
                                                    bg-[#24231f]
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:bg-[#35332e]
                                                "
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                disabled={
                                                    pending
                                                }
                                                onClick={() =>
                                                    deleteGear(
                                                        item.id
                                                    )
                                                }
                                                className="
                                                    rounded-full
                                                    border
                                                    border-[#ead6cf]
                                                    bg-[#fff7f4]
                                                    px-5
                                                    py-2.5
                                                    text-sm
                                                    font-bold
                                                    text-[#b85d40]
                                                    transition
                                                    hover:bg-[#fbe9e3]
                                                    disabled:opacity-50
                                                "
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );
}