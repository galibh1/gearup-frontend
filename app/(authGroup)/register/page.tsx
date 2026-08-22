import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
    return (
        <main
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-linear-to-br
            from-white
            via-gray-50
            to-emerald-50
            px-4
            "
        >

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-8 text-center">


                    {/* Logo */}
                    <div
                        className="
                        mx-auto
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-100
                        text-emerald-700
                        text-2xl
                        font-bold
                        shadow-sm
                        "
                    >
                        G
                    </div>



                    <h1
                        className="
                        text-4xl
                        font-bold
                        text-gray-900
                        "
                    >
                        Create Account
                    </h1>



                    <p
                        className="
                        mt-3
                        text-gray-500
                        "
                    >
                        Create your{" "}
                        <span className="font-semibold">
                            GearUp
                        </span>{" "}
                        account to start renting gear.
                    </p>


                </div>





                {/* Register Card */}
                <div
                    className="
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-8
                    shadow-xl
                    "
                >

                    <RegisterForm />

                </div>





                {/* Footer */}
                <div
                    className="
                    mt-8
                    text-center
                    text-sm
                    text-gray-500
                    "
                >

                    Already have an account?{" "}


                    <Link
                        href="/login"
                        className="
                        font-semibold
                        text-emerald-600
                        hover:text-emerald-700
                        "
                    >
                        Login
                    </Link>


                </div>


            </div>


        </main>
    );
}