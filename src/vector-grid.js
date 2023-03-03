import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";

import L from "leaflet";

import "leaflet.vectorgrid";

import { vectorTileStyling } from "./vector-tile-style";

export default function VectorGrid(props) {
  const { layerContainer, map } = useLeafletContext();

  var mapboxUrl =
    "https://{s}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={token}";

  let options = {
    rendererFactory: L.canvas.tile,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a>',
    vectorTileLayerStyles: vectorTileStyling,
    token:
      "pk.eyJ1IjoiaXZhbnNhbmNoZXoiLCJhIjoiY2l6ZTJmd3FnMDA0dzMzbzFtaW10cXh2MSJ9.VsWCS9-EAX4_4W1K-nXnsA"
  };

  const vectorGrid = L.vectorGrid.protobuf(mapboxUrl, options);

  const container = layerContainer || map;

  useEffect(() => {
    container.addLayer(vectorGrid);
    return () => {
      container.removeLayer(vectorGrid);
    };
  }, []);

  return null;
}
