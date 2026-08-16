import { useEffect, useRef } from "react";

const VIDEO_ID = "X4f6frV_pNI";

interface YTPlayer {
  setVolume(volume: number): void;
  unMute(): void;
  mute(): void;
  playVideo(): void;
  destroy(): void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function VideoEmbed() {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerId = "yt-player";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadPlayer = () => {
      if (!window.YT) return;
      playerRef.current = new window.YT.Player(containerId, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: VIDEO_ID,
          cc_load_policy: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            const player = event.target;
            player.setVolume(25);
            // Try to unmute after autoplay has started. Browsers may keep it muted until user interaction.
            setTimeout(() => {
              try {
                player.unMute();
              } catch {
                // Browser autoplay policy blocked unmuting; video continues muted.
              }
            }, 800);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      loadPlayer();
    } else {
      const existing = document.getElementById("yt-api-script");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
      window.onYouTubeIframeAPIReady = loadPlayer;
    }

    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore cleanup errors.
      }
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-video bg-navy-deep">
        <div id={containerId} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
