import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

const VIDEO_ID = "4fhHxF0XjTc";

interface YTPlayer {
  setVolume(volume: number): void;
  setOption(module: string, option: string, value: unknown): void;
  unloadModule(module: string): void;
  isMuted(): boolean;
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
            onApiChange?: (event: { target: YTPlayer }) => void;
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
  const [muted, setMuted] = useState(true);
  const containerId = "yt-player";

  const tryUnmute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return false;
    try {
      player.setVolume(25);
      player.unMute();
      player.playVideo();
      const stillMuted = player.isMuted?.() ?? false;
      setMuted(stillMuted);
      return !stillMuted;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let gestureCleanup: (() => void) | undefined;

    const attachGestureUnmute = () => {
      const handler = () => {
        if (tryUnmute()) detach();
      };
      const events: (keyof DocumentEventMap)[] = [
        "pointerdown",
        "touchstart",
        "keydown",
        "scroll",
        "mousemove",
      ];
      const detach = () => events.forEach((e) => document.removeEventListener(e, handler));
      events.forEach((e) => document.addEventListener(e, handler, { passive: true }));
      gestureCleanup = detach;
    };

    const loadPlayer = () => {
      if (!window.YT) return;

      const disableCaptions = (player: YTPlayer) => {
        try {
          player.setOption("captions", "track", {});
          player.unloadModule("captions");
        } catch {
          // The captions module may not have loaded yet.
        }
      };

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
            disableCaptions(player);
            setTimeout(() => disableCaptions(player), 1_000);
            player.setVolume(25);
            player.playVideo();
            // Attempt to enable sound right away; browsers may refuse without a gesture.
            setTimeout(() => {
              if (!tryUnmute()) attachGestureUnmute();
            }, 600);
          },
          onApiChange: (event) => disableCaptions(event.target),
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
      gestureCleanup?.();
      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore cleanup errors.
      }
      playerRef.current = null;
    };
  }, [tryUnmute]);

  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-video bg-navy-deep">
        <div id={containerId} className="absolute inset-0 h-full w-full" />
        {muted && (
          <button
            type="button"
            onClick={tryUnmute}
            className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-lg transition hover:opacity-90"
          >
            <Volume2 className="h-4 w-4" />
            Activer le son
          </button>
        )}
      </div>
    </div>
  );
}

