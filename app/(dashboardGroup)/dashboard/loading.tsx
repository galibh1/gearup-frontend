export default function DashboardLoading() {
    return (
        <main className="min-h-screen bg-[#f4f1e8] px-5 py-10 sm:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="h-10 w-64 animate-pulse rounded-xl bg-gray-300" />

                <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />

                <div className="mt-10 grid gap-5 md:grid-cols-3">

                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-32 animate-pulse rounded-2xl bg-white"
                        />
                    ))}

                </div>

                <div className="mt-8 space-y-4">

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-28 animate-pulse rounded-2xl bg-white"
                        />
                    ))}

                </div>

            </div>

        </main>
    );
}