import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTowerAlarmContext } from "../components/Layout";

const Map = () => {
  const towerLocation = {
    Tower1: [37, -122],
    Tower2: [34, 118],
    Tower3: [40, -74],
    Tower4: [41, 87],
    Tower5: [9, -9],
    Tower6: [12, 20],
    Tower7: [19, 80],
    Tower8: [33, -1],
    Tower9: [37, 17],
    Tower10: [47, 122],
  };
  const { towerAlarm } = useTowerAlarmContext();
  const fillRedOptions = { color: "red", fillColor: "red" };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {Object.entries(towerLocation).map(([towerId, [latitude, longitude]]) =>
        towerAlarm[towerId] ? (
          <div key={towerId}>
            <Circle
              center={[latitude, longitude]}
              radius={100}
              pathOptions={fillRedOptions}
            />
          </div>
        ) : (
          <div key={towerId}>
            <Marker position={[latitude, longitude]}>
              <Popup>
                <h3>{towerId}</h3>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
              </Popup>
            </Marker>
          </div>
        )
      )}
    </MapContainer>
  );
};

export default Map;
