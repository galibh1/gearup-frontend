"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "next/navigation";

import {
    toast,
} from "sonner";

import PayButton from "./PayButton";

import ReviewSection from "./ReviewSection";

import {
    fetchRentalDetails,
} from "./_actions/rental.actions";


type RentalItem = {
    id?: string;
    gearItemId?: string;
    quantity?: number;
    pricePerDay?: string | number;

    gearItem?: {
        id?: string;
        name?: string;
    };

    gear?: {
        id?: string;
        name?: string;
    };
};


type Rental = {
    id: string;
    status: string;

    startDate: string;
    endDate: string;

    subtotal?: string | number;
    depositTotal?: string | number;
    totalAmount?: string | number;

    items?: RentalItem[];

    reviews?: any[];
};


export default function RentalDetailPage() {

    const params =
        useParams();

    const rentalId =
        params.id as string;


    const [rental, setRental] =
        useState<Rental | null>(null);

    const [loading, setLoading] =
        useState(true);


    async function loadRental() {

        setLoading(true);

        const result =
            await fetchRentalDetails(
                rentalId
            );


        if (!result.success) {

            toast.error(
                result.message ||
                "Failed to load rental"
            );

            setLoading(false);

            return;
        }


        setRental(
            result.data
        );

        setLoading(false);
    }


    useEffect(() => {

        if (rentalId) {

            loadRental();

        }

    }, [rentalId]);


    if (loading) {

        return (

            <div
                className="
                min-h-screen
                bg-gray-50
                p-6
                "
            >

                <div
                    className="
                    mx-auto
                    max-w-3xl
                    rounded-xl
                    bg-white
                    p-8
                    shadow
                    "
                >

                    <p
                        className="
                        text-gray-500
                        "
                    >

                        Loading rental...

                    </p>

                </div>

            </div>

        );

    }


    if (!rental) {

        return (

            <div
                className="
                min-h-screen
                bg-gray-50
                p-6
                "
            >

                <div
                    className="
                    mx-auto
                    max-w-3xl
                    rounded-xl
                    bg-white
                    p-8
                    shadow
                    "
                >

                    <h1
                        className="
                        text-xl
                        font-bold
                        "
                    >

                        Rental not found

                    </h1>

                </div>

            </div>

        );

    }


    const isReturned =
        rental.status ===
        "RETURNED";


    const isConfirmed =
        rental.status ===
        "CONFIRMED";


    const isPaid =
        rental.status ===
        "PAID";


    return (

        <div
            className="
            min-h-screen
            bg-gray-50
            p-6
            "
        >

            <div
                className="
                mx-auto
                max-w-3xl
                space-y-6
                "
            >

                <div
                    className="
                    rounded-xl
                    bg-white
                    p-8
                    shadow
                    "
                >

                    <div
                        className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        "
                    >

                        <h1
                            className="
                            text-2xl
                            font-bold
                            "
                        >

                            Rental Details

                        </h1>


                        <span
                            className="
                            rounded-full
                            bg-green-100
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-green-700
                            "
                        >

                            {rental.status}

                        </span>

                    </div>


                    <div
                        className="
                        mt-6
                        grid
                        gap-4
                        sm:grid-cols-2
                        "
                    >

                        <div>

                            <p
                                className="
                                text-sm
                                text-gray-500
                                "
                            >

                                Start Date

                            </p>

                            <p
                                className="
                                mt-1
                                font-semibold
                                "
                            >

                                {new Date(
                                    rental.startDate
                                ).toLocaleDateString()}

                            </p>

                        </div>


                        <div>

                            <p
                                className="
                                text-sm
                                text-gray-500
                                "
                            >

                                End Date

                            </p>

                            <p
                                className="
                                mt-1
                                font-semibold
                                "
                            >

                                {new Date(
                                    rental.endDate
                                ).toLocaleDateString()}

                            </p>

                        </div>


                        <div>

                            <p
                                className="
                                text-sm
                                text-gray-500
                                "
                            >

                                Subtotal

                            </p>

                            <p
                                className="
                                mt-1
                                font-semibold
                                "
                            >

                                $
                                {rental.subtotal ??
                                    "0"}

                            </p>

                        </div>


                        <div>

                            <p
                                className="
                                text-sm
                                text-gray-500
                                "
                            >

                                Total

                            </p>

                            <p
                                className="
                                mt-1
                                text-xl
                                font-bold
                                text-green-600
                                "
                            >

                                $
                                {rental.totalAmount ??
                                    "0"}

                            </p>

                        </div>

                    </div>


                    {rental.items &&
                        rental.items.length > 0 && (

                        <div
                            className="
                            mt-8
                            "
                        >

                            <h2
                                className="
                                text-xl
                                font-bold
                                "
                            >

                                Rental Items

                            </h2>


                            <div
                                className="
                                mt-4
                                space-y-3
                                "
                            >

                                {rental.items.map(
                                    (item, index) => {

                                        const gearId =
                                            item.gearItemId ||
                                            item.gearItem?.id ||
                                            item.gear?.id ||
                                            "";

                                        const gearName =
                                            item.gearItem?.name ||
                                            item.gear?.name ||
                                            "Rental Gear";


                                        return (

                                            <div
                                                key={
                                                    item.id ||
                                                    `${gearId}-${index}`
                                                }
                                                className="
                                                rounded-lg
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                p-4
                                                "
                                            >

                                                <p
                                                    className="
                                                    font-semibold
                                                    "
                                                >

                                                    {gearName}

                                                </p>


                                                <p
                                                    className="
                                                    mt-1
                                                    text-gray-600
                                                    "
                                                >

                                                    Quantity:{" "}
                                                    {item.quantity ??
                                                        1}

                                                </p>


                                                {isReturned &&
                                                    gearId && (

                                                    <ReviewSection
                                                        rentalOrderId={
                                                            rental.id
                                                        }
                                                        gearItemId={
                                                            gearId
                                                        }
                                                        gearName={
                                                            gearName
                                                        }
                                                        existingReview={
                                                            rental.reviews?.find(
                                                                (
                                                                    review: any
                                                                ) =>
                                                                    review.gearItemId ===
                                                                    gearId
                                                            ) ||
                                                            null
                                                        }
                                                    />

                                                )}

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    )}

                </div>


                {isConfirmed && (

                    <div
                        className="
                        rounded-xl
                        bg-white
                        p-8
                        shadow
                        "
                    >

                        <h2
                            className="
                            text-2xl
                            font-bold
                            "
                        >

                            Rental Payment

                        </h2>


                        <p
                            className="
                            mt-2
                            text-gray-600
                            "
                        >

                            Your rental has been confirmed.
                            Complete payment to continue.

                        </p>


                        <div
                            className="
                            mt-6
                            "
                        >

                            <PayButton
                                rentalId={
                                    rentalId
                                }
                            />

                        </div>

                    </div>

                )}


                {rental.status ===
                    "PLACED" && (

                    <div
                        className="
                        rounded-xl
                        bg-yellow-50
                        p-6
                        text-yellow-800
                        "
                    >

                        Your rental request is waiting
                        for provider confirmation.

                    </div>

                )}


                {isPaid && (

                    <div
                        className="
                        rounded-xl
                        bg-blue-50
                        p-6
                        text-blue-800
                        "
                    >

                        Payment received.
                        Your rental is being prepared.

                    </div>

                )}


                {isReturned && (

                    <div
                        className="
                        rounded-xl
                        bg-green-50
                        p-6
                        text-green-800
                        "
                    >

                        Rental completed.
                        Thank you for using GearUp.

                    </div>

                )}

            </div>

        </div>

    );
}