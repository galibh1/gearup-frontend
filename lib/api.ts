import axios from "axios";


const api = axios.create({

    baseURL:
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:8000",


    withCredentials:true,


    headers:{

        "Content-Type":
            "application/json",

    },

});





api.interceptors.response.use(

    (response)=>response,


    (error)=>{


        return Promise.reject({

            message:
                error.response?.data?.message ||
                "Something went wrong",


            status:
                error.response?.status || 500,


            data:
                error.response?.data || null,

        });


    }

);






// ==========================
// PAYMENT
// ==========================


export async function createPayment(

    rentalId:string

){


    const response = await api.post(

        "/api/payment/create-checkout-session",

        {
            rentalId,
        }

    );


    return response.data;

}





export {
    api
};



export default api;