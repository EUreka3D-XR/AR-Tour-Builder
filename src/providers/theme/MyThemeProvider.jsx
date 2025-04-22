import { useMemo } from "react";
import PropTypes from "prop-types";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function MyThemeProvider({ children }) {
  const theme = useMemo(() => {
    return createTheme({
      custom: {
        headerHeight: "3.5rem",
      },
      typography: {
        fontFamily: "Poppins, Noto Sans, serif",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
        MuiTextField: {
          defaultProps: {
            fullWidth: true,
            size: "small",
          },
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;

MyThemeProvider.propTypes = {
  children: PropTypes.node,
};
