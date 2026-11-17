"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/motion/preferences";

interface FilmAsset {
  readonly src: string;
  readonly poster: string;
  readonly description: string;
}

export function LandscapeFilm({ film }: { film: FilmAsset }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loaded = useRef(false);
  const visible = useRef(false);
  const manuallyPaused = useRef(false);
  const reducedMotion = useReducedMotionPreference();
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!loaded.current) {
      video.src = film.src;
      video.load();
      loaded.current = true;
    }
    try {
      await video.play();
      setFailed(false);
    } catch {
      /* Autoplay may be blocked; the play control remains available. */
    }
  }, [film.src]);

  useEffect(() => {
    if (!containerRef.current) return;
    const video = videoRef.current;
    const connection =
      "connection" in navigator ? navigator.connection : undefined;
    const saveData =
      typeof connection === "object" &&
      connection !== null &&
      "saveData" in connection &&
      connection.saveData === true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (
          entry.isIntersecting &&
          reducedMotion === false &&
          !saveData &&
          !manuallyPaused.current &&
          !document.hidden
        ) {
          void play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(containerRef.current);
    const onVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (
        visible.current &&
        reducedMotion === false &&
        !saveData &&
        !manuallyPaused.current
      ) {
        void play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video?.pause();
    };
  }, [play, reducedMotion]);

  return (
    <div
      ref={containerRef}
      data-scroll-expand
      className="relative isolate flex min-h-140 flex-col justify-end overflow-clip bg-midnight-navy sm:min-h-160 lg:h-full"
    >
      <video
        data-scroll-image
        ref={videoRef}
        poster={film.poster}
        preload="none"
        muted
        loop
        playsInline
        aria-label={film.description}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          loaded.current = false;
          setFailed(true);
          setIsPlaying(false);
        }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        Your browser does not support this landscape film.
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-midnight-navy/80 via-midnight-navy/15 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-400 flex-wrap items-end justify-between gap-6 p-6 sm:p-10 lg:px-16 lg:py-12">
        <p className="max-w-xl font-editorial text-xl italic leading-snug text-glacier-cream sm:text-2xl lg:text-3xl">
          High above the Hunza and Nagar valleys, where the weather writes its
          own itinerary.
        </p>
        <div>
          <button
            type="button"
            aria-label={
              isPlaying ? "Pause landscape film" : "Play landscape film"
            }
            onClick={() => {
              if (isPlaying) {
                manuallyPaused.current = true;
                videoRef.current?.pause();
              } else {
                manuallyPaused.current = false;
                void play();
              }
            }}
            className="inline-flex min-h-12 min-w-12 cursor-pointer items-center gap-3 border border-glacier-cream/65 bg-midnight-navy/45 px-5 py-3 text-xs font-medium tracking-[0.08em] text-glacier-cream backdrop-blur-xs transition-colors duration-150 hover:border-warm-gold hover:bg-midnight-navy/80 hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold motion-reduce:transition-none"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isPlaying ? "Pause film" : "Play film"}</span>
          </button>
          {failed && (
            <p
              role="status"
              className="mt-2 max-w-48 text-xs text-glacier-cream"
            >
              Film unavailable. Try playing again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
