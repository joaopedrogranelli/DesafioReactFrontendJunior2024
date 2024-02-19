import { Link } from "react-router-dom";
import styles from "../../styles.module.css";

interface FooterProps {
  tasksCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  clearCompleted: () => void;
}

export default function Footer({
  tasksCount,
  activeTab,
  setActiveTab,
  clearCompleted,
}: FooterProps) {
  const formatTaskCount = () => {
    if (tasksCount === 1) {
      return "1 item left!";
    } else {
      return `${tasksCount} items left!`;
    }
  };

  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>{formatTaskCount()}</span>
      <ul className={styles.filters}>
        <li>
          <Link onClick={() => setActiveTab("all")} to="#/">
            All
          </Link>
        </li>
        <li>
          <Link onClick={() => setActiveTab("active")} to="#/active">
            Active
          </Link>
        </li>
        <li>
          <Link onClick={() => setActiveTab("completed")} to="#/completed">
            Completed
          </Link>
        </li>
      </ul>
      <button onClick={clearCompleted} className={styles.clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
