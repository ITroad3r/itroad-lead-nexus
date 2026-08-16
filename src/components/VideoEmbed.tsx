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
              src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes("sddefault")) {
                  img.src = `https://i.ytimg.com/vi/${VIDEO_ID}/sddefault.jpg`;
                }
              }}
              alt="Miniature vidéo IT ROAD GROUP"
              className="absolute inset-0 h-full w-full object-cover"
              width={1280}
              height={720}
            />
            <div className="absolute inset-0 bg-navy-deep/30 transition-colors group-hover:bg-navy-deep/20" />
            <Play className="relative z-10 h-16 w-16 fill-white text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110 group-active:scale-95 sm:h-24 sm:w-24" />

          </button>
        )}
      </div>
    </div>
  );
}
