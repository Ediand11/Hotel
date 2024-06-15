"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5035a0",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

const ProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ProviderComponent;
