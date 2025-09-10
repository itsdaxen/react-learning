import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <span className={styles.copyright}>
        &copy; {new Date().getFullYear()} WorldWise Inc. All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
