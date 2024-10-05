// src/theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/press-start-2p";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#0a8c90",
      200: "#1e2e52",
      300: "#1c1f36",
      400: "#fce5d8",
      500: "#ffea2e",
      600: "#d1997c",
      700: "#d3441b",
      800: "#d49c7f",
      900: "white",
    },
  },
  fonts: {
    heading: "'Press Start 2P', sans-serif",
    body: "'Press Start 2P', sans-serif",
  },
});

export default theme;
