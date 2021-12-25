import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./features/home/components/home";
import Navigation from "./components/navigation";

const App = () => {
  const isLoggedIn = false;
  return (
    <BrowserRouter>
      <Navigation />
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Home />
      )}
    </BrowserRouter>
  );
};

export default App;
