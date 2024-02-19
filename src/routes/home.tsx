import { useState, useEffect } from "react";
import styles from "../styles.module.css";
import InputComponent from "../components/InputComponent";
import { getTodos } from "../service/todo";
import { Dados } from "../model/model";
import TodoCard from "../components/TodoCard";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Home() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getTodos()
      .then((data) => {
        setDados(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erro ao carregar dados:", error);
      });
  }, []);

  const handleAdicionarTarefa = () => {
    if (newTask.trim() !== "") {
      const newTaskObj: Dados = {
        id: Math.random().toString(),
        title: newTask.trim(),
        isDone: false,
      };
      setDados([...dados, newTaskObj]);
      setNewTask("");
    }
  };

  const handleToggle = (id: string) => {
    setDados(
      dados.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  const handleToggleAll = () => {
    // Verifica se todos os itens já estão ativos (isDone: true)
    const todosAtivos = dados.every((todo) => todo.isDone);

    // Alterna todos os itens para o oposto do estado atual baseado na verificação anterior
    setDados(
      dados.map((todo) => ({
        ...todo,
        isDone: !todosAtivos,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setDados(dados.filter((todo) => todo.id !== id));
  };

  const handleDeleteCompleted = () => {
    setDados(dados.filter((todo) => todo.isDone === false));
  };

  const handleUpdateTitle = (id: string, newTitle: string) => {
    setDados(
      dados.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      })
    );
  };

  const activeItems = dados.filter((dado) => dado.isDone === false);

  const completedItems = dados.filter((dado) => dado.isDone === true);

  return (
    <>
      <InputComponent
        handleToggleAll={handleToggleAll}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onAdd={handleAdicionarTarefa}
      />
      {dados.length > 0 && !loading && (
        <div>
          {activeTab === "all" && (
            <>
              {dados.map((item) => (
                <TodoCard
                  key={item.id}
                  id={item.id}
                  todo={item}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onUpdateTitle={handleUpdateTitle}
                  title={item.title}
                />
              ))}
            </>
          )}
          {activeTab === "active" && (
            <>
              {activeItems.map((item) => (
                <TodoCard
                  key={item.id}
                  id={item.id}
                  todo={item}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onUpdateTitle={handleUpdateTitle}
                  title={item.title}
                />
              ))}
            </>
          )}
          {activeTab === "completed" && (
            <>
              {completedItems.map((item) => (
                <TodoCard
                  key={item.id}
                  id={item.id}
                  todo={item}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onUpdateTitle={handleUpdateTitle}
                  title={item.title}
                />
              ))}
            </>
          )}
          <Footer
            clearCompleted={handleDeleteCompleted}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tasksCount={dados.filter((item) => !item.isDone).length}
          />
        </div>
      )}
      <Outlet />
    </>
  );
}
