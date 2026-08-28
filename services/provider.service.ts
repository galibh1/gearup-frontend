"use server";

import { cookies } from "next/headers";

const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";

async function getToken() {
    const cookieStore = await cookies();

    const token =
        cookieStore.get("accessToken")?.value;

    if (!token) {
        throw new Error("Authentication required");
    }

    return token;
}


export async function getProviderOrders() {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/orders`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to load provider orders"
        );
    }

    return result;
}


export async function updateRentalStatus(
    rentalId: string,
    status:
        | "CONFIRMED"
        | "PICKED_UP"
        | "RETURNED"
) {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/orders/${rentalId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Status update failed"
        );
    }

    return result;
}


export async function getProviderGear() {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/gear`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to load your gear"
        );
    }

    return result;
}


export async function createProviderGear(
    data: {
        name: string;
        slug: string;
        description: string;
        brand: string;
        pricePerDay: number;
        depositAmount: number;
        stock: number;
        availableStock: number;
        condition: string;
        status: string;
        imageUrls: string[];
        specifications: Record<string, unknown>;
        location: string;
        isFeatured: boolean;
        categoryId: string;
    }
) {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/gear`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to create gear"
        );
    }

    return result;
}


export async function updateProviderGear(
    id: string,
    data: {
        pricePerDay?: number;
        availableStock?: number;
        description?: string;
    }
) {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/gear/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to update gear"
        );
    }

    return result;
}


export async function deleteProviderGear(
    id: string
) {

    const token = await getToken();

    const response = await fetch(
        `${API_URL}/api/provider/gear/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to delete gear"
        );
    }

    return result;
}
