import Image from "next/image";
import Link from "next/link";

type GearProps = {
    gear: any;
};

export default function GearCard({
    gear,
}: GearProps) {
    const imageUrl =
        gear?.imageUrls?.[0];

    const hasImage =
        typeof imageUrl === "string" &&
        imageUrl.trim().length > 0 &&
        !imageUrl.includes("example.com");

    const providerName =
        gear?.provider?.name ||
        gear?.provider?.businessName ||
        "GearUp Provider";

    const price =
        Number(gear?.pricePerDay || 0);

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-[22px]
                border
                border-black/[0.07]
                bg-white
                shadow-[0_4px_18px_rgba(33,31,26,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_14px_35px_rgba(33,31,26,0.12)]
            "
        >
            {/* IMAGE */}

            <Link
                href={`/gear/${gear.id}`}
                className="
                    relative
                    block
                    h-56
                    w-full
                    overflow-hidden
                    bg-[#eeeade]
                "
            >
                {hasImage ? (
                    <Image
                        src={imageUrl}
                        alt={
                            gear?.name ||
                            "Gear"
                        }
                        fill
                        priority
                        sizes="
                            (max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw
                        "
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.03]
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                        "
                    >
                        <div
                            className="
                                text-center
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white
                                    text-[#918b80]
                                    shadow-sm
                                "
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                    />
                                    <circle
                                        cx="8.5"
                                        cy="8.5"
                                        r="1.5"
                                    />
                                    <path
                                        d="m21 15-5-5L5 21"
                                    />
                                </svg>
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    font-semibold
                                    text-[#918b80]
                                "
                            >
                                No image available
                            </p>
                        </div>
                    </div>
                )}
            </Link>

            {/* CONTENT */}

            <div
                className="
                    p-5
                    sm:p-6
                "
            >
                <Link
                    href={`/gear/${gear.id}`}
                    className="block"
                >
                    <h2
                        className="
                            text-xl
                            font-bold
                            leading-tight
                            tracking-[-0.02em]
                            text-[#211f1a]
                            transition
                            group-hover:text-[#bd5f3f]
                        "
                    >
                        {gear?.name ||
                            "Untitled Gear"}
                    </h2>
                </Link>

                <p
                    className="
                        mt-2
                        text-sm
                        text-[#827b6d]
                    "
                >
                    {providerName}
                </p>

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >
                    <div>
                        <span
                            className="
                                text-xl
                                font-extrabold
                                text-[#16a34a]
                            "
                        >
                            ${price}
                        </span>

                        <span
                            className="
                                ml-1
                                text-sm
                                text-[#827b6d]
                            "
                        >
                            /day
                        </span>
                    </div>

                    <Link
                        href={`/gear/${gear.id}`}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#211f1a]
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#d97757]
                        "
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}