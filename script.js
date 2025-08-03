let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  updateLocalStorage();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function clearAll() {
  tasks = [];
  updateLocalStorage();
  renderTasks();
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = renderTasks;
