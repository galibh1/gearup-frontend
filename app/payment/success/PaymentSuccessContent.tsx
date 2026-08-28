"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessContent() {
    const searchParams = useSearchParams();

    const sessionId = searchParams.get(
        "session_id"
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow text-center">

                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful 🎉
                </h1>

                <p className="mt-4">
                    Your rental payment has been completed.
                </p>

                {sessionId && (
                    <p className="text-sm text-gray-500 mt-3 break-all">
                        Session:
                        <br />
                        {sessionId}
                    </p>
                )}

            </div>

        </div>
    );
}