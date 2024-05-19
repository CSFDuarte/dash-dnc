import Footer from "@/components/footer";
import Header from "@/components/header";
import { DialogProvider } from "@/contexts/dialogContext";
import { PeopleProvider } from "@/contexts/people";
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
    <PeopleProvider>
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </DialogProvider>
      </ThemeProvider>
    </PeopleProvider>
  );
}
