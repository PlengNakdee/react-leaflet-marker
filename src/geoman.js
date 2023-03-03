import { useMap } from "react-leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export default function Geoman() {
  const map = useMap();

  map.pm.addControls();

  // map.pm.setLang("ru");

  map.pm.setGlobalOptions({
    snapDistance: 15,
    allowSelfIntersection: false,
    templineStyle: { color: "rgba(0, 255, 102, 0.5)" },
    hintlineStyle: { color: "rgba(0, 255, 102, 0.5)", dashArray: [5, 5] },
    pathOptions: { color: "rgba(0, 255, 102, 0.5)" }
  });

  return null;
}