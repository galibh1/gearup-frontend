import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";


type RentalItem = {
    quantity?: number;

    gearItem?: {
        name?: string;
    };

    gear?: {
        name?: string;
    };
};


type Rental = {
    id: string;
    status?: string;
    startDate: string;
    endDate: string;

    totalAmount?: string | number;

    items?: RentalItem[];
};


type RentalsResult = {
    success: boolean;
    data: Rental[];
    message?: string;
};


async function getRentals(): Promise<RentalsResult> {

    try {

        const cookieStore =
            await cookies();


        const response =
            await fetch(
                `${API_URL}/api/rentals`,
                {
                    headers: {
                        Cookie:
                            cookieStore.toString(),
                    },

                    cache: "no-store",
                }
            );


        const result =
            await response.json();


        console.log(
            "Rental API result:",
            result
        );


        if (!response.ok) {

            return {
                success: false,
                data: [],
                message:
                    result?.message ||
                    "Failed to load rentals.",
            };

        }


        return {
            success: true,
            data:
                Array.isArray(result?.data)
                    ? result.data
                    : [],
        };


    } catch (error: unknown) {

        console.error(
            "Rental fetch error:",
            error
        );


        return {
            success: false,
            data: [],
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to load your rentals.",
        };

    }

}


function getStatusClass(status: string) {

    switch (status) {

        case "PLACED":
            return "bg-yellow-100 text-yellow-700";

        case "CONFIRMED":
            return "bg-blue-100 text-blue-700";

        case "PAID":
            return "bg-indigo-100 text-indigo-700";

        case "PICKED_UP":
            return "bg-purple-100 text-purple-700";

        case "RETURNED":
            return "bg-green-100 text-green-700";

        case "CANCELLED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

}


function getGearName(rental: Rental) {

    const firstItem =
        rental.items?.[0];


    return (
        firstItem?.gearItem?.name ||
        firstItem?.gear?.name ||
        "Gear rental"
    );

}


export default async function RentalsPage() {

    const result =
        await getRentals();


    return (

        <main
            className="
                min-h-screen
                bg-gray-50
                py-12
                px-5
            "
        >

            <div
                className="
                    max-w-6xl
                    mx-auto
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-gray-900
                        "
                    >
                        My Rentals
                    </h1>


                    <p
                        className="
                            mt-3
                            text-gray-500
                            text-lg
                        "
                    >
                        Your rental history and current orders.
                    </p>

                </div>


                {!result.success ? (

                    <div
                        className="
                            mt-10
                            bg-red-50
                            border
                            border-red-200
                            rounded-2xl
                            p-8
                        "
                    >

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-red-800
                            "
                        >
                            Unable to load rentals
                        </h2>


                        <p
                            className="
                                mt-2
                                text-red-700
                            "
                        >
                            {result.message ||
                                "Something went wrong while loading your rentals."}
                        </p>

                    </div>

                ) : (

                    <div
                        className="
                            mt-10
                            space-y-6
                        "
                    >

                        {result.data.length === 0 ? (

                            <div
                                className="
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-gray-100
                                    shadow-sm
                                    p-10
                                    text-center
                                "
                            >

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-gray-900
                                    "
                                >
                                    No rentals found
                                </h2>


                                <p
                                    className="
                                        mt-2
                                        text-gray-500
                                    "
                                >
                                    You have not rented any gear yet.
                                </p>


                                <Link
                                    href="/gear"
                                    className="
                                        inline-block
                                        mt-6
                                        bg-black
                                        text-white
                                        px-6
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        hover:bg-gray-800
                                        transition
                                    "
                                >
                                    Browse Gear
                                </Link>

                            </div>

                        ) : (

                            result.data.map(
                                (rental) => {

                                    const status =
                                        rental.status ||
                                        "PLACED";


                                    const gearName =
                                        getGearName(
                                            rental
                                        );


                                    return (

                                        <Link
                                            key={rental.id}
                                            href={
                                                `/dashboard/rentals/${rental.id}`
                                            }
                                            className="block"
                                        >

                                            <div
                                                className="
                                                    bg-white
                                                    rounded-2xl
                                                    shadow-sm
                                                    p-7
                                                    hover:shadow-lg
                                                    transition
                                                    cursor-pointer
                                                    border
                                                    border-gray-100
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        sm:flex-row
                                                        sm:justify-between
                                                        sm:items-center
                                                        gap-4
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-500
                                                            "
                                                        >
                                                            Rental
                                                        </p>


                                                        <h2
                                                            className="
                                                                text-xl
                                                                font-bold
                                                                text-gray-900
                                                            "
                                                        >
                                                            #{rental.id.slice(0, 8)}
                                                        </h2>

                                                    </div>


                                                    <span
                                                        className={`
                                                            inline-flex
                                                            w-fit
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                            font-semibold
                                                            ${getStatusClass(status)}
                                                        `}
                                                    >
                                                        {status}
                                                    </span>

                                                </div>


                                                <div
                                                    className="
                                                        mt-6
                                                        grid
                                                        grid-cols-1
                                                        sm:grid-cols-3
                                                        gap-5
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-500
                                                            "
                                                        >
                                                            Gear
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                font-semibold
                                                                text-gray-900
                                                            "
                                                        >
                                                            {gearName}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-500
                                                            "
                                                        >
                                                            Rental Period
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                font-semibold
                                                                text-gray-900
                                                            "
                                                        >
                                                            {new Date(
                                                                rental.startDate
                                                            ).toLocaleDateString()}
                                                            {" → "}
                                                            {new Date(
                                                                rental.endDate
                                                            ).toLocaleDateString()}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-500
                                                            "
                                                        >
                                                            Total
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                text-lg
                                                                font-bold
                                                                text-gray-900
                                                            "
                                                        >
                                                            $
                                                            {rental.totalAmount ??
                                                                "0"}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div
                                                    className="
                                                        mt-6
                                                        pt-5
                                                        border-t
                                                        border-gray-100
                                                        text-blue-600
                                                        font-semibold
                                                    "
                                                >
                                                    View Rental Details →
                                                </div>

                                            </div>

                                        </Link>

                                    );

                                }
                            )

                        )}

                    </div>

                )}

            </div>

        </main>

    );

}