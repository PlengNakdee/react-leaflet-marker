import { useCallback, useEffect, useMemo, useState } from 'react';
import { Circle, FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import './App.css';

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

const DrawTool = () => {
  // const _onDrawStart = (e: any) => {
	// 	console.log("_onDrawStart", e);
	// };

  const _onCreated = (e: { layerType: any; layer: any; }) => {
		let type = e.layerType;
		let layer = e.layer;
    if(type == 'polyline') {
      var coords = layer.getLatLngs();
      var length = 0;
      for (let i = 0; i < coords.length - 1; i++) {
        length += coords[i].distanceTo(coords[i + 1]);
      }
      console.log('line length in meter', length.toFixed(2));
    }
		if (type === "marker") {
			// Do marker specific actions
			console.log("_onCreated: marker created", e);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}

		console.log("Geojson", layer.toGeoJSON());
		console.log("coords", layer.getLatLngs());
		// Do whatever else you need to. (save to db; etc)

		// this._onChange();
  }

  return (
    <FeatureGroup>
    <EditControl
      position='topleft'
      // onDrawStart={_onDrawStart}
      onCreated={_onCreated}
      //onEdited={this._onEditPath}
      //onDeleted={this._onDeleted}
      draw={{
        rectangle: false
      }}
    />
    {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
  </FeatureGroup>
  )
}





function App() {
  const [map, setMap] = useState()
  const displayMap = useMemo(
    () => (
      <div>
        <p>Hello</p>
        <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DrawTool/>
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

export default App;
