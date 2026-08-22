"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



const RegisterForm = () => {


    const [state, action, pending] = useActionState(
        registerAction,
        null
    );



    useEffect(() => {

        if (!state) return;


        if (!state.success) {

            toast.error(
                state.message || "Registration failed"
            );

        }


    }, [state]);





    return (

        <form
            action={action}
            className="space-y-5"
        >





            {/* Name */}
            <div className="space-y-2">


                <Label
                    htmlFor="name"
                    className="
                    text-sm
                    font-semibold
                    text-gray-800
                    "
                >
                    Full Name
                </Label>



                <Input

                    id="name"

                    name="name"

                    placeholder="Enter your full name"

                    required


                    className="
                    h-14
                    rounded-xl
                    border-gray-200
                    px-5
                    shadow-sm
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    "

                />


            </div>








            {/* Email */}
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

                    placeholder="Enter your email"

                    required


                    className="
                    h-14
                    rounded-xl
                    border-gray-200
                    px-5
                    shadow-sm
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    "

                />


            </div>








            {/* Password */}
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
                    px-5
                    shadow-sm
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    "

                />


            </div>









            {/* Role */}
            <div className="space-y-2">


                <Label
                    className="
                    text-sm
                    font-semibold
                    text-gray-800
                    "
                >
                    Register As
                </Label>



                <Select
                    name="role"
                    required
                >

                    <SelectTrigger
                        className="
                        h-14
                        w-full
                        rounded-xl
                        border-gray-200
                        shadow-sm
                        "
                    >

                        <SelectValue
                            placeholder="Select your role"
                        />


                    </SelectTrigger>



                    <SelectContent>


                        <SelectItem value="CUSTOMER">

                            Customer

                        </SelectItem>



                        <SelectItem value="PROVIDER">

                            Provider

                        </SelectItem>


                    </SelectContent>


                </Select>



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
                hover:bg-emerald-700
                active:scale-[0.98]
                "

            >

                {
                    pending
                    ? "Creating Account..."
                    : "Create Account"
                }


            </Button>





        </form>

    );


};


export default RegisterForm;