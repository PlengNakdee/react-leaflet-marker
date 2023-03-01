import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <MapContainer center={[13.7554, 100.4932]} zoom={17} scrollWheelZoom={false}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;
