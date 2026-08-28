"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    toast,
} from "sonner";

import {
    fetchGearReviews,
    submitReview,
    editReview,
    removeReview,
} from "./_actions/review.actions";


type Review = {
    id: string;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
    user?: {
        name?: string;
        email?: string;
    };
    customer?: {
        name?: string;
        email?: string;
    };
};


type Props = {
    rentalOrderId: string;
    gearItemId: string;
    gearName: string;
    existingReview?: Review | null;
};


export default function ReviewSection({
    rentalOrderId,
    gearItemId,
    gearName,
    existingReview,
}: Props) {

    const [reviews, setReviews] =
        useState<Review[]>([]);

    const [rating, setRating] =
        useState(
            existingReview?.rating || 5
        );

    const [comment, setComment] =
        useState(
            existingReview?.comment || ""
        );

    const [editing, setEditing] =
        useState(
            Boolean(existingReview)
        );

    const [loading, setLoading] =
        useState(false);

    const [loadingReviews, setLoadingReviews] =
        useState(true);


    async function loadReviews() {

        setLoadingReviews(true);

        const result =
            await fetchGearReviews(
                gearItemId
            );

        if (result.success) {

            setReviews(
                result.data || []
            );

        }

        setLoadingReviews(false);
    }


    useEffect(() => {

        loadReviews();

    }, [gearItemId]);


    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        if (!comment.trim()) {

            toast.error(
                "Please write a review."
            );

            return;
        }


        setLoading(true);


        let result;


        if (editing && existingReview) {

            result =
                await editReview(
                    existingReview.id,
                    rating,
                    comment
                );

        } else {

            result =
                await submitReview(
                    rentalOrderId,
                    gearItemId,
                    rating,
                    comment
                );

        }


        if (!result.success) {

            toast.error(
                result.message ||
                "Something went wrong."
            );

            setLoading(false);

            return;
        }


        toast.success(
            result.message ||
            "Review saved successfully."
        );


        setComment("");

        setRating(5);

        setEditing(false);

        await loadReviews();

        setLoading(false);
    }


    async function handleDelete(
        reviewId: string
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this review?"
            );

        if (!confirmed) {
            return;
        }


        const result =
            await removeReview(
                reviewId
            );


        if (!result.success) {

            toast.error(
                result.message ||
                "Failed to delete review."
            );

            return;
        }


        toast.success(
            result.message ||
            "Review deleted successfully."
        );


        if (
            existingReview?.id ===
            reviewId
        ) {

            setEditing(false);

            setComment("");

            setRating(5);
        }


        await loadReviews();
    }


    function startEditing(
        review: Review
    ) {

        setRating(
            review.rating
        );

        setComment(
            review.comment
        );

        setEditing(true);

        window.scrollTo({
            top:
                document.body.scrollHeight,
            behavior: "smooth",
        });
    }


    return (

        <div
            className="
            mt-8
            border-t
            border-gray-200
            pt-8
            "
        >

            <h2
                className="
                text-2xl
                font-bold
                text-gray-900
                "
            >

                ⭐ Review {gearName}

            </h2>


            <p
                className="
                mt-2
                text-gray-600
                "
            >

                Share your experience with this gear.

            </p>


            <form
                onSubmit={handleSubmit}
                className="
                mt-6
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-6
                "
            >

                <h3
                    className="
                    text-lg
                    font-semibold
                    "
                >

                    {editing
                        ? "Edit your review"
                        : "Leave a review"}

                </h3>


                <div
                    className="
                    mt-5
                    "
                >

                    <label
                        className="
                        block
                        text-sm
                        font-semibold
                        text-gray-800
                        "
                    >

                        Rating

                    </label>


                    <div
                        className="
                        mt-2
                        flex
                        gap-2
                        "
                    >

                        {[1, 2, 3, 4, 5].map(
                            (star) => (

                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setRating(
                                            star
                                        )
                                    }
                                    className="
                                    text-3xl
                                    transition
                                    hover:scale-110
                                    "
                                    aria-label={
                                        `${star} star rating`
                                    }
                                >

                                    {star <= rating
                                        ? "★"
                                        : "☆"}

                                </button>

                            )
                        )}

                    </div>

                </div>


                <div
                    className="
                    mt-5
                    "
                >

                    <label
                        htmlFor={
                            `review-${gearItemId}`
                        }
                        className="
                        block
                        text-sm
                        font-semibold
                        text-gray-800
                        "
                    >

                        Your Review

                    </label>


                    <textarea
                        id={
                            `review-${gearItemId}`
                        }
                        value={comment}
                        onChange={(event) =>
                            setComment(
                                event.target.value
                            )
                        }
                        rows={4}
                        placeholder="
                            Tell us about the gear...
                        "
                        className="
                        mt-2
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        p-4
                        outline-none
                        transition
                        focus:border-blue-500
                        "
                    />

                </div>


                <div
                    className="
                    mt-4
                    flex
                    gap-3
                    "
                >

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        rounded-lg
                        bg-blue-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        "
                    >

                        {loading
                            ? "Saving..."
                            : editing
                                ? "Update Review"
                                : "Submit Review"}

                    </button>


                    {editing && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditing(false);

                                setComment("");

                                setRating(5);

                            }}
                            className="
                            rounded-lg
                            bg-gray-200
                            px-6
                            py-3
                            font-semibold
                            text-gray-800
                            hover:bg-gray-300
                            "
                        >

                            Cancel

                        </button>

                    )}

                </div>

            </form>


            <div
                className="
                mt-8
                "
            >

                <h3
                    className="
                    text-xl
                    font-bold
                    "
                >

                    Customer Reviews

                </h3>


                {loadingReviews ? (

                    <p
                        className="
                        mt-4
                        text-gray-500
                        "
                    >

                        Loading reviews...

                    </p>

                ) : reviews.length === 0 ? (

                    <div
                        className="
                        mt-4
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-5
                        text-gray-600
                        "
                    >

                        No reviews yet.
                        Be the first to review this gear.

                    </div>

                ) : (

                    <div
                        className="
                        mt-4
                        space-y-4
                        "
                    >

                        {reviews.map(
                            (review) => {

                                const reviewer =
                                    review.user?.name ||
                                    review.customer?.name ||
                                    review.user?.email ||
                                    review.customer?.email ||
                                    "Customer";


                                return (

                                    <div
                                        key={
                                            review.id
                                        }
                                        className="
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        p-5
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

                                                <p
                                                    className="
                                                    font-semibold
                                                    text-gray-900
                                                    "
                                                >

                                                    {reviewer}

                                                </p>


                                                <p
                                                    className="
                                                    mt-1
                                                    text-yellow-500
                                                    "
                                                >

                                                    {"★".repeat(
                                                        Math.max(
                                                            0,
                                                            Math.min(
                                                                5,
                                                                review.rating
                                                            )
                                                        )
                                                    )}

                                                    {"☆".repeat(
                                                        Math.max(
                                                            0,
                                                            5 -
                                                            Math.min(
                                                                5,
                                                                review.rating
                                                            )
                                                        )
                                                    )}

                                                </p>

                                            </div>


                                            {existingReview?.id ===
                                                review.id && (

                                                <div
                                                    className="
                                                    flex
                                                    gap-2
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditing(
                                                                review
                                                            )
                                                        }
                                                        className="
                                                        rounded-md
                                                        bg-blue-600
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        "
                                                    >

                                                        Edit

                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                review.id
                                                            )
                                                        }
                                                        className="
                                                        rounded-md
                                                        bg-red-600
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        "
                                                    >

                                                        Delete

                                                    </button>

                                                </div>

                                            )}

                                        </div>


                                        <p
                                            className="
                                            mt-3
                                            text-gray-700
                                            "
                                        >

                                            {review.comment}

                                        </p>


                                        {review.createdAt && (

                                            <p
                                                className="
                                                mt-3
                                                text-xs
                                                text-gray-400
                                                "
                                            >

                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString()}

                                            </p>

                                        )}

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </div>

    );
}