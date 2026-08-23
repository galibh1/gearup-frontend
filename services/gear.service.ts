import api from "@/lib/api";


export const getAllGear = async()=>{

    const response =
        await api.get("/gear");


    return response.data;

};



export const getGearById = async(
    id:string
)=>{

    const response =
        await api.get(`/gear/${id}`);


    return response.data;

};