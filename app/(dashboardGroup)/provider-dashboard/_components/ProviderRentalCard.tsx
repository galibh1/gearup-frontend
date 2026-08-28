"use client";

import {
    useState,
    useTransition,
} from "react";

import { toast } from "sonner";

import {
    approveRental,
    markRentalPickedUp,
    markRentalReturned,
} from "../_actions/provider.actions";



type RentalStatus =
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";



export default function ProviderRentalCard({
    rental,
}: {
    rental: any;
}) {

    const [pending, startTransition] =
        useTransition();


    const [status, setStatus] =
        useState<RentalStatus>(
            rental.status
        );



    function handleStatusUpdate(
        action: () => Promise<any>,
        nextStatus: RentalStatus,
        successMessage: string
    ) {

        startTransition(async () => {

            try {

                const result =
                    await action();


                if (!result?.success) {

                    toast.error(
                        result?.message ||
                        "Failed to update rental"
                    );

                    return;
                }


                setStatus(nextStatus);


                toast.success(
                    result.message ||
                    successMessage
                );


            } catch (error: any) {

                toast.error(
                    error?.message ||
                    "Failed to update rental"
                );

            }

        });

    }



    function handleConfirm() {

        handleStatusUpdate(
            () =>
                approveRental(
                    rental.id
                ),
            "CONFIRMED",
            "Rental confirmed successfully"
        );

    }



    function handlePickedUp() {

        handleStatusUpdate(
            () =>
                markRentalPickedUp(
                    rental.id
                ),
            "PICKED_UP",
            "Rental marked as picked up"
        );

    }



    function handleReturned() {

        handleStatusUpdate(
            () =>
                markRentalReturned(
                    rental.id
                ),
            "RETURNED",
            "Rental marked as returned"
        );

    }



    const statusStyles: Record<
        RentalStatus,
        string
    > = {

        PLACED:
            "bg-yellow-100 text-yellow-700",

        CONFIRMED:
            "bg-blue-100 text-blue-700",

        PAID:
            "bg-purple-100 text-purple-700",

        PICKED_UP:
            "bg-green-100 text-green-700",

        RETURNED:
            "bg-gray-100 text-gray-700",

        CANCELLED:
            "bg-red-100 text-red-700",

    };



    return (

        <div
            className="
                border
                rounded-2xl
                p-6
                bg-white
                shadow-md
                space-y-6
            "
        >


            {/* HEADER */}

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                    "
                >
                    Rental Request
                </h2>


                <span
                    className={`
                        inline-flex
                        w-fit
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        text-sm
                        ${statusStyles[status]}
                    `}
                >
                    {status.replace(
                        "_",
                        " "
                    )}
                </span>

            </div>



            {/* CUSTOMER INFORMATION */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                    text-gray-700
                "
            >

                <p>

                    <strong>
                        Customer:
                    </strong>{" "}

                    {rental.customer?.name ||
                        "N/A"}

                </p>


                <p>

                    <strong>
                        Email:
                    </strong>{" "}

                    {rental.customer?.email ||
                        "N/A"}

                </p>


                <p>

                    <strong>
                        Rental ID:
                    </strong>{" "}

                    <span className="text-sm break-all">
                        {rental.id}
                    </span>

                </p>


                <p>

                    <strong>
                        Total:
                    </strong>{" "}

                    ${rental.totalAmount}

                </p>


                <p>

                    <strong>
                        Start Date:
                    </strong>{" "}

                    {new Date(
                        rental.startDate
                    ).toLocaleDateString()}

                </p>


                <p>

                    <strong>
                        End Date:
                    </strong>{" "}

                    {new Date(
                        rental.endDate
                    ).toLocaleDateString()}

                </p>

            </div>



            {/* ITEMS */}

            <div>

                <h3
                    className="
                        font-bold
                        text-lg
                        mb-3
                    "
                >
                    Rental Items
                </h3>


                <div
                    className="
                        space-y-3
                    "
                >

                    {rental.items?.map(
                        (item: any) => (

                            <div
                                key={item.id}
                                className="
                                    border
                                    rounded-xl
                                    p-4
                                    bg-gray-50
                                "
                            >

                                <p
                                    className="
                                        font-semibold
                                    "
                                >
                                    {
                                        item.gearItem?.name ||
                                        "Gear Item"
                                    }
                                </p>


                                <p>
                                    Quantity:{" "}
                                    {item.quantity}
                                </p>


                                <p>
                                    Price/day:{" "}
                                    ${item.pricePerDay}
                                </p>

                            </div>

                        )
                    )}

                </div>

            </div>



            {/* ACTIONS */}

            <div
                className="
                    flex
                    flex-wrap
                    gap-3
                    pt-2
                "
            >


                {/* PLACED → CONFIRMED */}

                {status === "PLACED" && (

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={pending}
                        className="
                            bg-green-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-green-700
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {pending
                            ? "Confirming..."
                            : "Confirm Rental"}

                    </button>

                )}



                {/* PAID → PICKED_UP */}

                {status === "PAID" && (

                    <button
                        type="button"
                        onClick={handlePickedUp}
                        disabled={pending}
                        className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-blue-700
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {pending
                            ? "Updating..."
                            : "Mark Picked Up"}

                    </button>

                )}



                {/* PICKED_UP → RETURNED */}

                {status === "PICKED_UP" && (

                    <button
                        type="button"
                        onClick={handleReturned}
                        disabled={pending}
                        className="
                            bg-gray-800
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-gray-900
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {pending
                            ? "Updating..."
                            : "Mark Returned"}

                    </button>

                )}



                {/* CONFIRMED */}

                {status === "CONFIRMED" && (

                    <div
                        className="
                            w-full
                            bg-blue-50
                            border
                            border-blue-200
                            text-blue-700
                            rounded-xl
                            p-4
                            font-medium
                        "
                    >

                        Rental confirmed.
                        Waiting for customer
                        payment.

                    </div>

                )}



                {/* PAID */}

                {status === "PAID" && !pending && (

                    <div
                        className="
                            w-full
                            bg-purple-50
                            border
                            border-purple-200
                            text-purple-700
                            rounded-xl
                            p-4
                            font-medium
                        "
                    >

                        Payment received.
                        Gear is ready for pickup.

                    </div>

                )}



                {/* PICKED UP */}

                {status === "PICKED_UP" && !pending && (

                    <div
                        className="
                            w-full
                            bg-green-50
                            border
                            border-green-200
                            text-green-700
                            rounded-xl
                            p-4
                            font-medium
                        "
                    >

                        Gear has been picked up
                        by the customer.

                    </div>

                )}



                {/* RETURNED */}

                {status === "RETURNED" && (

                    <div
                        className="
                            w-full
                            bg-gray-100
                            border
                            border-gray-200
                            text-gray-700
                            rounded-xl
                            p-4
                            font-medium
                        "
                    >

                        Rental completed.
                        Gear has been returned.

                    </div>

                )}



                {/* CANCELLED */}

                {status === "CANCELLED" && (

                    <div
                        className="
                            w-full
                            bg-red-50
                            border
                            border-red-200
                            text-red-700
                            rounded-xl
                            p-4
                            font-medium
                        "
                    >

                        This rental has been
                        cancelled.

                    </div>

                )}

            </div>


        </div>

    );

}