import { Button } from "@mui/material";
import error from "../assets/images/404.png";
import styles from "../sass/NotFound.module.sass";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.banner}>
          <img src={error} alt="" className={styles.banner_image} />
        </div>
        <h2>La página que buscabas no existe</h2>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#55ffde",
            color: "#2e2b6d",
            "&:hover": { backgroundColor: "#00c9a7" }
          }}
          href="/">
          Volver al inicio
        </Button>
      </main>
    </div>
  );
};
export default NotFound;
