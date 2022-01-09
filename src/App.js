import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./features/home/components/home";
import Navigation from "./components/navigation";
import Landing from "./features/landing/landing";
import useStore from "./store";
import Favorites from "./features/favorites/favorites";
import FlowerDetail from "./features/sightings/components/flower-detail";
import SightingDetail from "./features/sightings/components/sighting-detail";

const App = () => {
  const isAuth = useStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <Navigation />
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<FlowerDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sightings/:id" element={<SightingDetail />} />
        </Routes>
      ) : (
        <Landing />
      )}
    </BrowserRouter>
  );
};

export default App;
