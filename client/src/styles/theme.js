import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/button";

export const newTheme = extendTheme({
  colors: {
    primary: "#19A7CE",
    secondary: "#ED2B2A",
    custom: "#FF8400",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  components: { Button },
});
