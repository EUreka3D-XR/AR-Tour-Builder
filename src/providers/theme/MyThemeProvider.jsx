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
        // fontFamily: "Poppins, Noto Sans, serif",
        h1: {
          fontSize: "3.5rem",
        },
        h2: {
          fontSize: "2.75rem",
        },
        h3: {
          fontSize: "2rem",
        },
        h4: {
          fontSize: "1.5rem",
        },
        h5: {
          fontSize: "1.25rem",
        },
        h6: {
          fontSize: "1rem",
        },
        body1: {
          fontSize: "0.875rem",
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: "outlined",
            loadingPosition: "end",
          },
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: ({ theme }) => ({
              borderColor: theme.palette.grey[500], // your custom default
              transition: theme.transitions.create(
                ["border-color", "background-color"],
                { duration: theme.transitions.duration.short },
              ),
            }),
          },
        },
        MuiSelect: {
          defaultProps: {
            size: "small",
          },
        },
        MuiTextField: {
          defaultProps: {
            fullWidth: true,
            size: "small",
          },
        },
        MuiCheckbox: {
          defaultProps: {
            size: "small",
          },
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.grey[500],
            }),
          },
        },
        MuiIcon: {
          defaultProps: {
            baseClassName: "material-icons-outlined",
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              textTransform: "none",
              minHeight: "3rem",
            },
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
