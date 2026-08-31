"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


type DatePickerProps = {
    value?: Date;

    onChange: (
        date?: Date
    ) => void;

    minDate?: Date;

    disabled?:
        | boolean
        | ((date: Date) => boolean);
};


export default function DatePicker({
    value,
    onChange,
    minDate,
    disabled,
}: DatePickerProps) {

    /*
     * Combine the minimum-date restriction with
     * any existing disabled rule.
     */
    const disabledDate = React.useMemo(() => {

        if (
            !minDate &&
            !disabled
        ) {
            return undefined;
        }


        return (date: Date) => {

            /*
             * Disable dates before minDate.
             */
            if (
                minDate &&
                isBefore(
                    startOfDay(date),
                    startOfDay(minDate)
                )
            ) {
                return true;
            }


            /*
             * Support boolean disabled.
             */
            if (
                typeof disabled ===
                "boolean"
            ) {
                return disabled;
            }


            /*
             * Support function-based disabled.
             */
            if (
                typeof disabled ===
                "function"
            ) {
                return disabled(date);
            }


            return false;
        };

    }, [
        minDate,
        disabled,
    ]);


    return (
        <Popover>

            <PopoverTrigger asChild>

                <Button
                    variant="outline"
                    className="
                        w-full
                        justify-start
                        text-left
                        font-normal
                    "
                >

                    <CalendarIcon
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    {value
                        ? format(
                            value,
                            "PPP"
                        )
                        : "Pick a date"
                    }

                </Button>

            </PopoverTrigger>


            <PopoverContent
                className="
                    w-auto
                    p-0
                "
                align="start"
            >

                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabledDate}
                />

            </PopoverContent>

        </Popover>
    );
}