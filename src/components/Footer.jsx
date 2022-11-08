import { Link } from "react-router-dom";
import styles from "../sass/Footer.module.sass";
import CodeIcon from "@mui/icons-material/Code";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2022 · Mi Panel</p>
      <p className={styles.credits}>
        <span>
          <CodeIcon color="primary" />
        </span>
        Desarrollado por <Link to={"/contacto"}>Alberto Gómez Juan</Link>
        <span>
          <CodeIcon color="primary" />
        </span>
      </p>
    </footer>
  );
};
export default Footer;
