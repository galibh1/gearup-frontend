import { NextRequest, NextResponse } from "next/server";


export async function POST(
    req: NextRequest
) {

    try {

        const body = await req.json();


        console.log(
            "Payment request body:",
            body
        );


        const response = await fetch(
            "http://localhost:8000/api/payments/create",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Cookie":
                        req.headers.get("cookie") || ""
                },

                body: JSON.stringify(body)
            }
        );


        const data = await response.json();


        console.log(
            "Backend payment response:",
            data
        );


        return NextResponse.json(
            data,
            {
                status: response.status
            }
        );


    } catch(error:any){

        console.error(
            "Payment proxy error:",
            error
        );


        return NextResponse.json(
            {
                success:false,
                message:"Payment proxy failed"
            },
            {
                status:500
            }
        );

    }

}