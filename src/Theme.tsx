import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const commonTypography = {
  fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: "2rem",
  },
  h2: {
    fontSize: "1.8rem",
  },
  h3: {
    fontSize: "1.5rem",
  },
  h4: {
    fontSize: "0.94rem",
  },
  h5: {
    fontSize: "0.9rem",
  },
  h6: {
    fontSize: "0.8rem",
  },
  body1: {
    fontSize: "0.8rem",
  },
  body2: {
    fontSize: "0.9rem",
  },
  caption: {
    fontSize: "0.7rem",
  },
};

const commonComponents = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset",
          caretColor: "inherit",
          transition: "background-color 5000s ease-in-out 0s",
        },
        "& input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset",
          caretColor: "inherit",
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        minWidth: "160px",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "0.7rem",
      },
      text: {
        color: "default",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        color: "grey",
      },
    },
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        minWidth: 35,
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      root: {
        ".MuiTablePagination-actions": {
          margin: "0 !important",
        },
        ".MuiInputBase-root": {
          margin: 1,
        },
        ".MuiToolbar-root": {
          fontSize: "0.7rem",
        },
        ".MuiTablePagination-displayedRows": {
          fontSize: "0.7rem",
        },
        ".MuiTablePagination-selectLabel": {
          fontSize: "0.75rem",
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        "& svg": {
          width: "18px",
          height: "18px",
        },
      },
    },
  },
  // MuiSelect: {
  //   styleOverrides: {
  //     select: {
  //       padding: "4px",
  //     },
  //   },
  // },
};

let lightTheme = createTheme({
  typography: {
    ...commonTypography,
    h6: {
      ...commonTypography.h6,
      color: "#333",
    },
    h3: {
      ...commonTypography.h3,
      color: "#333",
    },
  },
  components: {
    ...commonComponents,
    MuiTab: {
      styleOverrides: {
        ...commonComponents.MuiTab.styleOverrides,
        root: {
          "&.Mui-selected": {
            color: "#333",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e1e1e1",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& svg": {
            fontSize: "16px",
            color: "#666",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          //color: "#7e7e7e", !default icon light color
          color: "#6c6c6c",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#e1e1e1",
        },
      },
    },
  },

  palette: {
    mode: "light",
    background: {
      default: "#f6f7f9",
    },
  },
});

let darkTheme = createTheme({
  typography: {
    ...commonTypography,
    h6: {
      ...commonTypography.h6,
      color: "#ccc",
    },
    h3: {
      ...commonTypography.h3,
      color: "#ccc",
    },
  },
  components: {
    ...commonComponents,
    MuiTab: {
      styleOverrides: {
        ...commonComponents.MuiTab.styleOverrides,
        root: {
          "&.Mui-selected": {
            color: "white",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #292828",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
          border: "none",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& svg": {
            fontSize: "16px",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ccc", // Change this to your desired color
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#292828",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    text: {
      primary: "#ccc",
    },
  },
});
lightTheme = responsiveFontSizes(lightTheme);

darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
