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


    const image =
        imageUrl &&
        typeof imageUrl === "string" &&
        !imageUrl.includes("example.com")
            ? imageUrl
            : "/placeholder-gear.jpg";


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
                    block
                    relative
                    h-56
                    w-full
                    overflow-hidden
                    bg-[#eeeade]
                "
            >

                <Image
                    src={image}
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
                    className="
                        block
                    "
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