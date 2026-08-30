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
    slug?: string;

    brand?: string | null;

    pricePerDay?: string | number;
    depositAmount?: string | number;

    stock?: string | number;
    availableStock?: string | number;

    condition?: string;
    status?: string;

    location?: string | null;
    description?: string;

    imageUrls?: string[];

    categoryId?: string;

    category?: {
        id?: string;
        name?: string;
    };

    provider?: {
        name?: string;
        businessName?: string;
    };
};


const CONDITIONS = [
    {
        value: "NEW",
        label: "New",
    },
    {
        value: "LIKE_NEW",
        label: "Like New",
    },
    {
        value: "GOOD",
        label: "Good",
    },
    {
        value: "FAIR",
        label: "Fair",
    },
    {
        value: "POOR",
        label: "Poor",
    },
];


function createSlug(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


function getNumber(
    value: string | number | undefined
) {
    const number = Number(value ?? 0);

    return Number.isFinite(number)
        ? number
        : 0;
}


function getStatus(
    availableStock: string | number | undefined
) {
    return getNumber(availableStock) > 0
        ? "AVAILABLE"
        : "UNAVAILABLE";
}


export default function ProviderGearSection({
    initialGear,
}: {
    initialGear: GearItem[];
}) {

    const [gear, setGear] =
        useState<GearItem[]>(
            initialGear || []
        );

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [showAddForm, setShowAddForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [pending, startTransition] =
        useTransition();


    // =========================================================
    // ADD FORM STATE
    // =========================================================

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

    const [categoryId, setCategoryId] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [imageUrls, setImageUrls] =
        useState<string[]>([""]);


    // =========================================================
    // EDIT FORM STATE
    // =========================================================

    const [editName, setEditName] =
        useState("");

    const [editBrand, setEditBrand] =
        useState("");

    const [editPrice, setEditPrice] =
        useState("");

    const [editDeposit, setEditDeposit] =
        useState("");

    const [editTotalStock, setEditTotalStock] =
        useState("");

    const [editAvailableStock, setEditAvailableStock] =
        useState("");

    const [editCondition, setEditCondition] =
        useState("GOOD");

    const [editCategoryId, setEditCategoryId] =
        useState("");

    const [editLocation, setEditLocation] =
        useState("");

    const [editDescription, setEditDescription] =
        useState("");

    const [editImages, setEditImages] =
        useState<string[]>([]);


    // =========================================================
    // LOAD CATEGORIES
    // =========================================================

    useEffect(() => {

        async function loadCategories() {

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
                    (result.data || []) as Category[]
                );

            } catch (error) {

                toast.error(
                    "Failed to load categories"
                );

            }

        }

        loadCategories();

    }, []);


    // =========================================================
    // REFRESH GEAR
    // =========================================================

    async function refreshGear() {

        try {

            const refreshed =
                await fetchProviderGear();

            if (!refreshed.success) {

                toast.error(
                    refreshed.message ||
                    "Failed to refresh gear"
                );

                return;

            }

            setGear(
                (refreshed.data || []) as GearItem[]
            );

        } catch (error) {

            toast.error(
                "Failed to refresh gear"
            );

        }

    }


    // =========================================================
    // RESET ADD FORM
    // =========================================================

    function resetAddForm() {

        setName("");
        setBrand("");
        setPrice("");
        setDepositAmount("");
        setStock("");
        setAvailableStock("");
        setCondition("GOOD");
        setCategoryId("");
        setLocation("");
        setDescription("");
        setImageUrls([""]);

    }


    function closeAddForm() {

        setShowAddForm(false);
        resetAddForm();

    }


    // =========================================================
    // ADD IMAGE INPUT
    // =========================================================

    function addImageField() {

        setImageUrls(
            (current) => [
                ...current,
                "",
            ]
        );

    }


    function removeImageField(
        index: number
    ) {

        setImageUrls(
            (current) => {

                const next =
                    current.filter(
                        (_, i) =>
                            i !== index
                    );

                return next.length > 0
                    ? next
                    : [""];
            }
        );

    }


    function updateImageField(
        index: number,
        value: string
    ) {

        setImageUrls(
            (current) =>
                current.map(
                    (item, i) =>
                        i === index
                            ? value
                            : item
                )
        );

    }


    // =========================================================
    // EDIT IMAGE INPUT
    // =========================================================

    function addEditImageField() {

        setEditImages(
            (current) => [
                ...current,
                "",
            ]
        );

    }


    function removeEditImageField(
        index: number
    ) {

        setEditImages(
            (current) => {

                const next =
                    current.filter(
                        (_, i) =>
                            i !== index
                    );

                return next;

            }
        );

    }


    function updateEditImageField(
        index: number,
        value: string
    ) {

        setEditImages(
            (current) =>
                current.map(
                    (item, i) =>
                        i === index
                            ? value
                            : item
                )
        );

    }


    // =========================================================
    // ADD GEAR
    // =========================================================

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
            !Number.isFinite(parsedPrice) ||
            parsedPrice < 0
        ) {

            toast.error(
                "Enter a valid daily price"
            );

            return;

        }


        if (
            !Number.isFinite(parsedDeposit) ||
            parsedDeposit < 0
        ) {

            toast.error(
                "Enter a valid deposit amount"
            );

            return;

        }


        if (
            !Number.isInteger(parsedStock) ||
            parsedStock < 1
        ) {

            toast.error(
                "Total stock must be at least 1"
            );

            return;

        }


        if (
            !Number.isInteger(
                parsedAvailableStock
            ) ||
            parsedAvailableStock < 0
        ) {

            toast.error(
                "Enter a valid available stock"
            );

            return;

        }


        if (
            parsedAvailableStock >
            parsedStock
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


        const cleanedImages =
            imageUrls
                .map(
                    (url) =>
                        url.trim()
                )
                .filter(
                    Boolean
                );


        const slug =
            createSlug(name);


        const data = {

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
                getStatus(
                    parsedAvailableStock
                ),

            imageUrls:
                cleanedImages,

            specifications:
                {},

            location:
                location.trim(),

            isFeatured:
                false,

            categoryId,

        };


        startTransition(
            async () => {

                const result =
                    await addProviderGear(
                        data
                    );


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


                if (result.data) {

                    setGear(
                        (current) => [
                            result.data as GearItem,
                            ...current,
                        ]
                    );

                } else {

                    await refreshGear();

                }


                closeAddForm();

            }
        );

    }


    // =========================================================
    // START EDIT
    // =========================================================

    function startEdit(
        item: GearItem
    ) {

        setEditingId(item.id);

        setEditName(
            item.name || ""
        );

        setEditBrand(
            item.brand || ""
        );

        setEditPrice(
            String(
                item.pricePerDay ?? ""
            )
        );

        setEditDeposit(
            String(
                item.depositAmount ?? ""
            )
        );

        setEditTotalStock(
            String(
                item.stock ?? ""
            )
        );

        setEditAvailableStock(
            String(
                item.availableStock ?? ""
            )
        );

        setEditCondition(
            item.condition ||
            "GOOD"
        );

        setEditCategoryId(
            item.categoryId ||
            item.category?.id ||
            ""
        );

        setEditLocation(
            item.location || ""
        );

        setEditDescription(
            item.description || ""
        );

        setEditImages(
            item.imageUrls &&
            item.imageUrls.length > 0
                ? [...item.imageUrls]
                : []
        );

    }


    // =========================================================
    // CANCEL EDIT
    // =========================================================

    function cancelEdit() {

        setEditingId(null);

        setEditName("");
        setEditBrand("");
        setEditPrice("");
        setEditDeposit("");
        setEditTotalStock("");
        setEditAvailableStock("");
        setEditCondition("GOOD");
        setEditCategoryId("");
        setEditLocation("");
        setEditDescription("");
        setEditImages([]);

    }


    // =========================================================
    // SAVE EDIT
    // =========================================================

    function handleSaveEdit(
        id: string
    ) {

        const parsedPrice =
            Number(editPrice);

        const parsedDeposit =
            Number(editDeposit);

        const parsedStock =
            Number(editTotalStock);

        const parsedAvailableStock =
            Number(editAvailableStock);


        if (!editName.trim()) {

            toast.error(
                "Gear name is required"
            );

            return;

        }


        if (
            !Number.isFinite(parsedPrice) ||
            parsedPrice < 0
        ) {

            toast.error(
                "Enter a valid daily price"
            );

            return;

        }


        if (
            !Number.isFinite(parsedDeposit) ||
            parsedDeposit < 0
        ) {

            toast.error(
                "Enter a valid deposit amount"
            );

            return;

        }


        if (
            !Number.isInteger(parsedStock) ||
            parsedStock < 1
        ) {

            toast.error(
                "Total stock must be at least 1"
            );

            return;

        }


        if (
            !Number.isInteger(
                parsedAvailableStock
            ) ||
            parsedAvailableStock < 0
        ) {

            toast.error(
                "Available stock must be 0 or greater"
            );

            return;

        }


        if (
            parsedAvailableStock >
            parsedStock
        ) {

            toast.error(
                "Available stock cannot exceed total stock"
            );

            return;

        }


        const cleanedImages =
            editImages
                .map(
                    (url) =>
                        url.trim()
                )
                .filter(
                    Boolean
                );


        const data = {

            name:
                editName.trim(),

            brand:
                editBrand.trim()
                    ? editBrand.trim()
                    : null,

            pricePerDay:
                parsedPrice,

            depositAmount:
                parsedDeposit,

            stock:
                parsedStock,

            availableStock:
                parsedAvailableStock,

            condition:
                editCondition,

            status:
                getStatus(
                    parsedAvailableStock
                ),

            imageUrls:
                cleanedImages,

            location:
                editLocation.trim()
                    ? editLocation.trim()
                    : null,

            categoryId:
                editCategoryId || undefined,

            description:
                editDescription.trim(),

        };


        startTransition(
            async () => {

                const result =
                    await editProviderGear(
                        id,
                        data
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


                if (result.data) {

                    setGear(
                        (current) =>
                            current.map(
                                (item) =>
                                    item.id === id
                                        ? {
                                            ...item,
                                            ...(result.data as GearItem),
                                        }
                                        : item
                            )
                    );

                } else {

                    await refreshGear();

                }


                cancelEdit();

            }
        );

    }


    // =========================================================
    // DELETE GEAR
    // =========================================================

    function handleDelete(
        id: string
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this gear?"
            );


        if (!confirmed) {

            return;

        }


        startTransition(
            async () => {

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

            }
        );

    }


    // =========================================================
    // AVAILABLE STOCK QUICK VALIDATION
    // =========================================================

    const addStockNumber =
        Number(stock);

    const addAvailableNumber =
        Number(availableStock);

    const editStockNumber =
        Number(editTotalStock);

    const editAvailableNumber =
        Number(editAvailableStock);


    return (

        <section
            id="my-gear"
            className="
                w-full
                px-4
                py-8
                sm:px-6
                lg:px-8
            "
        >

            <div
                className="
                    mx-auto
                    max-w-7xl
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        mb-8
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-[#d97757]
                            "
                        >
                            Provider Inventory
                        </p>

                        <h2
                            className="
                                mt-1
                                text-3xl
                                font-extrabold
                                tracking-[-0.03em]
                                text-[#211f1a]
                            "
                        >
                            My Gear
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-[#827b6d]
                            "
                        >
                            Manage your gear listings,
                            prices, stock and images.
                        </p>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                rounded-full
                                border
                                border-[#d8dfd0]
                                bg-[#edf2e9]
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-[#63755a]
                            "
                        >
                            {gear.length} Items
                        </span>


                        <button
                            type="button"
                            onClick={() => {

                                if (
                                    showAddForm
                                ) {

                                    closeAddForm();

                                } else {

                                    setShowAddForm(
                                        true
                                    );

                                    setEditingId(
                                        null
                                    );

                                }

                            }}
                            className="
                                rounded-full
                                bg-[#d97757]
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-[#c76547]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                            disabled={pending}
                        >
                            {showAddForm
                                ? "Cancel"
                                : "+ Add Gear"}
                        </button>

                    </div>

                </div>


                {/* =================================================
                    ADD GEAR FORM
                ================================================= */}

                {showAddForm && (

                    <div
                        className="
                            mb-8
                            rounded-[24px]
                            border
                            border-[#e2ddd2]
                            bg-[#faf7f0]
                            p-6
                            shadow-sm
                            sm:p-8
                        "
                    >

                        <div
                            className="
                                mb-7
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#d97757]
                                "
                            >
                                New Listing
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-2xl
                                    font-extrabold
                                    text-[#211f1a]
                                "
                            >
                                Add Gear
                            </h3>

                        </div>


                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            "
                        >

                            <div className="md:col-span-2">

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Gear Name *
                                </label>

                                <input
                                    value={name}
                                    onChange={(event) =>
                                        setName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. Trek Mountain Bike"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        transition
                                        focus:border-[#d97757]
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
                                        text-[#211f1a]
                                    "
                                >
                                    Brand
                                </label>

                                <input
                                    value={brand}
                                    onChange={(event) =>
                                        setBrand(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. Trek"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
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
                                        text-[#211f1a]
                                    "
                                >
                                    Category *
                                </label>

                                <select
                                    value={categoryId}
                                    onChange={(event) =>
                                        setCategoryId(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
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
                                                {category.name}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>


                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Price Per Day *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={(event) =>
                                        setPrice(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
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
                                        text-[#211f1a]
                                    "
                                >
                                    Deposit Amount *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={depositAmount}
                                    onChange={(event) =>
                                        setDepositAmount(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
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
                                        text-[#211f1a]
                                    "
                                >
                                    Total Stock *
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={stock}
                                    onChange={(event) =>
                                        setStock(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
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
                                        text-[#211f1a]
                                    "
                                >
                                    Available Stock *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={availableStock}
                                    onChange={(event) =>
                                        setAvailableStock(
                                            event.target.value
                                        )
                                    }
                                    className={`
                                        w-full
                                        rounded-xl
                                        border
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        ${
                                            Number.isFinite(
                                                addStockNumber
                                            ) &&
                                            Number.isFinite(
                                                addAvailableNumber
                                            ) &&
                                            addAvailableNumber >
                                                addStockNumber
                                                ? "border-red-400"
                                                : "border-[#d9d3c7]"
                                        }
                                    `}
                                />

                                {Number.isFinite(
                                    addStockNumber
                                ) &&
                                    Number.isFinite(
                                        addAvailableNumber
                                    ) &&
                                    addAvailableNumber >
                                        addStockNumber && (

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                font-semibold
                                                text-red-600
                                            "
                                        >
                                            Available stock cannot
                                            exceed total stock.
                                        </p>

                                    )}

                            </div>


                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Condition
                                </label>

                                <select
                                    value={condition}
                                    onChange={(event) =>
                                        setCondition(
                                            event.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
                                    "
                                >

                                    {CONDITIONS.map(
                                        (item) => (
                                            <option
                                                key={
                                                    item.value
                                                }
                                                value={
                                                    item.value
                                                }
                                            >
                                                {item.label}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>


                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Location
                                </label>

                                <input
                                    value={location}
                                    onChange={(event) =>
                                        setLocation(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Dhaka, Bangladesh"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
                                    "
                                />

                            </div>


                            <div className="md:col-span-2">

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-bold
                                        text-[#211f1a]
                                    "
                                >
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Describe the gear..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border
                                        border-[#d9d3c7]
                                        bg-white
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-[#d97757]
                                    "
                                />

                            </div>


                            {/* ADD IMAGES */}

                            <div
                                className="
                                    md:col-span-2
                                "
                            >

                                <div
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <label
                                        className="
                                            text-sm
                                            font-bold
                                            text-[#211f1a]
                                        "
                                    >
                                        Images
                                    </label>

                                    <button
                                        type="button"
                                        onClick={
                                            addImageField
                                        }
                                        className="
                                            text-sm
                                            font-bold
                                            text-[#d97757]
                                            hover:underline
                                        "
                                    >
                                        + Add Image
                                    </button>

                                </div>


                                <div
                                    className="
                                        space-y-3
                                    "
                                >

                                    {imageUrls.map(
                                        (
                                            url,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    index
                                                }
                                                className="
                                                    flex
                                                    gap-2
                                                "
                                            >

                                                <input
                                                    value={
                                                        url
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateImageField(
                                                            index,
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="https://example.com/image.jpg"
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                        rounded-xl
                                                        border
                                                        border-[#d9d3c7]
                                                        bg-white
                                                        px-4
                                                        py-3
                                                        outline-none
                                                        focus:border-[#d97757]
                                                    "
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImageField(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        rounded-xl
                                                        border
                                                        border-[#efd3ca]
                                                        px-4
                                                        font-bold
                                                        text-[#bd5f3f]
                                                    "
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                                <p
                                    className="
                                        mt-2
                                        text-xs
                                        text-[#827b6d]
                                    "
                                >
                                    Paste direct public image
                                    URLs. You can add multiple
                                    images.
                                </p>

                            </div>

                        </div>


                        <div
                            className="
                                mt-7
                                flex
                                gap-3
                            "
                        >

                            <button
                                type="button"
                                onClick={
                                    handleAddGear
                                }
                                disabled={
                                    pending
                                }
                                className="
                                    rounded-xl
                                    bg-[#211f1a]
                                    px-6
                                    py-3
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-[#d97757]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                {pending
                                    ? "Saving..."
                                    : "Create Gear"}
                            </button>


                            <button
                                type="button"
                                onClick={
                                    closeAddForm
                                }
                                className="
                                    rounded-xl
                                    bg-[#e8e3da]
                                    px-6
                                    py-3
                                    font-bold
                                    text-[#211f1a]
                                "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {gear.length === 0 &&
                    !showAddForm && (

                        <div
                            className="
                                rounded-[24px]
                                border
                                border-dashed
                                border-[#d9d3c7]
                                bg-white
                                px-6
                                py-16
                                text-center
                            "
                        >

                            <h3
                                className="
                                    text-xl
                                    font-extrabold
                                    text-[#211f1a]
                                "
                            >
                                No gear listed yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[#827b6d]
                                "
                            >
                                Add your first gear item
                                to start accepting rentals.
                            </p>

                        </div>

                    )}


                {/* =================================================
                    GEAR GRID
                ================================================= */}

                {gear.length > 0 && (

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            lg:grid-cols-2
                        "
                    >

                        {gear.map(
                            (item) => {

                                const isEditing =
                                    editingId ===
                                    item.id;


                                const currentImages =
                                    item.imageUrls || [];


                                const available =
                                    getNumber(
                                        item.availableStock
                                    );

                                const total =
                                    getNumber(
                                        item.stock
                                    );


                                const isAvailable =
                                    available > 0;


                                return (

                                    <article
                                        key={
                                            item.id
                                        }
                                        className="
                                            overflow-hidden
                                            rounded-[24px]
                                            border
                                            border-[#e2ddd2]
                                            bg-white
                                            shadow-[0_5px_20px_rgba(33,31,26,0.08)]
                                        "
                                    >

                                        {/* IMAGE */}

                                        <div
                                            className="
                                                relative
                                                h-64
                                                w-full
                                                overflow-hidden
                                                bg-[#eeeade]
                                            "
                                        >

                                            {currentImages[0] ? (

                                                <img
                                                    src={
                                                        currentImages[0]
                                                    }
                                                    alt={
                                                        item.name
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                            ) : (

                                                <div
                                                    className="
                                                        flex
                                                        h-full
                                                        items-center
                                                        justify-center
                                                        px-6
                                                        text-center
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-lg
                                                                font-bold
                                                                text-[#827b6d]
                                                            "
                                                        >
                                                            No image
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-sm
                                                                text-[#9b9488]
                                                            "
                                                        >
                                                            Add an image
                                                            URL below.
                                                        </p>

                                                    </div>

                                                </div>

                                            )}

                                        </div>


                                        {/* CARD CONTENT */}

                                        <div
                                            className="
                                                p-6
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-4
                                                "
                                            >

                                                <div>

                                                    <h3
                                                        className="
                                                            text-2xl
                                                            font-extrabold
                                                            leading-tight
                                                            tracking-[-0.03em]
                                                            text-[#211f1a]
                                                        "
                                                    >
                                                        {item.name}
                                                    </h3>

                                                    <p
                                                        className="
                                                            mt-2
                                                            text-sm
                                                            text-[#827b6d]
                                                        "
                                                    >
                                                        {item.brand ||
                                                            "No brand"}
                                                    </p>

                                                </div>


                                                <span
                                                    className={`
                                                        shrink-0
                                                        rounded-full
                                                        px-4
                                                        py-2
                                                        text-xs
                                                        font-bold
                                                        ${
                                                            isAvailable
                                                                ? "bg-[#e7efe2] text-[#63755a]"
                                                                : "bg-[#f7ddd5] text-[#bd5f3f]"
                                                        }
                                                    `}
                                                >
                                                    {isAvailable
                                                        ? "AVAILABLE"
                                                        : "UNAVAILABLE"}
                                                </span>

                                            </div>


                                            {/* INFO */}

                                            <div
                                                className="
                                                    mt-6
                                                    grid
                                                    grid-cols-2
                                                    gap-4
                                                    border-y
                                                    border-[#eee8dc]
                                                    py-5
                                                "
                                            >

                                                <div>

                                                    <p
                                                        className="
                                                            text-xs
                                                            font-semibold
                                                            uppercase
                                                            tracking-wider
                                                            text-[#9b9488]
                                                        "
                                                    >
                                                        Price / Day
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xl
                                                            font-extrabold
                                                            text-[#d97757]
                                                        "
                                                    >
                                                        $
                                                        {getNumber(
                                                            item.pricePerDay
                                                        )}
                                                    </p>

                                                </div>


                                                <div>

                                                    <p
                                                        className="
                                                            text-xs
                                                            font-semibold
                                                            uppercase
                                                            tracking-wider
                                                            text-[#9b9488]
                                                        "
                                                    >
                                                        Stock
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xl
                                                            font-extrabold
                                                            text-[#211f1a]
                                                        "
                                                    >
                                                        {available}
                                                        <span
                                                            className="
                                                                ml-1
                                                                text-sm
                                                                font-medium
                                                                text-[#9b9488]
                                                            "
                                                        >
                                                            / {total}
                                                        </span>
                                                    </p>

                                                </div>

                                            </div>


                                            {item.location && (

                                                <p
                                                    className="
                                                        mt-5
                                                        text-sm
                                                        text-[#827b6d]
                                                    "
                                                >
                                                    ●{" "}
                                                    {item.location}
                                                </p>

                                            )}


                                            {item.description && (

                                                <p
                                                    className="
                                                        mt-4
                                                        text-sm
                                                        leading-6
                                                        text-[#827b6d]
                                                    "
                                                >
                                                    {
                                                        item.description
                                                    }
                                                </p>

                                            )}


                                            {/* =================================================
                                                EDIT FORM
                                            ================================================= */}

                                            {isEditing && (

                                                <div
                                                    className="
                                                        mt-6
                                                        rounded-[20px]
                                                        bg-[#faf7f0]
                                                        p-5
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-bold
                                                            uppercase
                                                            tracking-[0.16em]
                                                            text-[#d97757]
                                                        "
                                                    >
                                                        Edit Listing
                                                    </p>

                                                    <h4
                                                        className="
                                                            mt-2
                                                            text-xl
                                                            font-extrabold
                                                            text-[#211f1a]
                                                        "
                                                    >
                                                        Update Gear
                                                    </h4>


                                                    <div
                                                        className="
                                                            mt-6
                                                            grid
                                                            grid-cols-1
                                                            gap-4
                                                            sm:grid-cols-2
                                                        "
                                                    >

                                                        {/* NAME */}

                                                        <div
                                                            className="
                                                                sm:col-span-2
                                                            "
                                                        >

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Gear Name *
                                                            </label>

                                                            <input
                                                                value={
                                                                    editName
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditName(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
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
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Brand
                                                            </label>

                                                            <input
                                                                value={
                                                                    editBrand
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditBrand(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
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
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Price Per Day *
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                value={
                                                                    editPrice
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditPrice(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            />

                                                        </div>


                                                        {/* DEPOSIT */}

                                                        <div>

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Deposit Amount *
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                value={
                                                                    editDeposit
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditDeposit(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            />

                                                        </div>


                                                        {/* TOTAL STOCK */}

                                                        <div>

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Total Stock *
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="1"
                                                                step="1"
                                                                value={
                                                                    editTotalStock
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditTotalStock(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            />

                                                        </div>


                                                        {/* AVAILABLE STOCK */}

                                                        <div>

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Available Stock *
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="1"
                                                                value={
                                                                    editAvailableStock
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditAvailableStock(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className={`
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    ${
                                                                        editAvailableNumber >
                                                                        editStockNumber
                                                                            ? "border-red-400"
                                                                            : "border-[#d9d3c7]"
                                                                    }
                                                                `}
                                                            />

                                                            {editAvailableNumber >
                                                                editStockNumber && (

                                                                <p
                                                                    className="
                                                                        mt-1
                                                                        text-xs
                                                                        font-semibold
                                                                        text-red-600
                                                                    "
                                                                >
                                                                    Available stock
                                                                    cannot exceed
                                                                    total stock.
                                                                </p>

                                                            )}

                                                        </div>


                                                        {/* CONDITION */}

                                                        <div>

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Condition
                                                            </label>

                                                            <select
                                                                value={
                                                                    editCondition
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditCondition(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            >

                                                                {CONDITIONS.map(
                                                                    (
                                                                        item
                                                                    ) => (

                                                                        <option
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </option>

                                                                    )
                                                                )}

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
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Category
                                                            </label>

                                                            <select
                                                                value={
                                                                    editCategoryId
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditCategoryId(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            >

                                                                <option value="">
                                                                    Keep current
                                                                </option>

                                                                {categories.map(
                                                                    (
                                                                        category
                                                                    ) => (

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

                                                        <div
                                                            className="
                                                                sm:col-span-2
                                                            "
                                                        >

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Location
                                                            </label>

                                                            <input
                                                                value={
                                                                    editLocation
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditLocation(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            />

                                                        </div>


                                                        {/* DESCRIPTION */}

                                                        <div
                                                            className="
                                                                sm:col-span-2
                                                            "
                                                        >

                                                            <label
                                                                className="
                                                                    mb-2
                                                                    block
                                                                    text-sm
                                                                    font-bold
                                                                    text-[#211f1a]
                                                                "
                                                            >
                                                                Description
                                                            </label>

                                                            <textarea
                                                                value={
                                                                    editDescription
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    setEditDescription(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={4}
                                                                className="
                                                                    w-full
                                                                    resize-none
                                                                    rounded-xl
                                                                    border
                                                                    border-[#d9d3c7]
                                                                    bg-white
                                                                    px-4
                                                                    py-3
                                                                    outline-none
                                                                    focus:border-[#d97757]
                                                                "
                                                            />

                                                        </div>


                                                        {/* IMAGES */}

                                                        <div
                                                            className="
                                                                sm:col-span-2
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    mb-3
                                                                    flex
                                                                    items-center
                                                                    justify-between
                                                                "
                                                            >

                                                                <label
                                                                    className="
                                                                        text-sm
                                                                        font-bold
                                                                        text-[#211f1a]
                                                                    "
                                                                >
                                                                    Images
                                                                </label>

                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        addEditImageField
                                                                    }
                                                                    className="
                                                                        text-sm
                                                                        font-bold
                                                                        text-[#d97757]
                                                                        hover:underline
                                                                    "
                                                                >
                                                                    + Add Image
                                                                </button>

                                                            </div>


                                                            {editImages.length ===
                                                                0 && (

                                                                <p
                                                                    className="
                                                                        mb-3
                                                                        rounded-xl
                                                                        bg-white
                                                                        px-4
                                                                        py-3
                                                                        text-sm
                                                                        text-[#827b6d]
                                                                    "
                                                                >
                                                                    No images.
                                                                    Click
                                                                    "+ Add Image"
                                                                    to add one.
                                                                </p>

                                                            )}


                                                            <div
                                                                className="
                                                                    space-y-3
                                                                "
                                                            >

                                                                {editImages.map(
                                                                    (
                                                                        url,
                                                                        index
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="
                                                                                flex
                                                                                gap-2
                                                                            "
                                                                        >

                                                                            <input
                                                                                value={
                                                                                    url
                                                                                }
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    updateEditImageField(
                                                                                        index,
                                                                                        event
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                placeholder="https://example.com/image.jpg"
                                                                                className="
                                                                                    min-w-0
                                                                                    flex-1
                                                                                    rounded-xl
                                                                                    border
                                                                                    border-[#d9d3c7]
                                                                                    bg-white
                                                                                    px-4
                                                                                    py-3
                                                                                    outline-none
                                                                                    focus:border-[#d97757]
                                                                                "
                                                                            />

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    removeEditImageField(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="
                                                                                    rounded-xl
                                                                                    border
                                                                                    border-[#efd3ca]
                                                                                    px-4
                                                                                    font-bold
                                                                                    text-[#bd5f3f]
                                                                                "
                                                                            >
                                                                                Remove
                                                                            </button>

                                                                        </div>

                                                                    )
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>


                                                    {/* EDIT BUTTONS */}

                                                    <div
                                                        className="
                                                            mt-6
                                                            flex
                                                            flex-wrap
                                                            gap-3
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleSaveEdit(
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={
                                                                pending ||
                                                                editAvailableNumber >
                                                                    editStockNumber
                                                            }
                                                            className="
                                                                rounded-xl
                                                                bg-[#d97757]
                                                                px-6
                                                                py-3
                                                                font-bold
                                                                text-white
                                                                transition
                                                                hover:bg-[#c76547]
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-60
                                                            "
                                                        >
                                                            {pending
                                                                ? "Saving..."
                                                                : "Save Changes"}
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={
                                                                cancelEdit
                                                            }
                                                            disabled={
                                                                pending
                                                            }
                                                            className="
                                                                rounded-xl
                                                                bg-[#e8e3da]
                                                                px-6
                                                                py-3
                                                                font-bold
                                                                text-[#211f1a]
                                                            "
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                </div>

                                            )}


                                            {/* CARD BUTTONS */}

                                            {!isEditing && (

                                                <div
                                                    className="
                                                        mt-6
                                                        flex
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
                                                        disabled={
                                                            pending
                                                        }
                                                        className="
                                                            rounded-xl
                                                            bg-[#211f1a]
                                                            px-6
                                                            py-3
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                            transition
                                                            hover:bg-[#d97757]
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-60
                                                        "
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        disabled={
                                                            pending
                                                        }
                                                        className="
                                                            rounded-xl
                                                            border
                                                            border-[#efd3ca]
                                                            bg-white
                                                            px-6
                                                            py-3
                                                            text-sm
                                                            font-bold
                                                            text-[#bd5f3f]
                                                            transition
                                                            hover:bg-[#fff6f3]
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-60
                                                        "
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </article>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </section>

    );
}