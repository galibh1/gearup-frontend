"use server";

import { cookies } from "next/headers";


const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";


type PaymentActionResult = {
    success: boolean;
    message: string;
    checkoutUrl?: string;
};


async function getAccessToken(): Promise<string | null> {

    const cookieStore =
        await cookies();

    return (
        cookieStore.get(
            "accessToken"
        )?.value ?? null
    );

}


export async function createPaymentAction(
    rentalOrderId: string
): Promise<PaymentActionResult> {

    try {

        if (!rentalOrderId) {

            return {
                success: false,
                message:
                    "Rental order ID is missing.",
            };

        }


        const accessToken =
            await getAccessToken();


        if (!accessToken) {

            return {
                success: false,
                message:
                    "Authentication required.",
            };

        }


        const response =
            await fetch(
                `${API_URL}/api/payments/create`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${accessToken}`,
                    },

                    body: JSON.stringify({
                        rentalOrderId,
                    }),

                    cache: "no-store",
                }
            );


        const result =
            await response.json();


        console.log(
            "PAYMENT RESPONSE:",
            result
        );


        if (!response.ok) {

            return {
                success: false,
                message:
                    result?.message ||
                    "Payment creation failed.",
            };

        }


        const checkoutUrl =
            result
                ?.data
                ?.checkoutSession
                ?.url;


        if (!checkoutUrl) {

            return {
                success: false,
                message:
                    "Stripe checkout URL is missing.",
            };

        }


        return {
            success: true,
            message:
                result?.message ||
                "Checkout created successfully.",
            checkoutUrl,
        };


    } catch (error: unknown) {

        console.error(
            "PAYMENT ERROR:",
            error
        );


        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Payment creation failed.",
        };

    }

}


export async function confirmPaymentAction(
    stripeSessionId: string
): Promise<PaymentActionResult> {

    try {

        if (!stripeSessionId) {

            return {
                success: false,
                message:
                    "Stripe session ID is missing.",
            };

        }


        const accessToken =
            await getAccessToken();


        if (!accessToken) {

            return {
                success: false,
                message:
                    "Authentication required.",
            };

        }


        const response =
            await fetch(
                `${API_URL}/api/payments/confirm`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${accessToken}`,
                    },

                    body: JSON.stringify({
                        stripeSessionId,
                    }),

                    cache: "no-store",
                }
            );


        const result =
            await response.json();


        console.log(
            "CONFIRM PAYMENT RESPONSE:",
            result
        );


        if (!response.ok) {

            return {
                success: false,
                message:
                    result?.message ||
                    "Payment confirmation failed.",
            };

        }


        return {
            success: true,
            message:
                result?.message ||
                "Payment confirmed successfully.",
        };


    } catch (error: unknown) {

        console.error(
            "PAYMENT CONFIRMATION ERROR:",
            error
        );


        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Payment confirmation failed.",
        };

    }

}