import styles from "../sass/Contact.module.sass";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { profilePicture } from "../services/getUsers";
import { Tooltip } from "@mui/material";

const Contact = () => {
  return (
    <main className={styles.main}>
      <h1>Contacto</h1>
      <div className={styles.picture}>
        <img src={profilePicture()} alt="Developer" />
      </div>
      <div className={styles.contact}>
        <h3>Alberto Gómez Juan</h3>
        <span>Desarrollador Full Stack</span>
        <h4>Phone:</h4>
        <p> +34 623-358-871</p>
        <h4>Email:</h4>
        <p>
          <a href="mailto:agomezjuan@hotmail.com">agomezjuan@hotmail.com</a>
        </p>
        <div className={styles.social}>
          <a href="https://www.linkedin.com/in/agomezjuan/" target="_blank" rel="noreferrer">
            <Tooltip title="LinkedIn">
              <LinkedInIcon fontSize="large" />
            </Tooltip>
          </a>
          <a href="https://www.github.com/agomezjuan" target="_blank" rel="noreferrer">
            <Tooltip title="GitHub" arrow>
              <GitHubIcon fontSize="large" />
            </Tooltip>
          </a>
          <a href="https://www.twitter.com/agomezjuan" target="_blank" rel="noreferrer">
            <Tooltip title="Twitter" arrow>
              <TwitterIcon fontSize="large" />
            </Tooltip>
          </a>
        </div>
      </div>
    </main>
  );
};
export default Contact;
