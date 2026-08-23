import {
    useQuery
} from "@tanstack/react-query";

import {
    getAllGear,
    getGearById
} from "@/services/gear.service";



export const useGear = () => {

    return useQuery({

        queryKey: [
            "gear"
        ],

        queryFn:
            getAllGear,

    });

};




export const useGearDetails = (
    id:string
) => {

    return useQuery({

        queryKey:[
            "gear",
            id
        ],

        queryFn:
            () => getGearById(id),

        enabled:
            Boolean(id),

    });

};