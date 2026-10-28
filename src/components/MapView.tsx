"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Project } from "@/lib/data";
import { BASE_PATH } from "@/lib/base";

type Pin = { project: Project; note?: string };

export function MapView({ pins, height = 480 }: { pins: Pin[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !el) return;
      map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자',
        maxZoom: 19,
        className: "map-tiles",
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:inline-flex;align-items:center;justify-content:center;height:22px;min-width:58px;padding:0 12px;background:#1849d6;color:#fff;font:500 11px/1 var(--font-plex-mono),ui-monospace,monospace;letter-spacing:.04em;clip-path:polygon(14% 0,86% 0,100% 50%,86% 100%,14% 100%,0 50%);box-shadow:0 1px 4px rgba(0,0,0,.3)">SB</span>`,
        iconSize: [58, 22],
        iconAnchor: [29, 11],
      });

      const bounds: [number, number][] = [];
      for (const { project: p, note } of pins) {
        const { lat, lng } = p.location;
        bounds.push([lat, lng]);
        const href = `${BASE_PATH}/projects/${p.slug}/`;
        L.marker([lat, lng], { icon })
          .addTo(map!)
          .bindPopup(
            `<div style="font-family:inherit;min-width:200px">
              <div style="font-size:12px;color:#6b7078">${p.useType} · ${p.location.label}</div>
              <div style="font-size:15px;font-weight:600;margin:4px 0 2px">${p.title}</div>
              ${note ? `<div style="font-size:12.5px;color:#4a5058">${note}</div>` : ""}
              <a href="${href}" style="display:inline-block;margin-top:8px;font-size:13px;color:#1849d6;font-weight:500">스펙북 열기</a>
            </div>`,
          );
      }
      if (bounds.length > 1) map.fitBounds(bounds, { padding: [40, 40] });
      else if (bounds.length === 1) map.setView(bounds[0], 11);
      else map.setView([36.5, 127.8], 6);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [pins]);

  return <div ref={ref} style={{ height }} className="w-full overflow-hidden rounded-lg border border-line" />;
}
