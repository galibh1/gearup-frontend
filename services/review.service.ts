const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";

type ReviewData = {
    rentalOrderId: string;
    gearItemId: string;
    rating: number;
    comment: string;
};

type UpdateReviewData = {
    rating?: number;
    comment?: string;
};

async function parseResponse(response: Response) {
    const text = await response.text();

    if (!text) {
        return {};
    }

    try {
        return JSON.parse(text);
    } catch {
        return {
            message: text,
        };
    }
}


export async function getGearReviews(
    gearItemId: string
) {

    const response = await fetch(
        `${API_URL}/api/reviews/gear/${gearItemId}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch reviews"
        );

    }

    return result;
}


export async function createReview(
    data: ReviewData,
    accessToken: string
) {

    const response = await fetch(
        `${API_URL}/api/reviews`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                Cookie:
                    `accessToken=${accessToken}`,
            },

            body: JSON.stringify(data),

            cache: "no-store",
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to submit review"
        );

    }

    return result;
}


export async function updateReview(
    id: string,
    data: UpdateReviewData,
    accessToken: string
) {

    const response = await fetch(
        `${API_URL}/api/reviews/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type":
                    "application/json",

                Cookie:
                    `accessToken=${accessToken}`,
            },

            body: JSON.stringify(data),

            cache: "no-store",
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to update review"
        );

    }

    return result;
}


export async function deleteReview(
    id: string,
    accessToken: string
) {

    const response = await fetch(
        `${API_URL}/api/reviews/${id}`,
        {
            method: "DELETE",

            headers: {
                Cookie:
                    `accessToken=${accessToken}`,
            },

            cache: "no-store",
        }
    );

    const result =
        await parseResponse(response);

    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to delete review"
        );

    }

    return result;
}