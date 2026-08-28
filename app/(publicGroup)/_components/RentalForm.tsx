"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
     * Rentals cannot start today because the backend
     * requires the rental start date to be in the future.
     */
    function getTomorrow() {

        const tomorrow = new Date();

        tomorrow.setHours(0, 0, 0, 0);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        return tomorrow;

    }


    function isTodayOrPast(date: Date) {

        const selected =
            new Date(date);

        selected.setHours(
            0,
            0,
            0,
            0
        );


        const tomorrow =
            getTomorrow();


        return selected < tomorrow;

    }


    async function handleRental() {

        if (!startDate || !endDate) {

            toast.error(
                "Please select start and end dates."
            );

            return;

        }


        /*
         * Prevent today's date and previous dates.
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


        /*
         * End date must be after start date.
         */
        const start =
            new Date(startDate);

        const end =
            new Date(endDate);


        start.setHours(
            0,
            0,
            0,
            0
        );

        end.setHours(
            0,
            0,
            0,
            0
        );


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


            /*
             * Keep the selected calendar date exactly as chosen.
             *
             * The existing backend expects the ISO date format.
             * The DatePicker already produces the correct local
             * calendar date, so we send its ISO representation.
             */
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


    return (

        <div>

            <div
                className="
                    grid
                    md:grid-cols-2
                    gap-5
                "
            >

                <div>

                    <label
                        className="
                            block
                            mb-2
                        "
                    >
                        Start Date
                    </label>


                    <DatePicker
                        value={startDate}
                        onChange={setStartDate}
                    />

                </div>


                <div>

                    <label
                        className="
                            block
                            mb-2
                        "
                    >
                        End Date
                    </label>


                    <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                    />

                </div>

            </div>


            <button
                type="button"
                onClick={handleRental}
                disabled={loading}
                className="
                    mt-8
                    bg-black
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    hover:bg-gray-800
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
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