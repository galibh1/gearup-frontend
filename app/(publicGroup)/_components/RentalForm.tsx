"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addDays, startOfDay } from "date-fns";

import { createRental } from "../_actions/rental.actions";

import DatePicker from "@/components/ui/date-picker";


type RentalFormProps = {
    gearId: string;
};


export default function RentalForm({
    gearId,
}: RentalFormProps) {

    const router = useRouter();


    const [startDate, setStartDate] =
        useState<Date>();


    const [endDate, setEndDate] =
        useState<Date>();


    const [loading, setLoading] =
        useState(false);


    /*
     * Backend requires rental dates to be in the future.
     * Therefore today and all previous dates are disabled.
     */
    function getTomorrow(): Date {

        return addDays(
            startOfDay(new Date()),
            1
        );

    }


    /*
     * Extra protection in case a date somehow gets
     * selected programmatically.
     */
    function isTodayOrPast(
        date: Date
    ): boolean {

        const selected =
            startOfDay(date);

        const tomorrow =
            getTomorrow();

        return selected < tomorrow;

    }


    /*
     * When the start date changes, make sure an old
     * end date is not kept accidentally.
     */
    function handleStartDateChange(
        date?: Date
    ) {

        setStartDate(date);


        if (
            date &&
            endDate &&
            startOfDay(endDate) <=
                startOfDay(date)
        ) {

            setEndDate(undefined);

        }

    }


    /*
     * End date must be after the selected start date.
     */
    function handleEndDateChange(
        date?: Date
    ) {

        if (!date) {

            setEndDate(undefined);

            return;

        }


        if (isTodayOrPast(date)) {

            toast.error(
                "Please select a future end date."
            );

            return;

        }


        if (
            startDate &&
            startOfDay(date) <=
                startOfDay(startDate)
        ) {

            toast.error(
                "End date must be after the start date."
            );

            return;

        }


        setEndDate(date);

    }


    async function handleRental() {

        if (!startDate || !endDate) {

            toast.error(
                "Please select both start and end dates."
            );

            return;

        }


        /*
         * Prevent today and previous dates.
         */
        if (isTodayOrPast(startDate)) {

            toast.error(
                "Rental must start from tomorrow or a future date."
            );

            return;

        }


        if (isTodayOrPast(endDate)) {

            toast.error(
                "End date must be tomorrow or a future date."
            );

            return;

        }


        const start =
            startOfDay(startDate);

        const end =
            startOfDay(endDate);


        /*
         * End date must be later than start date.
         */
        if (end <= start) {

            toast.error(
                "End date must be after the start date."
            );

            return;

        }


        if (!gearId) {

            toast.error(
                "Gear information is missing."
            );

            return;

        }


        try {

            setLoading(true);


            const result =
                await createRental({

                    startDate:
                        startDate.toISOString(),

                    endDate:
                        endDate.toISOString(),

                    items: [
                        {
                            gearItemId: gearId,
                            quantity: 1,
                        },
                    ],

                });


            console.log(
                "RENTAL RESULT:",
                result
            );


            if (!result?.success) {

                toast.error(
                    result?.message ||
                    "Failed to create rental."
                );

                return;

            }


            toast.success(
                "Rental created successfully!"
            );


            router.push(
                "/dashboard/rentals"
            );


        } catch (error: unknown) {

            console.error(
                "RENTAL ERROR:",
                error
            );


            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while creating the rental."
            );


        } finally {

            setLoading(false);

        }

    }


    const tomorrow =
        getTomorrow();


    /*
     * Once a start date is selected, the end date
     * cannot be the same day or earlier.
     */
    const minimumEndDate =
        startDate
            ? addDays(
                startOfDay(startDate),
                1
            )
            : tomorrow;


    return (

        <div>

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                {/* ================= START DATE ================= */}

                <div>

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-[#514d45]
                        "
                    >
                        Start Date
                    </label>


                    <DatePicker
                        value={startDate}
                        onChange={
                            handleStartDateChange
                        }
                        minDate={tomorrow}
                        disabled={loading}
                    />


                    <p
                        className="
                            mt-2
                            text-[11px]
                            text-[#918b80]
                        "
                    >
                        Rentals can start from tomorrow.
                    </p>

                </div>


                {/* ================= END DATE ================= */}

                <div>

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-[#514d45]
                        "
                    >
                        End Date
                    </label>


                    <DatePicker
                        value={endDate}
                        onChange={
                            handleEndDateChange
                        }
                        minDate={
                            minimumEndDate
                        }
                        disabled={loading}
                    />


                    <p
                        className="
                            mt-2
                            text-[11px]
                            text-[#918b80]
                        "
                    >
                        End date must be after the start date.
                    </p>

                </div>

            </div>


            {/* ================= SUMMARY ================= */}

            {startDate && endDate && (

                <div
                    className="
                        mt-5
                        rounded-xl
                        border
                        border-[#dce4d7]
                        bg-[#f1f4ed]
                        px-4
                        py-3
                    "
                >

                    <p className="text-xs font-semibold text-[#4f5d47]">
                        Rental period selected
                    </p>

                    <p className="mt-1 text-sm text-[#66765a]">
                        {startDate.toLocaleDateString()}{" "}
                        →{" "}
                        {endDate.toLocaleDateString()}
                    </p>

                </div>

            )}


            {/* ================= RENT BUTTON ================= */}

            <button
                type="button"
                onClick={handleRental}
                disabled={
                    loading ||
                    !startDate ||
                    !endDate
                }
                className="
                    mt-8
                    rounded-xl
                    bg-black
                    px-8
                    py-3
                    text-white
                    transition
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >

                {loading
                    ? "Creating..."
                    : "Rent Now"
                }

            </button>

        </div>

    );
}