import { useMap } from "react-leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export default function Geoman() {
  const map = useMap();

  const options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true,  // adds button to draw markers
    drawPolygon: false,  // adds button to draw a polygon
    drawPolyline: true,  // adds button to draw a polyline
    drawCircle: false,  // adds button to draw a cricle
    editPolygon: false,  // adds button to toggle global edit mode
    deleteLayer: true   // adds a button to delete layers
};

  map.pm.addControls(options);

  // map.pm.setLang("ru");

  // map.pm.Toolbar.createCustomControl({neme: 'gas'})

  map.pm.setGlobalOptions({
    snapDistance: 15,
    allowSelfIntersection: false,
    templineStyle: { color: "rgba(0, 255, 102, 0.5)" },
    hintlineStyle: { color: "rgba(0, 255, 102, 0.5)", dashArray: [5, 5] },
    pathOptions: { color: "rgba(0, 255, 102, 0.5)" }
  });

  return null;
}