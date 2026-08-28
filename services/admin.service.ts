import { getAccessToken } from "@/lib/auth";


const API_URL =
    process.env.BACKEND_API_URL;


const getHeaders = async () => {

    const token =
        await getAccessToken();

    return {
        Authorization:
            `Bearer ${token}`,
        "Content-Type":
            "application/json",
    };

};



// ===============================
// USERS
// ===============================

export const getAllUsers = async () => {

    const response =
        await fetch(
            `${API_URL}/api/admin/users`,
            {
                method: "GET",
                headers:
                    await getHeaders(),
                cache: "no-store",
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch users"
        );

    }


    return result;

};



// ===============================
// UPDATE USER STATUS
// ===============================

export const updateUserStatus = async (
    id: string,
    status: string
) => {

    const response =
        await fetch(
            `${API_URL}/api/admin/users/${id}`,
            {
                method: "PATCH",
                headers:
                    await getHeaders(),
                body: JSON.stringify({
                    activeStatus:
                        status,
                }),
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to update user status"
        );

    }


    return result;

};



// ===============================
// GEAR
// ===============================

export const getAllGear = async () => {

    const response =
        await fetch(
            `${API_URL}/api/admin/gear`,
            {
                method: "GET",
                headers:
                    await getHeaders(),
                cache: "no-store",
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch gear"
        );

    }


    return result;

};



// ===============================
// RENTALS
// ===============================

export const getAllRentals = async () => {

    const response =
        await fetch(
            `${API_URL}/api/admin/rentals`,
            {
                method: "GET",
                headers:
                    await getHeaders(),
                cache: "no-store",
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch rentals"
        );

    }


    return result;

};