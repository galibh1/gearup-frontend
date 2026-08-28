import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#f2efe4] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="border-b border-black/[0.08] bg-[#faf9f5]">

                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

                    {/* Logo */}

                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#211f1a] text-sm font-extrabold text-[#faf9f5]">
                            G
                        </div>

                        <div>
                            <div className="text-lg font-bold tracking-tight">
                                Gear<span className="text-[#d97757]">Up</span>
                            </div>

                            <div className="hidden text-[10px] uppercase tracking-[0.12em] text-[#a49d8c] sm:block">
                                Rent · Explore · Repeat
                            </div>
                        </div>
                    </Link>


                    {/* Register */}

                    <div className="flex items-center gap-4">

                        <span className="hidden text-sm text-[#726c60] sm:block">
                            New to GearUp?
                        </span>

                        <Link
                            href="/register"
                            className="
                                rounded-full
                                border
                                border-[#d97757]
                                bg-transparent
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-[#211f1a]
                                transition
                                hover:bg-[#d97757]
                                hover:text-white
                            "
                        >
                            Create account
                        </Link>

                    </div>

                </div>

            </header>


            {/* ================= LOGIN AREA ================= */}

            <section className="relative overflow-hidden">

                {/* Background decoration */}

                <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#dce4d7]/70 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d97757]/10 blur-3xl" />


                <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center px-6 py-16 lg:px-8 lg:py-20">

                    {/* Heading */}

                    <div className="w-full max-w-2xl text-center">

                        <div className="flex items-center justify-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bd5f3f]">

                            <span className="h-px w-5 bg-[#bd5f3f]" />

                            Sign in

                            <span className="h-px w-5 bg-[#bd5f3f]" />

                        </div>


                        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">

                            Welcome back to GearUp

                        </h1>


                        <p className="mt-4 text-base text-[#726c60] sm:text-lg">

                            Sign in to continue to your account.

                        </p>

                    </div>


                    {/* ================= LOGIN CARD ================= */}

                    <div
                        className="
                            mt-9
                            w-full
                            max-w-[500px]
                            rounded-[2rem]
                            border
                            border-black/[0.08]
                            bg-[#faf9f5]
                            px-7
                            py-8
                            shadow-[0_20px_60px_rgba(33,31,26,0.10)]
                            sm:px-9
                            sm:py-9

                            [&_label]:!mb-2
                            [&_label]:!block
                            [&_label]:!text-sm
                            [&_label]:!font-semibold
                            [&_label]:!text-[#211f1a]

                            [&_input]:!h-12
                            [&_input]:!w-full
                            [&_input]:!rounded-xl
                            [&_input]:!border
                            [&_input]:!border-black/[0.08]
                            [&_input]:!bg-white
                            [&_input]:!px-4
                            [&_input]:!text-sm
                            [&_input]:!text-[#211f1a]
                            [&_input]:!shadow-none
                            [&_input]:!outline-none
                            [&_input]:focus:!border-[#d97757]
                            [&_input]:focus:!ring-2
                            [&_input]:focus:!ring-[#d97757]/10

                            [&_button]:!mt-5
                            [&_button]:!h-12
                            [&_button]:!w-full
                            [&_button]:!rounded-xl
                            [&_button]:!bg-[#d97757]
                            [&_button]:!text-sm
                            [&_button]:!font-semibold
                            [&_button]:!text-white
                            [&_button]:!shadow-sm
                            [&_button]:transition
                            [&_button]:hover:!bg-[#bd5f3f]
                            [&_button]:hover:!shadow-md
                        "
                    >

                        <LoginForm />

                    </div>


                    {/* Register link */}

                    <p className="mt-7 text-center text-sm text-[#726c60]">

                        Don't have an account?{" "}

                        <Link
                            href="/register"
                            className="
                                font-semibold
                                text-[#bd5f3f]
                                transition
                                hover:text-[#a84f32]
                            "
                        >
                            Sign up →
                        </Link>

                    </p>


                    {/* Security message */}

                    <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#9a9385]">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                        Your account is protected by secure authentication.

                    </div>

                </div>

            </section>

        </main>
    );
}