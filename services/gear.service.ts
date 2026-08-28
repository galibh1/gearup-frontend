const API_URL =
    process.env.NEXT_PUBLIC_API_URL;



export const getAllGear = async () => {


    const response =
        await fetch(
            `${API_URL}/gear`,
            {
                cache: "no-store"
            }
        );



    const result =
        await response.json();



    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch gear"
        );

    }


    return result;

};





export const getGearById = async (
    id: string
) => {


    const response =
        await fetch(
            `${API_URL}/gear/${id}`,
            {
                cache: "no-store"
            }
        );



    const result =
        await response.json();



    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch gear details"
        );

    }



    return result;

};