"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/motion/preferences";
import { HomeSectionHeading } from "@/components/ui/HomeSectionHeading";

interface FilmAsset {
  src: string;
  poster: string;
  description: string;
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
        )
          void play();
        else videoRef.current?.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(containerRef.current);
    const onVisibility = () => {
      if (document.hidden) videoRef.current?.pause();
      else if (
        visible.current &&
        reducedMotion === false &&
        !saveData &&
        !manuallyPaused.current
      )
        void play();
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
      className="relative isolate overflow-hidden bg-midnight-navy"
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
        className="absolute -inset-y-24 inset-x-0 h-[calc(100%+192px)] w-full object-cover"
      >
        Your browser does not support this landscape film.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-midnight-navy/60 via-transparent to-midnight-navy/10" />
      <div className="relative mx-auto flex min-h-[560px] max-w-[1600px] flex-wrap items-end justify-between gap-8 p-6 sm:min-h-[640px] sm:p-10 lg:min-h-[calc(100svh-88px)] lg:px-16 lg:py-12">
        <HomeSectionHeading
          id="film-title"
          variant="feature"
          className="max-w-4xl text-glacier-cream"
        >
          Feel the{" "}
          <span className="font-editorial font-normal lowercase italic text-warm-gold">
            scale.
          </span>
        </HomeSectionHeading>
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
            className="inline-flex min-h-12 min-w-12 cursor-pointer items-center gap-3 border border-glacier-cream/70 bg-midnight-navy/40 px-4 py-3 text-xs text-glacier-cream hover:bg-midnight-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glacier-cream"
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
