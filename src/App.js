import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Home from "./features/home/components/home";
import Navigation from "./components/navigation";
import Landing from "./features/landing/landing";
import useStore from "./store";
import Favorites from "./features/favorites/favorites";
import FlowerDetail from "./features/sightings/components/flower-detail";
import SightingDetail from "./features/sightings/components/sighting-detail";
import SightingMap from "./features/sightings/components/sighting-map";
import Sightings from "./features/sightings/components/sightings";
import CreateSightingForm from "./features/sightings/components/create-sighting-form";

const App = () => {
  const isAuth = useStore((state) => state.isAuth);

  return (
    <Flex height="100vh" direction="column">
      <BrowserRouter>
        <Navigation />
        {isAuth ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<FlowerDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/sightings" element={<Sightings />} />
            <Route path="/sightings/:id" element={<SightingDetail />} />
            <Route path="/sightings/:id/new" element={<CreateSightingForm />} />
            <Route path="/sightings/:id/map" element={<SightingMap />} />
          </Routes>
        ) : (
          <Landing />
        )}
      </BrowserRouter>
    </Flex>
  );
};

export default App;
