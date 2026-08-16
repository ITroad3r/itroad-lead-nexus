const VIDEO_ID = "X4f6frV_pNI";
const PLAYLIST = "PLvCnaSchkbbQ6XdS4m0YrJsXVnygcm_BC";

export function VideoEmbed() {
  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-video bg-navy-deep">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?list=${PLAYLIST}&autoplay=1&mute=1&playsinline=1&rel=0`}
          title="IT ROAD GROUP — Offre Nearshore Hybride"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
