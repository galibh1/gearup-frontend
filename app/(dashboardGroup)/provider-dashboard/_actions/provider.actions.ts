"use server";

import {
    getProviderOrders,
    updateRentalStatus,
    getProviderGear,
    createProviderGear,
    updateProviderGear,
    deleteProviderGear,
} from "@/services/provider.service";

import {
    getAllCategories,
} from "@/services/category.service";


// =========================================================
// PROVIDER ORDERS
// =========================================================

export async function fetchProviderOrders() {

    try {

        const result =
            await getProviderOrders();

        return {
            success: true,

            data:
                result.data,

            meta:
                result.meta,
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to fetch provider orders",

            data: [],
        };

    }
}


// =========================================================
// RENTAL STATUS
// =========================================================

export async function approveRental(
    id: string
) {

    try {

        const result =
            await updateRentalStatus(
                id,
                "CONFIRMED"
            );

        return {
            success: true,

            data:
                result.data,

            message:
                result.message ||
                "Rental confirmed successfully",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to confirm rental",
        };

    }
}


export async function markRentalPickedUp(
    id: string
) {

    try {

        const result =
            await updateRentalStatus(
                id,
                "PICKED_UP"
            );

        return {
            success: true,

            data:
                result.data,

            message:
                result.message ||
                "Rental marked as picked up",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to update rental",
        };

    }
}


export async function markRentalReturned(
    id: string
) {

    try {

        const result =
            await updateRentalStatus(
                id,
                "RETURNED"
            );

        return {
            success: true,

            data:
                result.data,

            message:
                result.message ||
                "Rental marked as returned",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to return rental",
        };

    }
}


// =========================================================
// PROVIDER GEAR
// =========================================================

export async function fetchProviderGear() {

    try {

        const result =
            await getProviderGear();

        return {
            success: true,

            data:
                result.data || [],
        };

    } catch (error: any) {

        return {
            success: false,

            data: [],

            message:
                error?.message ||
                "Failed to fetch your gear",
        };

    }
}


// =========================================================
// ADD GEAR
// =========================================================

export async function addProviderGear(
    data: Parameters<
        typeof createProviderGear
    >[0]
) {

    try {

        const result =
            await createProviderGear(data);

        return {
            success: true,

            data:
                result.data,

            message:
                result.message ||
                "Gear created successfully",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to create gear",
        };

    }
}


// =========================================================
// EDIT GEAR
// =========================================================

export async function editProviderGear(
    id: string,
    data: {

        name?: string;

        brand?: string | null;

        pricePerDay?: number;

        depositAmount?: number;

        stock?: number;

        availableStock?: number;

        condition?: string;

        // IMPORTANT:
        // This was missing before.
        status?: string;

        imageUrls?: string[];

        location?: string | null;

        categoryId?: string;

        description?: string;
    }
) {

    try {

        const result =
            await updateProviderGear(
                id,
                data
            );

        return {
            success: true,

            data:
                result.data,

            message:
                result.message ||
                "Gear updated successfully",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to update gear",
        };

    }
}


// =========================================================
// DELETE GEAR
// =========================================================

export async function removeProviderGear(
    id: string
) {

    try {

        const result =
            await deleteProviderGear(id);

        return {
            success: true,

            message:
                result.message ||
                "Gear deleted successfully",
        };

    } catch (error: any) {

        return {
            success: false,

            message:
                error?.message ||
                "Failed to delete gear",
        };

    }
}


// =========================================================
// CATEGORIES
// =========================================================

export async function fetchCategories() {

    try {

        const result =
            await getAllCategories();

        return {
            success: true,

            data:
                result.data || [],
        };

    } catch (error: any) {

        return {
            success: false,

            data: [],

            message:
                error?.message ||
                "Failed to fetch categories",
        };

    }
}