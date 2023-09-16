import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerCluster,
} from '@react-google-maps/api';

function Map() {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 34.052235, lng: -118.243683 }), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }));
  const onLoad = useCallback(map => (mapRef.current = map), []);

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
      </GoogleMap>
    </div>
  );
}

export default Map;