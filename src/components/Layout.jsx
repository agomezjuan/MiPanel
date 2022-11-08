import { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import styles from "../sass/Layout.module.sass";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

const Layout = () => {
  const theme = createTheme({
    palette: {
      primary: { main: "#00c9a7" },
      secondary: { main: "#2e2b6d" },
      tertiary: { main: "#b5b4c7" }
    },
    typography: {
      fontSize: 18
    },
    overrides: {
      MuiTypography: {
        colorInherit: {
          color: "#fbfbfb"
        }
      }
    }
  });
  return (
    <div className={styles.container}>
      <Header />
      <Suspense fallback={<Spinner />}>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </Suspense>
      <Footer />
    </div>
  );
};
export default Layout;
