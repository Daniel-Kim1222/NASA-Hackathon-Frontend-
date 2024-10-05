// src/theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/press-start-2p";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#0a8c90", //Teal
      200: "#1e2e52", //Navy
      300: "#1c1f36", //Purple
      400: "#fce5d8", //Light Peach
      500: "#ffea2e", //Bright Yellow
      600: "#d1997c", //Light Brown
      700: "#d3441b", //Red-Orange
      800: "#d49c7f", //Pale Tan
      900: "white",
    },
  },
  fonts: {
    heading: "'Press Start 2P', sans-serif",
    body: "'Press Start 2P', sans-serif",
  },
});

export default theme;
