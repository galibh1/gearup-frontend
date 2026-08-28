"use client";

import { useEffect, useState } from "react";
import {
    useSearchParams,
    useRouter,
} from "next/navigation";
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
    confirmPaymentAction,
} from "@/app/(dashboardGroup)/dashboard/rentals/[id]/_actions/payment.actions";


type PaymentState =
    | "loading"
    | "success"
    | "error";


export default function PaymentSuccessContent() {

    const searchParams =
        useSearchParams();

    const router =
        useRouter();


    const sessionId =
        searchParams.get(
            "session_id"
        );


    const [state, setState] =
        useState<PaymentState>(
            "loading"
        );


    const [message, setMessage] =
        useState(
            "Confirming your payment..."
        );


    useEffect(() => {

        let cancelled = false;


        async function confirmStripePayment() {

            if (!sessionId) {

                if (!cancelled) {

                    setState("error");

                    setMessage(
                        "Stripe payment session is missing."
                    );

                }

                return;

            }


            try {

                const result =
                    await confirmPaymentAction(
                        sessionId
                    );


                if (cancelled) {
                    return;
                }


                if (!result.success) {

                    setState("error");

                    setMessage(
                        result.message ||
                        "Payment confirmation failed."
                    );

                    toast.error(
                        result.message ||
                        "Payment confirmation failed."
                    );

                    return;

                }


                setState("success");

                setMessage(
                    result.message ||
                    "Your rental payment has been confirmed successfully."
                );


                toast.success(
                    "Payment confirmed successfully"
                );


            } catch (error: unknown) {

                console.error(
                    "PAYMENT CONFIRMATION ERROR:",
                    error
                );


                if (cancelled) {
                    return;
                }


                setState("error");

                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Payment confirmation failed."
                );


                toast.error(
                    "Payment confirmation failed"
                );

            }

        }


        confirmStripePayment();


        return () => {

            cancelled = true;

        };

    }, [sessionId]);


    return (

        <div
            className="
                min-h-screen
                bg-gray-50
                flex
                items-center
                justify-center
                px-6
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    bg-white
                    rounded-2xl
                    border
                    shadow-sm
                    p-8
                    md:p-10
                    text-center
                "
            >

                {state === "loading" && (

                    <>

                        <div
                            className="
                                mx-auto
                                mb-6
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-50
                            "
                        >

                            <Loader2
                                className="
                                    h-8
                                    w-8
                                    text-blue-600
                                    animate-spin
                                "
                            />

                        </div>


                        <h1
                            className="
                                text-2xl
                                md:text-3xl
                                font-bold
                                text-gray-900
                            "
                        >

                            Confirming Payment

                        </h1>


                        <p
                            className="
                                mt-3
                                text-gray-600
                            "
                        >

                            Please wait while we
                            confirm your Stripe payment.

                        </p>

                    </>

                )}


                {state === "success" && (

                    <>

                        <div
                            className="
                                mx-auto
                                mb-6
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-green-100
                            "
                        >

                            <CheckCircle2
                                className="
                                    h-9
                                    w-9
                                    text-green-600
                                "
                            />

                        </div>


                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-gray-900
                            "
                        >

                            Payment Successful

                        </h1>


                        <p
                            className="
                                mt-4
                                text-gray-600
                                leading-7
                            "
                        >

                            {message}

                        </p>


                        <p
                            className="
                                mt-3
                                text-sm
                                text-gray-500
                            "
                        >

                            Your rental payment has been
                            successfully processed.

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/dashboard/rentals"
                                )
                            }
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-blue-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >

                            View My Rentals

                        </button>

                    </>

                )}


                {state === "error" && (

                    <>

                        <div
                            className="
                                mx-auto
                                mb-6
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-red-100
                            "
                        >

                            <AlertCircle
                                className="
                                    h-9
                                    w-9
                                    text-red-600
                                "
                            />

                        </div>


                        <h1
                            className="
                                text-2xl
                                md:text-3xl
                                font-bold
                                text-gray-900
                            "
                        >

                            Payment Confirmation Failed

                        </h1>


                        <p
                            className="
                                mt-4
                                text-gray-600
                                leading-7
                            "
                        >

                            {message}

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/dashboard/rentals"
                                )
                            }
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-blue-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                hover:bg-blue-700
                            "
                        >

                            Back to My Rentals

                        </button>

                    </>

                )}

            </div>

        </div>

    );

}