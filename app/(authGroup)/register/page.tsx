import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-[#f2efe4] text-[#211f1a]">

            {/* ================= HEADER ================= */}

            <header className="border-b border-black/[0.08] bg-[#faf9f5]">

                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

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


                    {/* Header sign-in */}

                    <div className="flex items-center gap-4">

                        <span className="hidden text-sm text-[#726c60] sm:block">
                            Already a member?
                        </span>

                        <Link
                            href="/login"
                            className="
                                rounded-full
                                border
                                border-black/[0.1]
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                transition
                                hover:border-[#bd5f3f]
                                hover:text-[#bd5f3f]
                            "
                        >
                            Sign in
                        </Link>

                    </div>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <section className="relative overflow-hidden">

                {/* Decorative background */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-40
                        top-20
                        h-96
                        w-96
                        rounded-full
                        bg-[#dce4d7]/70
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-40
                        bottom-0
                        h-96
                        w-96
                        rounded-full
                        bg-[#d97757]/10
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                        mx-auto
                        grid
                        min-h-[calc(100vh-72px)]
                        max-w-7xl
                        items-center
                        gap-14
                        px-6
                        py-12
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:px-8
                        lg:py-16
                    "
                >

                    {/* ================= LEFT SIDE ================= */}

                    <div className="hidden lg:block">

                        <div className="max-w-lg">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    font-mono
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-[#bd5f3f]
                                "
                            >
                                <span className="h-px w-5 bg-[#bd5f3f]" />

                                Welcome to GearUp
                            </div>


                            <h1
                                className="
                                    mt-6
                                    text-5xl
                                    font-extrabold
                                    leading-[1.02]
                                    tracking-[-0.045em]
                                    xl:text-6xl
                                "
                            >
                                Your next

                                <br />

                                adventure

                                <br />

                                <span className="text-[#d97757]">
                                    starts here.
                                </span>
                            </h1>


                            <p
                                className="
                                    mt-7
                                    max-w-md
                                    text-base
                                    leading-7
                                    text-[#726c60]
                                "
                            >
                                Join GearUp to discover quality sports and
                                outdoor equipment from local providers.
                                Rent what you need and explore more.
                            </p>


                            {/* ================= BENEFITS ================= */}

                            <div className="mt-9 space-y-4">

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#dce4d7]
                                            text-sm
                                            font-bold
                                            text-[#66765a]
                                        "
                                    >
                                        ✓
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            Quality gear
                                        </p>

                                        <p className="text-xs text-[#8d8678]">
                                            Equipment from GearUp providers
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#dce4d7]
                                            text-sm
                                            font-bold
                                            text-[#66765a]
                                        "
                                    >
                                        ✓
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            Flexible rentals
                                        </p>

                                        <p className="text-xs text-[#8d8678]">
                                            Choose the dates that work for you
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#dce4d7]
                                            text-sm
                                            font-bold
                                            text-[#66765a]
                                        "
                                    >
                                        ✓
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            Secure checkout
                                        </p>

                                        <p className="text-xs text-[#8d8678]">
                                            Secure payments through Stripe
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* ================= MARKETPLACE CARD ================= */}

                            <div
                                className="
                                    mt-10
                                    max-w-sm
                                    rounded-2xl
                                    border
                                    border-black/[0.07]
                                    bg-[#faf9f5]
                                    p-5
                                    shadow-sm
                                "
                            >

                                <div className="flex items-center justify-between gap-5">

                                    <div>

                                        <p
                                            className="
                                                font-mono
                                                text-[10px]
                                                uppercase
                                                tracking-[0.1em]
                                                text-[#a49d8c]
                                            "
                                        >
                                            GearUp marketplace
                                        </p>

                                        <p className="mt-1 text-sm font-bold">
                                            Rent. Explore. Repeat.
                                        </p>

                                    </div>


                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#d97757]
                                            text-sm
                                            font-bold
                                            text-white
                                        "
                                    >
                                        →
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= RIGHT SIDE ================= */}

                    <div className="w-full max-w-[560px] justify-self-center">

                        {/* Mobile heading */}

                        <div className="mb-7 text-center lg:hidden">

                            <div
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    font-mono
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-[#bd5f3f]
                                "
                            >

                                <span className="h-px w-4 bg-[#bd5f3f]" />

                                Join GearUp

                                <span className="h-px w-4 bg-[#bd5f3f]" />

                            </div>


                            <h1
                                className="
                                    text-4xl
                                    font-extrabold
                                    tracking-[-0.04em]
                                "
                            >
                                Create your account
                            </h1>


                            <p
                                className="
                                    mx-auto
                                    mt-3
                                    max-w-sm
                                    text-sm
                                    leading-6
                                    text-[#726c60]
                                "
                            >
                                Start renting gear for your next adventure.
                            </p>

                        </div>


                        {/* Desktop form heading */}

                        <div className="mb-6 hidden lg:block">

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-[#bd5f3f]
                                "
                            >
                                Create account
                            </p>


                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-extrabold
                                    tracking-[-0.03em]
                                "
                            >
                                Get started with GearUp
                            </h2>


                            <p className="mt-2 text-sm text-[#726c60]">
                                Create your account in a few simple steps.
                            </p>

                        </div>


                        {/* ================= FORM CARD ================= */}

                        <div
                            className="
                                rounded-[1.75rem]
                                border
                                border-black/[0.08]
                                bg-[#faf9f5]
                                px-5
                                py-6
                                shadow-[0_18px_50px_rgba(33,31,26,0.09)]
                                sm:px-7
                                sm:py-7

                                [&_form]:space-y-5

                                [&_label]:!mb-2
                                [&_label]:!block
                                [&_label]:!text-sm
                                [&_label]:!font-semibold
                                [&_label]:!text-[#211f1a]

                                [&_input]:!h-12
                                [&_input]:!rounded-xl
                                [&_input]:!border
                                [&_input]:!border-black/[0.09]
                                [&_input]:!bg-white
                                [&_input]:!px-4
                                [&_input]:!text-sm
                                [&_input]:!text-[#211f1a]
                                [&_input]:!shadow-none
                                [&_input]:!outline-none
                                [&_input]:focus:!border-[#d97757]
                                [&_input]:focus:!ring-2
                                [&_input]:focus:!ring-[#d97757]/10

                                [&_select]:!h-12
                                [&_select]:!rounded-xl
                                [&_select]:!border
                                [&_select]:!border-black/[0.09]
                                [&_select]:!bg-white
                                [&_select]:!px-4
                                [&_select]:!text-sm
                                [&_select]:!text-[#211f1a]

                                [&_button]:!mt-2
                                [&_button]:!h-12
                                [&_button]:!rounded-xl
                                [&_button]:!bg-[#d97757]
                                [&_button]:!text-sm
                                [&_button]:!font-semibold
                                [&_button]:!text-white
                                [&_button]:!shadow-sm
                                [&_button]:transition-all
                                [&_button]:hover:!bg-[#bd5f3f]
                                [&_button]:hover:!shadow-md
                            "
                        >

                            <RegisterForm />

                        </div>


                        {/* ================= MOBILE LOGIN ================= */}

                        <p
                            className="
                                mt-6
                                text-center
                                text-sm
                                text-[#726c60]
                                lg:hidden
                            "
                        >
                            Already have an account?{" "}

                            <Link
                                href="/login"
                                className="
                                    font-semibold
                                    text-[#bd5f3f]
                                    hover:text-[#a84f32]
                                "
                            >
                                Sign in →
                            </Link>

                        </p>


                        {/* ================= TRUST MESSAGE ================= */}

                        <div
                            className="
                                mt-5
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-[11px]
                                text-[#9a9385]
                            "
                        >

                            <span className="h-1.5 w-1.5 rounded-full bg-[#66765a]" />

                            Your account is protected by secure authentication.

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}