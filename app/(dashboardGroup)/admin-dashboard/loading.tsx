export default function AdminDashboardLoading() {
    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <div className="h-10 w-72 animate-pulse rounded-xl bg-gray-300" />

                    <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />
                </div>

                {/* Statistics */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-36 animate-pulse rounded-2xl bg-white"
                        />
                    ))}

                </div>

                {/* Tables */}
                <div className="mt-8 space-y-8">

                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-2xl bg-white"
                        />
                    ))}

                </div>

            </div>

        </main>
    );
}