"use server";

import {
    getAllUsers,
    getAllGear,
    getAllRentals,
    updateUserStatus,
} from "@/services/admin.service";

function getErrorMessage(
    error: unknown,
    fallback: string
): string {
    if (error instanceof Error) {
        return error.message || fallback;
    }

    return fallback;
}

export async function fetchUsers() {
    try {
        const result =
            await getAllUsers();

        return {
            success: true,
            data: Array.isArray(result.data)
                ? result.data
                : [],
        };
    } catch (error: unknown) {
        return {
            success: false,
            data: [],
            message: getErrorMessage(
                error,
                "Failed to fetch users"
            ),
        };
    }
}

export async function fetchAdminGear() {
    try {
        const result =
            await getAllGear();

        return {
            success: true,
            data: Array.isArray(result.data)
                ? result.data
                : [],
        };
    } catch (error: unknown) {
        return {
            success: false,
            data: [],
            message: getErrorMessage(
                error,
                "Failed to fetch gear"
            ),
        };
    }
}

export async function fetchAdminRentals() {
    try {
        const result =
            await getAllRentals();

        return {
            success: true,
            data: Array.isArray(result.data)
                ? result.data
                : [],
        };
    } catch (error: unknown) {
        return {
            success: false,
            data: [],
            message: getErrorMessage(
                error,
                "Failed to fetch rentals"
            ),
        };
    }
}

export async function fetchAdminStats() {
    try {
        const [
            users,
            gear,
            rentals,
        ] = await Promise.all([
            getAllUsers(),
            getAllGear(),
            getAllRentals(),
        ]);

        return {
            success: true,
            data: {
                users: Array.isArray(
                    users.data
                )
                    ? users.data.length
                    : 0,

                gear: Array.isArray(
                    gear.data
                )
                    ? gear.data.length
                    : 0,

                rentals: Array.isArray(
                    rentals.data
                )
                    ? rentals.data.length
                    : 0,
            },
        };
    } catch (error: unknown) {
        return {
            success: false,
            message: getErrorMessage(
                error,
                "Failed to fetch statistics"
            ),
        };
    }
}

export async function changeUserStatus(
    id: string,
    status: string
) {
    try {
        await updateUserStatus(
            id,
            status
        );

        return {
            success: true,
        };
    } catch (error: unknown) {
        return {
            success: false,
            message: getErrorMessage(
                error,
                "Failed to update user status"
            ),
        };
    }
}