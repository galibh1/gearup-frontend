"use server";

import { cookies } from "next/headers";


const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";


export async function fetchRentalDetails(
    rentalId: string
) {

    try {

        if (!rentalId) {

            return {
                success: false,
                message:
                    "Rental ID is missing",
            };

        }


        const cookieStore =
            await cookies();

        const accessToken =
            cookieStore.get(
                "accessToken"
            )?.value;


        if (!accessToken) {

            return {
                success: false,
                message:
                    "Authentication required",
            };

        }


        const response =
            await fetch(
                `${API_URL}/api/rentals/${rentalId}`,
                {
                    method: "GET",

                    headers: {
                        Cookie:
                            `accessToken=${accessToken}`,
                    },

                    cache: "no-store",
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            return {
                success: false,
                message:
                    result.message ||
                    "Failed to fetch rental",
            };

        }


        return {
            success: true,
            data:
                result.data,
        };

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to fetch rental",
        };

    }
}