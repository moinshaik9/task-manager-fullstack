const API = "http://localhost:5000/api/tasks";

// Load tasks
async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.title}
      <button onclick="toggleTask('${task._id}')">✔</button>
      <button onclick="deleteTask('${task._id}')">❌</button>
    `;
    list.appendChild(li);
  });
}

// Add task
async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  loadTasks();
}

// Toggle task
async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: "PUT" });
  loadTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Run on start
loadTasks();