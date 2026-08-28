"use client";

import {
    useEffect,
    useState,
    useTransition,
} from "react";

import {
    toast,
} from "sonner";

import {
    fetchProviderGear,
    fetchCategories,
    addProviderGear,
    editProviderGear,
    removeProviderGear,
} from "../_actions/provider.actions";


export default function ProviderGearSection({
    initialGear,
}: {
    initialGear: any[];
}) {

    const [gear, setGear] =
        useState<any[]>(
            initialGear || []
        );


    const [categories, setCategories] =
        useState<any[]>([]);


    const [showAddForm, setShowAddForm] =
        useState(false);


    const [categoriesLoading, setCategoriesLoading] =
        useState(false);


    const [editingId, setEditingId] =
        useState<string | null>(null);


    const [pending, startTransition] =
        useTransition();


    /* -----------------------------
       ADD FORM
    ----------------------------- */

    const [name, setName] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [depositAmount, setDepositAmount] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [availableStock, setAvailableStock] =
        useState("");

    const [condition, setCondition] =
        useState("GOOD");

    const [location, setLocation] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");


    /* -----------------------------
       EDIT FORM
    ----------------------------- */

    const [editPrice, setEditPrice] =
        useState("");

    const [editStock, setEditStock] =
        useState("");

    const [editDescription, setEditDescription] =
        useState("");


    /* -----------------------------
       SYNC INITIAL GEAR
    ----------------------------- */

    useEffect(() => {

        setGear(
            initialGear || []
        );

    }, [initialGear]);


    /* -----------------------------
       LOAD CATEGORIES
       ONLY WHEN ADD FORM OPENS
    ----------------------------- */

    async function loadCategories() {

        if (categories.length > 0) {
            return;
        }


        setCategoriesLoading(true);


        try {

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
                result.data || []
            );

        } catch (error: any) {

            toast.error(
                error.message ||
                "Failed to load categories"
            );

        } finally {

            setCategoriesLoading(false);

        }

    }


    /* -----------------------------
       ADD FORM TOGGLE
    ----------------------------- */

    function toggleAddForm() {

        const nextState =
            !showAddForm;


        setShowAddForm(
            nextState
        );


        if (
            nextState &&
            categories.length === 0
        ) {

            loadCategories();

        }

    }


    /* -----------------------------
       RESET ADD FORM
    ----------------------------- */

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


    /* -----------------------------
       CREATE GEAR
    ----------------------------- */

    function handleAddGear() {

        const parsedPrice =
            Number(price);

        const parsedDeposit =
            Number(depositAmount);

        const parsedStock =
            Number(stock);

        const parsedAvailableStock =
            Number(availableStock);


        if (!name.trim()) {

            toast.error(
                "Gear name is required"
            );

            return;

        }


        if (
            !price ||
            Number.isNaN(parsedPrice) ||
            parsedPrice < 0
        ) {

            toast.error(
                "Enter a valid daily price"
            );

            return;

        }


        if (
            !depositAmount ||
            Number.isNaN(parsedDeposit) ||
            parsedDeposit < 0
        ) {

            toast.error(
                "Enter a valid deposit amount"
            );

            return;

        }


        if (
            !stock ||
            Number.isNaN(parsedStock) ||
            parsedStock < 0
        ) {

            toast.error(
                "Enter a valid stock quantity"
            );

            return;

        }


        if (
            !availableStock ||
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


        if (categoriesLoading) {

            toast.error(
                "Please wait for categories to load"
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

                    name:
                        name.trim(),

                    slug,

                    description:
                        description.trim(),

                    brand:
                        brand.trim(),

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
                    refreshed.data || []
                );

            } else if (result.data) {

                setGear(
                    (current) => [
                        result.data,
                        ...current,
                    ]
                );

            }


            closeAddForm();

        });

    }


    /* -----------------------------
       EDIT
    ----------------------------- */

    function startEdit(item: any) {

        setEditingId(
            item.id
        );

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


    function cancelEdit() {

        setEditingId(null);

        setEditPrice("");

        setEditStock("");

        setEditDescription("");

    }


    function saveEdit(id: string) {

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


    /* -----------------------------
       DELETE
    ----------------------------- */

    function deleteGear(id: string) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this gear?"
            );


        if (!confirmed) {
            return;
        }


        startTransition(async () => {

            const result =
                await removeProviderGear(
                    id
                );


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

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-6
            ">

                <div>

                    <h2 className="
                        text-3xl
                        font-bold
                    ">

                        My Gear

                    </h2>


                    <p className="
                        text-gray-600
                        mt-1
                    ">

                        Manage the gear you offer
                        for rental.

                    </p>

                </div>


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                    ">

                        {gear.length} items

                    </div>


                    <button
                        type="button"
                        onClick={toggleAddForm}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            font-semibold
                            shadow-sm
                            transition
                        "
                    >

                        {showAddForm
                            ? "Close"
                            : "+ Add Gear"
                        }

                    </button>

                </div>

            </div>


            {/* ADD FORM */}

            {showAddForm && (

                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                    md:p-8
                    shadow-sm
                    mb-8
                ">

                    <div className="
                        mb-6
                    ">

                        <h3 className="
                            text-2xl
                            font-bold
                        ">

                            Add New Gear

                        </h3>


                        <p className="
                            text-gray-600
                            mt-1
                        ">

                            Add equipment to your
                            rental inventory.

                        </p>

                    </div>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    ">

                        {/* NAME */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* BRAND */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* PRICE */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

                                Price Per Day *

                            </label>


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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* DEPOSIT */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

                                Deposit Amount *

                            </label>


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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* STOCK */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* AVAILABLE STOCK */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* CONDITION */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
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

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

                                Category *

                            </label>


                            <select
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    categoriesLoading
                                }
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-white
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    disabled:bg-gray-100
                                    disabled:text-gray-500
                                "
                            >

                                <option value="">

                                    {categoriesLoading
                                        ? "Loading categories..."
                                        : "Select category"
                                    }

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

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="
                            md:col-span-2
                        ">

                            <label className="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            ">

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
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    resize-none
                                "
                            />

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="
                        flex
                        flex-wrap
                        gap-3
                        mt-6
                    ">

                        <button
                            type="button"
                            disabled={
                                pending ||
                                categoriesLoading
                            }
                            onClick={
                                handleAddGear
                            }
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                disabled:opacity-50
                            "
                        >

                            {pending
                                ? "Adding..."
                                : "Add Gear"
                            }

                        </button>


                        <button
                            type="button"
                            disabled={pending}
                            onClick={
                                closeAddForm
                            }
                            className="
                                bg-gray-200
                                hover:bg-gray-300
                                text-gray-800
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                disabled:opacity-50
                            "
                        >

                            Cancel

                        </button>

                    </div>

                </div>

            )}


            {/* GEAR LIST */}

            {gear.length === 0 ? (

                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-10
                    text-center
                ">

                    <div className="
                        text-4xl
                        mb-3
                    ">

                        📦

                    </div>


                    <h3 className="
                        text-xl
                        font-bold
                    ">

                        No gear yet

                    </h3>


                    <p className="
                        text-gray-600
                        mt-2
                    ">

                        Add your first gear item
                        to start receiving rental
                        requests.

                    </p>

                </div>

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                ">

                    {gear.map((item) => (

                        <div
                            key={item.id}
                            className="
                                bg-white
                                border
                                rounded-2xl
                                p-6
                                shadow-sm
                            "
                        >

                            <div className="
                                flex
                                justify-between
                                items-start
                                gap-4
                            ">

                                <div>

                                    <h3 className="
                                        text-xl
                                        font-bold
                                    ">

                                        {item.name}

                                    </h3>


                                    {item.brand && (

                                        <p className="
                                            text-gray-500
                                            mt-1
                                        ">

                                            {item.brand}

                                        </p>

                                    )}

                                </div>


                                <span className="
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    text-sm
                                    font-semibold
                                ">

                                    {item.status ||
                                        "AVAILABLE"}

                                </span>

                            </div>


                            {editingId === item.id ? (

                                <div className="
                                    mt-5
                                    space-y-4
                                ">

                                    <div>

                                        <label className="
                                            block
                                            text-sm
                                            font-semibold
                                            mb-1
                                        ">

                                            Price per day

                                        </label>


                                        <input
                                            type="number"
                                            min="0"
                                            value={editPrice}
                                            onChange={(e) =>
                                                setEditPrice(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />

                                    </div>


                                    <div>

                                        <label className="
                                            block
                                            text-sm
                                            font-semibold
                                            mb-1
                                        ">

                                            Available stock

                                        </label>


                                        <input
                                            type="number"
                                            min="0"
                                            value={editStock}
                                            onChange={(e) =>
                                                setEditStock(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />

                                    </div>


                                    <div>

                                        <label className="
                                            block
                                            text-sm
                                            font-semibold
                                            mb-1
                                        ">

                                            Description

                                        </label>


                                        <textarea
                                            value={
                                                editDescription
                                            }
                                            onChange={(e) =>
                                                setEditDescription(
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            className="
                                                w-full
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />

                                    </div>


                                    <div className="
                                        flex
                                        gap-3
                                    ">

                                        <button
                                            type="button"
                                            disabled={pending}
                                            onClick={() =>
                                                saveEdit(
                                                    item.id
                                                )
                                            }
                                            className="
                                                bg-blue-600
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                font-semibold
                                                disabled:opacity-50
                                            "
                                        >

                                            {pending
                                                ? "Saving..."
                                                : "Save Changes"
                                            }

                                        </button>


                                        <button
                                            type="button"
                                            disabled={pending}
                                            onClick={
                                                cancelEdit
                                            }
                                            className="
                                                bg-gray-200
                                                text-gray-800
                                                px-5
                                                py-2
                                                rounded-lg
                                                font-semibold
                                            "
                                        >

                                            Cancel

                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <>

                                    <div className="
                                        mt-5
                                        space-y-2
                                        text-gray-700
                                    ">

                                        <p>

                                            <strong>
                                                Price/day:
                                            </strong>{" "}

                                            ${item.pricePerDay}

                                        </p>


                                        <p>

                                            <strong>
                                                Stock:
                                            </strong>{" "}

                                            {item.availableStock}

                                            {" / "}

                                            {item.stock}

                                        </p>


                                        {item.location && (

                                            <p>

                                                <strong>
                                                    Location:
                                                </strong>{" "}

                                                {item.location}

                                            </p>

                                        )}


                                        {item.description && (

                                            <p className="
                                                text-gray-600
                                                pt-2
                                            ">

                                                {
                                                    item.description
                                                }

                                            </p>

                                        )}

                                    </div>


                                    <div className="
                                        flex
                                        gap-3
                                        mt-6
                                    ">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startEdit(
                                                    item
                                                )
                                            }
                                            className="
                                                bg-blue-600
                                                hover:bg-blue-700
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                font-semibold
                                            "
                                        >

                                            Edit

                                        </button>


                                        <button
                                            type="button"
                                            disabled={pending}
                                            onClick={() =>
                                                deleteGear(
                                                    item.id
                                                )
                                            }
                                            className="
                                                bg-red-600
                                                hover:bg-red-700
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                font-semibold
                                                disabled:opacity-50
                                            "
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}