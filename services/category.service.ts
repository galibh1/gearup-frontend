const API_URL =
    process.env.BACKEND_API_URL ||
    "http://localhost:8000";


export const getAllCategories = async () => {

    const response =
        await fetch(
            `${API_URL}/api/categories`,
            {
                method: "GET",
                cache: "no-store",
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch categories"
        );

    }


    return result;

};