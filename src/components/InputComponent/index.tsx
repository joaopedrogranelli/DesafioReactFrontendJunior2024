import React from "react";
import styles from "../../styles.module.css";
import { ChevronDown } from "lucide-react";

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  handleToggleAll: () => void;
}

export default function InputComponent(props: InputComponentProps) {
  return (
    <div>
      <h1>todos</h1>

      <div className={styles.inputContainer}>
        <ChevronDown
          className={styles.lucide}
          onClick={props.handleToggleAll}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="What needs to be done?"
          value={props.value}
          onChange={props.onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onAdd();
            }
          }}
        />
      </div>
    </div>
  );
}
