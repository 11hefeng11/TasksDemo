let tasks = [
  { id: 1, text: "学习React", completed: false },
  { id: 2, text: "完成项目", completed: true },
];

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(tasks);
      break;
    case "POST":
      const newTask = { id: Date.now(), text: req.body.text, completed: false };
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    case "PUT":
      const { id, text, completed } = req.body;
      tasks = tasks.map((task) =>
        task.id === id ? { ...task, text, completed } : task
      );
      res.status(200).json({ success: true });
      break;
    case "DELETE":
      tasks = tasks.filter((task) => task.id !== req.query.id);
      res.status(200).json({ success: true });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
