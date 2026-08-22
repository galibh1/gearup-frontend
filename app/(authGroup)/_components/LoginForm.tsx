"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const LoginForm = () => {

    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("redirectTo") ?? "";


    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        null
    );



    useEffect(() => {

        if (!state) return;


        if (!state.success) {

            toast.error(
                state.message || "Login failed"
            );

        }


    }, [state]);




    return (

        <form
            action={action}
            className="space-y-6"
        >



            <div className="space-y-2">

                <Label
                    htmlFor="email"
                    className="
                    text-sm
                    font-semibold
                    text-gray-800
                    "
                >
                    Email
                </Label>


                <Input

                    id="email"

                    name="email"

                    type="email"

                    placeholder="you@example.com"

                    required


                    className="
                    h-14
                    rounded-xl
                    border-gray-200
                    bg-white
                    px-5
                    text-sm
                    shadow-sm
                    placeholder:text-gray-400
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    "

                />


            </div>





            <div className="space-y-2">


                <Label

                    htmlFor="password"

                    className="
                    text-sm
                    font-semibold
                    text-gray-800
                    "

                >

                    Password

                </Label>




                <Input


                    id="password"

                    name="password"

                    type="password"

                    placeholder="Enter your password"

                    required



                    className="
                    h-14
                    rounded-xl
                    border-gray-200
                    bg-white
                    px-5
                    text-sm
                    shadow-sm
                    placeholder:text-gray-400
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    "


                />


            </div>







            <Button

                type="submit"

                disabled={pending}


                className="
                h-12
                w-full
                rounded-xl
                bg-emerald-600
                text-white
                font-semibold
                shadow-md
                transition
                hover:bg-emerald-700
                active:scale-[0.98]
                "

            >

                {pending ? "Signing In..." : "Sign in"}


            </Button>




        </form>

    );

};


export default LoginForm;