import styles from "../../styles.module.css";
import { Dados } from "../../model/model";
import { useState } from "react";

interface TodoCardProps {
  todo: Dados;
  id: string;
  title: string;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdateTitle: (id: string, newTitle: string) => void; // Função para atualizar o título
}

export default function TodoCard({
  todo,
  onDelete,
  onToggle,
  onUpdateTitle,
}: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() !== todo.title && editedTitle.trim() !== "") {
      onUpdateTitle(todo.id, editedTitle.trim());
    } else {
      setEditedTitle(todo.title);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  return (
    <main className={styles.main}>
      <ul className={styles.todoList}>
        <li className={todo.isDone ? styles.completed : ""}>
          <div className={styles.todoItem}>
            <input
              className={styles.toggle}
              type="checkbox"
              id={todo.id}
              onChange={() => handleToggle()}
              checked={todo.isDone}
            />
            {isEditing ? (
              <input
                className={styles.input}
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleKeyPress}
                autoFocus
              />
            ) : (
              <label className={styles.label} onDoubleClick={handleDoubleClick}>
                {todo.title}
              </label>
            )}
            <button className={styles.destroy} onClick={handleDelete}></button>
          </div>
        </li>
      </ul>
    </main>
  );
}
