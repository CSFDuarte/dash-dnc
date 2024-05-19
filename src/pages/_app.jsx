import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0a3c7d"
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
