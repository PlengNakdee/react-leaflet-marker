import './App.css';
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import Geoman from "./geoman";
import { useCallback, useEffect, useMemo, useState } from 'react';

const latitude = 13.7554
const longitude = 100.4932
const center = [latitude, longitude]
const zoom = 17

function DisplayPosition({ map }: any) {
  const [position, setPosition] = useState(() => map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      map center's latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

export default function App() {
  const [map, setMap] = useState()

    const displayMap = useMemo(
    () => (
      <div>
        <p>Hello</p>
        <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        // @ts-ignore
        ref={setMap}
        >
      <LayersControl position="topleft">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {/* <LayersControl.BaseLayer checked name="MapBox VectorGrid">
          <VectorGrid />
        </LayersControl.BaseLayer> */}
        {/* <LayersControl.Overlay name="geoJSON">
          <GeoJSON data={geoJSONData} />
        </LayersControl.Overlay> */}
      </LayersControl>
      <Geoman />
      </MapContainer>
      </div>
    ),
    [],
  )

  return (
    <div>
    {map ? <DisplayPosition map={map} /> : null}
    {displayMap}
  </div>
  );
}
