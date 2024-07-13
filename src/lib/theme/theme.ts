import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2C3E50", // Navy Blue
        },
        secondary: {
            main: "#3498DB", // Sky Blue
        },
        background: {
            default: "#FFFFFF", // White
            paper: "#FFFFFF", // White
        },
        text: {
            primary: "#34495E", // Dark Gray
            secondary: "#7F8C8D", // Gray
        },
        success: {
            main: "#27AE60", // Green
        },
        error: {
            main: "#E74C3C", // Red
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: "#2C3E50",
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: "#2C3E50",
        },
        body1: {
            fontSize: '1rem',
            color: "#34495E",
        },
        body2: {
            fontSize: '0.875rem',
            color: "#7F8C8D",
        },
        button: {
            fontSize: '1rem',
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    borderRadius: '2px',
                },
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: "#2C3E50",
                        color: "#FFFFFF",
                    },
                },
                {
                    props: { variant: 'contained', color: 'secondary' },
                    style: {
                        backgroundColor: "#3498DB",
                        color: "#FFFFFF",
                    },
                },
                {
                    props: { variant: 'contained', color: 'success' },
                    style: {
                        backgroundColor: "#27AE60",
                        color: "#FFFFFF",
                    },
                },
                {
                    props: { variant: 'contained', color: 'error' },
                    style: {
                        backgroundColor: "#E74C3C",
                        color: "#FFFFFF",
                    },
                },
            ],
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg"
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2C3E50",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#34495E",
                },
            },
        },
    },
});
