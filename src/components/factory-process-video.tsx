"use client";

import { ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/xingyue-factory-process.mp4";
const POSTER_SRC = "/images/xingyue-factory-process-poster.jpg";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type FactoryProcessVideoProps = {
  title: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
};

export function FactoryProcessVideo({
  title,
  copy,
  ctaLabel,
  ctaHref,
}: FactoryProcessVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureSource = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.getAttribute("src")) return;

    video.setAttribute("src", VIDEO_SRC);
    video.load();
  }, []);

  const playVideo = useCallback(
    (userInitiated = false) => {
      const video = videoRef.current;
      if (!video) return;
      if (!userInitiated && window.matchMedia?.(REDUCED_MOTION_QUERY).matches) return;

      ensureSource();
      const playRequest = video.play();
      void playRequest?.catch(() => setIsPlaying(false));
    },
    [ensureSource],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const motionPreference = window.matchMedia?.(REDUCED_MOTION_QUERY);
    const handleMotionChange = () => {
      if (motionPreference?.matches) {
        video.pause();
        setIsPlaying(false);
      }
    };

    motionPreference?.addEventListener?.("change", handleMotionChange);

    if (!("IntersectionObserver" in window)) {
      return () => motionPreference?.removeEventListener?.("change", handleMotionChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        ensureSource();
        if (!motionPreference?.matches) playVideo();
        observer.disconnect();
      },
      { rootMargin: "240px 0px", threshold: 0.1 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      motionPreference?.removeEventListener?.("change", handleMotionChange);
    };
  }, [ensureSource, playVideo]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      return;
    }

    setHasError(false);
    playVideo(true);
  };

  const controlLabel = isPlaying
    ? "Pause factory process video"
    : "Play factory process video";

  return (
    <section
      ref={sectionRef}
      data-home-section="factory-video"
      className="overflow-hidden bg-[#fbfaf7] px-5 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
        <div className="relative mx-auto aspect-[9/16] max-h-[42rem] w-full max-w-[24rem] overflow-hidden rounded-md bg-[#17202a] shadow-[0_24px_70px_rgba(23,32,42,0.18)]">
          <video
            ref={videoRef}
            aria-label="Xingyue Jewelry factory manufacturing process video"
            className="h-full w-full object-cover"
            loop
            muted
            onError={() => {
              videoRef.current?.pause();
              setHasError(true);
              setIsPlaying(false);
            }}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            playsInline
            poster={POSTER_SRC}
            preload="none"
          />
          {hasError ? (
            <Image
              src={POSTER_SRC}
              alt="Xingyue Jewelry factory process poster"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={controlLabel}
              className="absolute bottom-4 end-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-[#17202a]/88 text-white shadow-lg backdrop-blur transition hover:bg-[#17202a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6cf96]"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Play aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-balance font-serif text-4xl leading-tight text-[#17202a] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#596575] sm:text-lg">
            {copy}
          </p>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#17202a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a3542] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a98945]"
          >
            {ctaLabel}
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
