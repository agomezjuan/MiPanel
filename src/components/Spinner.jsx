import styles from "../sass/Spinner.module.sass";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};
export default Spinner;
