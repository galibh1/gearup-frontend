"use server";

const API_URL = (
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
).replace(/\/$/, "");

type GearResult = {
    success: boolean;
    data: any[];
    message?: string;
};

async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 3,
    timeoutMs = 15000
): Promise<Response> {

    let lastError: unknown = null;

    for (let attempt = 1; attempt <= retries; attempt++) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, timeoutMs);

        try {

            const response = await fetch(
                url,
                {
                    ...options,
                    cache: "no-store",
                    signal: controller.signal,
                    headers: {
                        Accept: "application/json",
                        ...(options.headers || {}),
                    },
                }
            );

            clearTimeout(timeout);

            /*
             * If the backend responds successfully,
             * return immediately.
             */
            if (response.ok) {
                return response;
            }

            /*
             * Retry server-side errors.
             */
            if (
                response.status >= 500 &&
                attempt < retries
            ) {

                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        700 * attempt
                    )
                );

                continue;
            }

            return response;

        } catch (error) {

            clearTimeout(timeout);

            lastError = error;

            console.error(
                `Gear API attempt ${attempt} failed:`,
                error
            );

            if (attempt < retries) {

                await new Promise((resolve) =>
                    setTimeout(
                        resolve,
                        700 * attempt
                    )
                );

            }

        }
    }

    throw lastError ||
        new Error("Unable to connect to the GearUp API");
}


export async function getAllGear(): Promise<GearResult> {

    if (!API_URL) {

        console.error(
            "BACKEND_API_URL / NEXT_PUBLIC_API_URL is not configured."
        );

        return {
            success: false,
            data: [],
            message:
                "Gear service is not configured."
        };
    }


    try {

        const response = await fetchWithRetry(
            `${API_URL}/api/gear`,
            {
                method: "GET",
            },
            3,
            15000
        );


        let result: any = null;

        try {

            result = await response.json();

        } catch {

            result = null;

        }


        if (!response.ok) {

            console.error(
                "Gear API error:",
                response.status,
                result
            );

            return {
                success: false,
                data: [],
                message:
                    result?.message ||
                    "Unable to load gear right now."
            };
        }


        /*
         * Support both:
         *
         * { data: [...] }
         *
         * and
         *
         * [...]
         */
        const gearData =
            Array.isArray(result)
                ? result
                : Array.isArray(result?.data)
                    ? result.data
                    : Array.isArray(result?.gear)
                        ? result.gear
                        : [];


        return {
            success: true,
            data: gearData,
        };


    } catch (error) {

        console.error(
            "Failed to fetch gear after retries:",
            error
        );

        return {
            success: false,
            data: [],
            message:
                "Unable to connect to the GearUp server. Please try again.",
        };
    }
}