import { useState } from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);

  const handleToggle = async () => {
    const updatedTask = { ...task, completed: !completed };
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    setCompleted(!completed);
    onEdit(updatedTask);
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={() => onEdit(task)}>编辑</button>
      <button onClick={() => onDelete(task.id)}>删除</button>
    </li>
  );
}
