import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialTask }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (initialTask) setText(initialTask.text);
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(initialTask ? { ...initialTask, text } : { text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入任务内容"
      />
      <button type="submit">{initialTask ? "更新任务" : "添加任务"}</button>
    </form>
  );
}
