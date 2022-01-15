import React from "react";
import { Center } from "@chakra-ui/react";
import ReactMapGL, { MapContext } from "react-map-gl";

import { ReactComponent as MapPin } from "../../../icons/map-pin.svg";

const isValidLatitude = (latitude) => {
  if (latitude > -90 && latitude < 90) {
    return latitude;
  }
  return 43.8563;
};

const isValidLongitude = (longitude) => {
  if (longitude > -180 && longitude < 180) {
    return longitude;
  }
  return 18.4131;
};

const SightingMap = (props) => {
  const { latitude, longitude, flower_name = "" } = props;
  const currentLatitude = isValidLatitude(latitude);
  const currentLongitude = isValidLongitude(longitude);
  const [viewport, setViewport] = React.useState({
    longitude: currentLongitude,
    latitude: currentLatitude,
    zoom: 15,
  });

  const CustomMarker = (props) => {
    const context = React.useContext(MapContext);
    const { longitude, latitude } = props;
    const [x, y] = context.viewport.project([longitude, latitude]);

    return (
      <Center
        position="absolute"
        left={x}
        top={y}
        fill="red.500"
        stroke="black"
      >
        {flower_name || ""}
        <MapPin height="20px" width="20px" />
      </Center>
    );
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height={500}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <CustomMarker longitude={currentLongitude} latitude={currentLatitude} />
    </ReactMapGL>
  );
};

export default SightingMap;
