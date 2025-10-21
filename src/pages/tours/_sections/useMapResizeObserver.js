import { useEffect, useRef, useState } from "react";

const useMapResizeObserver = (mapAreaRef, viewMode) => {
  // --- NEW: map readiness handling ---
  const [mapReady, setMapReady] = useState(true);
  const stableTimerRef = useRef(null);
  const lastSizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    // Reset readiness whenever viewMode toggles
    setMapReady(false);
    if (stableTimerRef.current) {
      clearTimeout(stableTimerRef.current);
      stableTimerRef.current = null;
    }

    if (viewMode !== "map") return;

    const el = mapAreaRef.current;
    if (!el) {
      // fallback: allow map to render after small delay
      const t = setTimeout(() => setMapReady(true), 300);
      stableTimerRef.current = t;
      return () => clearTimeout(t);
    }

    // transitionend listener - fires when CSS animation completes
    const onTransitionEnd = (ev) => {
      // only respond to transform/opacity transitions
      if (!["transform", "opacity", "visibility"].includes(ev.propertyName))
        return;
      setMapReady(true);
    };
    el.addEventListener("transitionend", onTransitionEnd);

    // ResizeObserver to detect stable dimensions
    let ro = null;
    try {
      ro = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        // const prev = lastSizeRef.current;
        lastSizeRef.current = { w: width, h: height };

        // Consider stable when size hasn't changed for 120ms
        if (stableTimerRef.current) {
          clearTimeout(stableTimerRef.current);
        }
        stableTimerRef.current = setTimeout(() => {
          // only mark ready if we have a non-zero size (map needs positive container)
          if (width > 0 && height > 0) {
            setMapReady(true);
          }
        }, 120);
      });
      ro.observe(el);
    } catch (err) {
      // ResizeObserver not available -> fallback to transitionend or timeout
    }

    // Fallback: if nothing fires, ensure we set mapReady after a max delay
    const fallback = setTimeout(() => setMapReady(true), 1000);

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
      if (ro) ro.disconnect();
      if (stableTimerRef.current) {
        clearTimeout(stableTimerRef.current);
        stableTimerRef.current = null;
      }
      clearTimeout(fallback);
    };
  }, [viewMode, mapAreaRef]);

  return { mapReady };
};

export default useMapResizeObserver;
