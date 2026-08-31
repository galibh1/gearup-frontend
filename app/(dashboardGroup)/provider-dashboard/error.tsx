"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function ProviderDashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Provider dashboard error:", error);
    }, [error]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f1e8] px-5 py-16">
            <div className="w-full max-w-lg rounded-[28px] border border-black/[0.06] bg-white p-8 text-center shadow-sm sm:p-10">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1ed] text-[#bd5f3f]">
                    <TriangleAlert size={30} />
                </div>

                <h1 className="mt-6 text-2xl font-bold text-[#211f1a]">
                    Provider dashboard couldn't load
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#827b6d]">
                    We couldn't retrieve your gear or rental information.
                    Please try again.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#211f1a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d97757]"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>

            </div>
        </main>
    );
}