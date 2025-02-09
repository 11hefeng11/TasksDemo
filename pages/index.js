import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAdd = async (text) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(text),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = async (task) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>任务管理系统</h1>
      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleAdd}
        initialTask={editingTask}
      />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
}
