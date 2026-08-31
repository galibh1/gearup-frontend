export default function GearLoading() {
    return (
        <main className="min-h-screen bg-[#f4f1e8]">
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                {/* Header skeleton */}
                <div className="mb-10">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />

                    <div className="mt-4 h-12 w-72 animate-pulse rounded-xl bg-gray-300" />

                    <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-gray-200" />
                </div>

                {/* Search / filter skeleton */}
                <div className="mb-8 rounded-2xl border bg-white p-5">
                    <div className="grid gap-4 md:grid-cols-4">

                        <div className="h-11 animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-11 animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-11 animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-11 animate-pulse rounded-xl bg-gray-200" />

                    </div>
                </div>

                {/* Gear grid skeleton */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                        >

                            {/* Image */}
                            <div className="h-64 animate-pulse bg-gray-300" />

                            <div className="space-y-4 p-5">

                                {/* Category */}
                                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                                {/* Name */}
                                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />

                                {/* Description */}
                                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                                {/* Price */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-6 w-24 animate-pulse rounded bg-gray-300" />
                                    <div className="h-9 w-24 animate-pulse rounded-full bg-gray-200" />
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </main>
    );
}