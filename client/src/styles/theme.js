import { extendTheme } from "@chakra-ui/react";

export const newTheme = extendTheme({
  colors: {
    primary: "#19A7CE" /* blue */,
    primary2: "#66dafa",
    secondary: "#ED2B2A" /*red*/,
    secondary2: "#fa7170",
    custom: "#FF8400",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
});
