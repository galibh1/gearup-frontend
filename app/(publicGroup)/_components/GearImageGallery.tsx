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

    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [failedImages, setFailedImages] =
        useState<Set<number>>(new Set());

    const actualImages =
        validImages.length > 0
            ? validImages
            : [FALLBACK_IMAGE];

    const currentIndex =
        Math.min(
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

            {/* MAIN IMAGE */}

            <div className="absolute inset-0">

                {!currentImageFailed ? (

                    <Image
                        src={currentImage}
                        alt={`${alt} image ${currentIndex + 1}`}
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        onError={() =>
                            markImageFailed(
                                currentIndex
                            )
                        }
                        className="object-cover"
                    />

                ) : (

                    <div className="flex h-full w-full items-center justify-center bg-[#e7e3d8]">

                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#918b80] shadow-sm">

                                <ImageIcon
                                    size={28}
                                />

                            </div>

                            <p className="mt-4 text-sm font-semibold text-[#918b80]">
                                Image unavailable
                            </p>

                        </div>

                    </div>

                )}

            </div>


            {/* PREVIOUS */}

            {actualImages.length > 1 && (

                <button
                    type="button"
                    aria-label="Previous image"
                    onClick={previousImage}
                    className="
                        absolute
                        left-4
                        top-1/2
                        z-20
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/35
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/55
                    "
                >

                    <ChevronLeft
                        className="h-5 w-5"
                    />

                </button>

            )}


            {/* NEXT */}

            {actualImages.length > 1 && (

                <button
                    type="button"
                    aria-label="Next image"
                    onClick={nextImage}
                    className="
                        absolute
                        right-4
                        top-1/2
                        z-20
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/35
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black/55
                    "
                >

                    <ChevronRight
                        className="h-5 w-5"
                    />

                </button>

            )}


            {/* THUMBNAILS */}

            {actualImages.length > 1 && (

                <div className="absolute left-0 right-0 top-4 z-20 flex justify-center px-4">

                    <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-white/20 bg-black/25 p-2 backdrop-blur-md">

                        {actualImages.map(
                            (image, index) => {

                                const failed =
                                    failedImages.has(
                                        index
                                    );

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
                                            h-14
                                            w-14
                                            shrink-0
                                            overflow-hidden
                                            rounded-xl
                                            border-2
                                            transition
                                            sm:h-16
                                            sm:w-16
                                            ${
                                                index ===
                                                currentIndex
                                                    ? "border-white scale-105"
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
                                                sizes="64px"
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
                                                    size={18}
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


            {/* IMAGE COUNTER */}

            {actualImages.length > 1 && (

                <div className="absolute bottom-20 right-5 z-20 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">

                    {currentIndex + 1} /{" "}
                    {actualImages.length}

                </div>

            )}

        </div>
    );
}