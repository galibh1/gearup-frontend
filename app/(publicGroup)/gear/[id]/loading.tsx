export default function GearDetailsLoading() {
    return (
        <main className="min-h-screen bg-[#f4f1e8]">

            {/* Header */}
            <header className="border-b bg-[#faf9f5]">
                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-300" />

                    <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />

                </div>
            </header>

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Image */}
                    <div className="h-[500px] animate-pulse rounded-[2rem] bg-gray-300" />

                    {/* Details */}
                    <div className="space-y-6">

                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                        <div className="h-12 w-3/4 animate-pulse rounded-xl bg-gray-300" />

                        <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />

                        <div className="space-y-3">
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                        </div>

                        {/* Price */}
                        <div className="h-10 w-40 animate-pulse rounded bg-gray-300" />

                        {/* Rental box */}
                        <div className="rounded-2xl border bg-white p-6">

                            <div className="mb-6 h-6 w-40 animate-pulse rounded bg-gray-300" />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                                <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                            </div>

                            <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-gray-300" />

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}