"use client";

import Image from "next/image";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ImageIcon,
} from "lucide-react";

type GearImageGalleryProps = {
    images: string[];
    alt: string;
};

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format";

export default function GearImageGallery({
    images,
    alt,
}: GearImageGalleryProps) {

    const validImages = images.filter(
        (image) =>
            typeof image === "string" &&
            image.trim().length > 0
    );

    const actualImages =
        validImages.length > 0
            ? validImages
            : [FALLBACK_IMAGE];

    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [failedImages, setFailedImages] =
        useState<Set<number>>(new Set());

    const currentIndex = Math.min(
        selectedIndex,
        actualImages.length - 1
    );

    const currentImage =
        actualImages[currentIndex];

    function markImageFailed(index: number) {

        setFailedImages((current) => {

            const next = new Set(current);

            next.add(index);

            return next;

        });

    }

    function previousImage() {

        if (actualImages.length <= 1) {
            return;
        }

        setSelectedIndex((current) =>
            current === 0
                ? actualImages.length - 1
                : current - 1
        );

    }

    function nextImage() {

        if (actualImages.length <= 1) {
            return;
        }

        setSelectedIndex((current) =>
            current === actualImages.length - 1
                ? 0
                : current + 1
        );

    }

    const currentImageFailed =
        failedImages.has(currentIndex);


    return (
        <div className="absolute inset-0">


            {/* =================================================
                MAIN IMAGE
            ================================================= */}

            <div className="absolute inset-0">

                {!currentImageFailed ? (

                    <Image
                        src={currentImage}
                        alt={`${alt} image ${currentIndex + 1}`}
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        onError={() =>
                            markImageFailed(currentIndex)
                        }
                        className="object-cover"
                    />

                ) : (

                    <div className="flex h-full w-full items-center justify-center bg-[#e7e3d8]">

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#918b80] shadow-sm">

                                <ImageIcon size={24} />

                            </div>

                            <p className="mt-3 text-xs font-semibold text-[#918b80]">
                                Image unavailable
                            </p>

                        </div>

                    </div>

                )}

            </div>


            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            {actualImages.length > 1 && (

                <button
                    type="button"
                    aria-label="Previous image"
                    onClick={previousImage}
                    className="
                        absolute
                        left-3
                        top-1/2
                        z-20
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/30
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/55
                    "
                >

                    <ChevronLeft className="h-4 w-4" />

                </button>

            )}


            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            {actualImages.length > 1 && (

                <button
                    type="button"
                    aria-label="Next image"
                    onClick={nextImage}
                    className="
                        absolute
                        right-3
                        top-1/2
                        z-20
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/30
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/55
                    "
                >

                    <ChevronRight className="h-4 w-4" />

                </button>

            )}


            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {actualImages.length > 1 && (

                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-3">

                    <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-xl border border-white/20 bg-black/25 p-1.5 backdrop-blur-md">

                        {actualImages.map(
                            (image, index) => {

                                const failed =
                                    failedImages.has(index);

                                return (

                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        aria-label={`View image ${index + 1}`}
                                        onClick={() =>
                                            setSelectedIndex(
                                                index
                                            )
                                        }
                                        className={`
                                            relative
                                            h-11
                                            w-11
                                            shrink-0
                                            overflow-hidden
                                            rounded-lg
                                            border-2
                                            transition
                                            sm:h-12
                                            sm:w-12
                                            ${
                                                index === currentIndex
                                                    ? "scale-105 border-white"
                                                    : "border-white/30 opacity-75 hover:opacity-100"
                                            }
                                        `}
                                    >

                                        {!failed ? (

                                            <Image
                                                src={image}
                                                alt={`${alt} thumbnail ${index + 1}`}
                                                fill
                                                unoptimized
                                                sizes="48px"
                                                onError={() =>
                                                    markImageFailed(
                                                        index
                                                    )
                                                }
                                                className="object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-full w-full items-center justify-center bg-[#e7e3d8] text-[#918b80]">

                                                <ImageIcon
                                                    size={15}
                                                />

                                            </div>

                                        )}

                                    </button>

                                );

                            }
                        )}

                    </div>

                </div>

            )}


            {/* =================================================
                IMAGE COUNTER
            ================================================= */}

            {actualImages.length > 1 && (

                <div className="absolute right-3 top-3 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">

                    {currentIndex + 1} /{" "}
                    {actualImages.length}

                </div>

            )}

        </div>
    );
}