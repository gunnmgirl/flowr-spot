import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { ReactComponent as MenuIcon } from "../icons/menu.svg";

const style = { width: "100%", height: "100%" };

const NavigationMobile = (props) => {
  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<MenuIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { ...style, color: "purple" } : style
              }
            >
              Flowers
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/sightings"
              style={({ isActive }) =>
                isActive ? { ...style, color: "purple" } : style
              }
              data-cy="sightings-button"
            >
              Latest Sightings
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/favorites"
              style={({ isActive }) =>
                isActive ? { ...style, color: "purple" } : style
              }
            >
              Favorites
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavigationMobile;
