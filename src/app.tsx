import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <section className={styles.sectionContainer}>
      <Outlet />
    </section>
  );
}
