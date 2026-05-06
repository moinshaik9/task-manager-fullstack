const API = "http://localhost:5000/api";
let token = localStorage.getItem("token");


// 🔐 REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);
}


// 🔐 VERIFY OTP
async function verify() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  const res = await fetch(`${API}/verify`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();
  alert(data.message);
}


// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);

    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("taskSection").classList.remove("hidden");

    loadTasks();
  } else {
    alert(data.message);
  }
}


// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("token");
  location.reload();
}


// 📥 LOAD TASKS
async function loadTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: token }
  });

  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="flex justify-between bg-gray-200 p-2 rounded">
        <span>${task.title}</span>
        <div>
          <button onclick="toggleTask('${task._id}')">Done</button>
          <button onclick="deleteTask('${task._id}')">Delete</button>
        </div>
      </div>
    `;

    list.appendChild(li);
  });
}


// ➕ ADD TASK
async function addTask() {
  const title = document.getElementById("taskInput").value;

  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Authorization: token
    },
    body: JSON.stringify({ title })
  });

  loadTasks();
}


// 🔄 TOGGLE TASK
async function toggleTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { Authorization: token }
  });

  loadTasks();
}


// ❌ DELETE TASK
async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  loadTasks();
}


// 🔄 AUTO LOGIN IF TOKEN EXISTS
if (token) {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("taskSection").classList.remove("hidden");
  loadTasks();
}