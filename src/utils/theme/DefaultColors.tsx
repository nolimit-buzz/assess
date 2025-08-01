import { createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";
import { Theme } from "@mui/material/styles";

export const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  // fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#032B44",
      light: "#e5f3fb",
      dark: "#0085db",
    },
    secondary: {
      main: "#06B776",
      light: "#EAF6F2",
      dark: "#D6EBE4",
    },
  
    success: {
      main: "#4bd08b",
      light: "#dffff3",
      dark: "#4bd08b",
      contrastText: "#ffffff",
    },
    info: {
      main: "#46caeb",
      light: "#e1f5fa",
      dark: "#46caeb",
      contrastText: "#ffffff",
    },
    error: {
      main: "#fb977d",
      light: "#ffede9",
      dark: "#fb977d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f8c076",
      light: "#fff6ea",
      dark: "#f8c076",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#111111",
      200: "rgba(17, 17, 17, 0.68)",
      300: "#224F3E",
      // 400: "#7C8FAC",
      // 500: "#5A6A85",
      // 600: "#111c2d",
    },
    text: {
      primary: "rgba(17, 17, 17, 0.72)",
      secondary: "rgba(205, 247, 235, 0.68)",
      
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
    background: {
      default: "#F0F5F9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: outfit.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: outfit.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: outfit.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: outfit.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: "0 9px 17.5px rgb(0,0,0,0.05) !important",
        },
        ".rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path":
          {
            clipPath: "inset(0 0 5% 0 round 20px)",
          },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "18px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "25px",
        },
        text: {
          padding: "5px 15px",
        },
      },
    },
  },
});

export { baselightTheme };
