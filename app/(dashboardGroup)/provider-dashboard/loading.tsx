export default function ProviderDashboardLoading() {
    return (
        <main className="min-h-screen bg-[#f5f1e8] px-5 py-10 md:px-8 lg:px-10">

            <div className="mx-auto max-w-7xl">

                {/* Hero */}
                <div className="rounded-[32px] bg-white p-8">

                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

                    <div className="mt-5 h-12 w-80 animate-pulse rounded-xl bg-gray-300" />

                    <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200" />

                </div>

                {/* Stats */}
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-40 animate-pulse rounded-2xl bg-white"
                        />
                    ))}

                </div>

                {/* Orders */}
                <div className="mt-10">

                    <div className="h-8 w-56 animate-pulse rounded bg-gray-300" />

                    <div className="mt-6 space-y-5">

                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-48 animate-pulse rounded-2xl bg-white"
                            />
                        ))}

                    </div>

                </div>

            </div>

        </main>
    );
}