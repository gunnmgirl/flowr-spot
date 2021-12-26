import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./features/home/components/home";
import Navigation from "./components/navigation";
import Landing from "./features/landing/landing";
import useStore from "./store";
import Favorites from "./features/favorites/favorites";

const App = () => {
  const isAuth = useStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <Navigation />
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      ) : (
        <Landing />
      )}
    </BrowserRouter>
  );
};

export default App;
