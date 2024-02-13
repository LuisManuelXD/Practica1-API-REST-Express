const express = require("express");
const app = express();
let tasks = [
  {
    id: 1,
    name: "tarea 1",
    description: "Esta es tarea 1",
  },
];

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/task/:id", (req, res) => {
  const taskSearch = tasks.find((task) => task.id === parseInt(req.params.id));

  if (!taskSearch)
    return res.status(404).json({
      message: "Tarea no existe",
    });

  res.json(taskSearch);
});

app.post("/task", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.send(newTask);
});

app.put("/task/:id", (req, res) => {
  const newData = req.body;
  const taskSearch = tasks.find((task) => task.id === parseInt(req.params.id));

  if (!taskSearch)
    return res.status(404).json({
      message: "Tarea no existe",
    });

  tasks = tasks.map((task) =>
    task.id === parseInt(req.params.id) ? { ...task, ...newData } : task
  );
  res.json({
    message: "Tarea actualizada",
  });
});

app.patch("/task/:id", (req, res) => {
  const newData = req.body;
  const taskSearch = tasks.find((task) => task.id === parseInt(req.params.id));

  if (!taskSearch)
    return res.status(404).json({
      message: "Tarea no existe",
    });

  tasks = tasks.map((task) =>
    task.id === parseInt(req.params.id) ? { ...task, ...newData } : task
  );
  res.json({
    message: "Tarea actualizada",
  });
});

app.delete("/task/:id", (req, res) => {
  const taskSearch = tasks.find((task) => task.id === parseInt(req.params.id));

  if (!taskSearch)
    return res.status(404).json({
      message: "Tarea no existe",
    });

  tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.listen(3000);
console.log(`server on port ${3000}`);
