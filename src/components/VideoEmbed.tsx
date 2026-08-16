import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "X4f6frV_pNI";
const PLAYLIST = "PLvCnaSchkbbQ6XdS4m0YrJsXVnygcm_BC";

export function VideoEmbed() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-video bg-navy-deep">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?list=${PLAYLIST}&autoplay=1&rel=0`}
            title="IT ROAD GROUP — Offre Nearshore Hybride"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
            aria-label="Lire la vidéo"
          >
            <img
              src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
              alt="Miniature vidéo IT ROAD GROUP"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy-deep/30 transition-colors group-hover:bg-navy-deep/20" />
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-white shadow-lg transition-transform group-hover:scale-110 group-active:scale-95 sm:h-20 sm:w-20">
              <PlayCircle className="h-8 w-8 fill-current sm:h-10 sm:w-10" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
