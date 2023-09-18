import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerCluster,
} from '@react-google-maps/api';
import Places from './places';

const google = window.google;

function Map() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [directions, setDirections] = useState();

  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 34.052235, lng: -118.243683 }), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }));
  const onLoad = useCallback(map => (mapRef.current = map), []);

  const fetchDirections = (org, dest) => {
    if (!origin) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: org,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    )
  }

  return (
    <div className='container'>
      <div className='controls'>
        <h1>OnMyWay!</h1>
        <h2>START</h2>
        <Places setPlace={(position) => {
          setStart(position);
          mapRef.current?.panTo(position);
        }} />
        <h2>FINISH</h2>
        <Places setPlace={(position) => {
          setEnd(position);
          mapRef.current?.panTo(position);
        }} />
        <button onClick={() => {
          fetchDirections(start, end);
        }}>
          Directions
        </button>
      </div>
      <div className='map'>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#1976D2',
                strokeWeight: 5,
              }
            }}
          />}
          {start && <Marker
            position={start}
          />}
          {end && <Marker
            position={end}
          />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;