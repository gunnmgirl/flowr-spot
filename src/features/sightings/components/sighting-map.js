import React from "react";
import { Center } from "@chakra-ui/react";
import ReactMapGL, { MapContext } from "react-map-gl";

import { ReactComponent as MapPin } from "../../../icons/map-pin.svg";

const SightingMap = (props) => {
  const {
    latitude = 43.8563,
    longitude = 18.4131,
    flower_name = "Flower",
  } = props;
  const [viewport, setViewport] = React.useState({
    latitude: latitude,
    longitude: longitude,
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
        {flower_name}
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
      <CustomMarker longitude={longitude} latitude={latitude} />
    </ReactMapGL>
  );
};

export default SightingMap;
