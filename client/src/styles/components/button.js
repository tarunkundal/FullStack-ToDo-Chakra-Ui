import { DarkMode, LightMode, defineStyleConfig } from "@chakra-ui/react";
import { whiten, mode, darken } from "@chakra-ui/theme-tools";

export const ButtonStyles = defineStyleConfig({
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: "white",
      _hover: {
        bg: mode(darken("primary", 20), whiten("primary", 10))(props),
        boxShadow: "md",
      },
    }),
    secondary: (props) => ({
      bg: "secondary",
      color: "white",
      _hover: {
        bg: mode(darken("secondary", 20), whiten("secondary", 10))(props),
        boxShadow: "md",
      },
    }),
    custom: (props) => ({
      bg: "custom",
      color: "white",
      _hover: {
        bg: mode(darken("custom", 10), whiten("custom", 10))(props),
        boxShadow: "md",
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {},
});
