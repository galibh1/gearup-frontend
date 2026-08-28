"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/shared/LogoutButton";


export default function ProviderNavbar() {

    const pathname = usePathname();

    return (

        <header className="
            sticky
            top-0
            z-50
            border-b
            bg-white/95
            backdrop-blur
        ">

            <div className="
                max-w-7xl
                mx-auto
                px-6
                md:px-10
                h-20
                flex
                items-center
                justify-between
            ">

                {/* Logo */}

                <Link
                    href="/provider-dashboard"
                    className="
                        text-2xl
                        font-extrabold
                        tracking-tight
                    "
                >

                    GearUp

                </Link>


                {/* Navigation */}

                <nav className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                ">

                    <a
                        href="#rental-requests"
                        className={`
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            font-semibold
                            transition
                            ${
                                pathname ===
                                "/provider-dashboard"
                                    ? "hover:bg-gray-100"
                                    : ""
                            }
                        `}
                    >

                        Rental Requests

                    </a>


                    <a
                        href="#my-gear"
                        className="
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            font-semibold
                            hover:bg-gray-100
                            transition
                        "
                    >

                        My Gear

                    </a>

                </nav>


                {/* Logout */}

                <LogoutButton />

            </div>

        </header>

    );

}