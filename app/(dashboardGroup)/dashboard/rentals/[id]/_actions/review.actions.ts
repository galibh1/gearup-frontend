"use server";

import { cookies } from "next/headers";

import {
    createReview,
    getGearReviews,
    updateReview,
    deleteReview,
} from "@/services/review.service";


export async function fetchGearReviews(
    gearItemId: string
) {

    try {

        if (!gearItemId) {

            return {
                success: false,
                data: [],
                message:
                    "Gear item ID is missing",
            };

        }

        const result =
            await getGearReviews(
                gearItemId
            );

        return {
            success: true,
            data: result.data || [],
        };

    } catch (error: any) {

        return {
            success: false,
            data: [],
            message:
                error.message ||
                "Failed to fetch reviews",
        };

    }
}


export async function submitReview(
    rentalOrderId: string,
    gearItemId: string,
    rating: number,
    comment: string
) {

    try {

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

        if (!rentalOrderId) {

            return {
                success: false,
                message:
                    "Rental order ID is missing",
            };

        }

        if (!gearItemId) {

            return {
                success: false,
                message:
                    "Gear item ID is missing",
            };

        }

        if (
            !Number.isInteger(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            return {
                success: false,
                message:
                    "Rating must be between 1 and 5",
            };

        }

        if (!comment.trim()) {

            return {
                success: false,
                message:
                    "Please write a review",
            };

        }

        const result =
            await createReview(
                {
                    rentalOrderId,
                    gearItemId,
                    rating,
                    comment:
                        comment.trim(),
                },
                accessToken
            );

        return {
            success: true,
            data: result.data,
            message:
                result.message ||
                "Review submitted successfully",
        };

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to submit review",
        };

    }
}


export async function editReview(
    id: string,
    rating: number,
    comment: string
) {

    try {

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

        if (!id) {

            return {
                success: false,
                message:
                    "Review ID is missing",
            };

        }

        if (
            !Number.isInteger(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            return {
                success: false,
                message:
                    "Rating must be between 1 and 5",
            };

        }

        if (!comment.trim()) {

            return {
                success: false,
                message:
                    "Please write a review",
            };

        }

        const result =
            await updateReview(
                id,
                {
                    rating,
                    comment:
                        comment.trim(),
                },
                accessToken
            );

        return {
            success: true,
            data: result.data,
            message:
                result.message ||
                "Review updated successfully",
        };

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to update review",
        };

    }
}


export async function removeReview(
    id: string
) {

    try {

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

        const result =
            await deleteReview(
                id,
                accessToken
            );

        return {
            success: true,
            message:
                result.message ||
                "Review deleted successfully",
        };

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to delete review",
        };

    }
}