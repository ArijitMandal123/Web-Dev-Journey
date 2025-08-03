const addbtn = document.querySelector(".add-btn");
const todolists = document.querySelector(".todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
renderTask();
// addbtn.addEventListener("click", addTask);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  input.value = "";
  console.log(task);
  saveTask();
  renderTask();
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function toggleTask(checkbox) {
  const todoItem = checkbox.parentElement;
  const taskId = parseInt(todoItem.dataset.id);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTask();
    saveTask();
  }
}

function renderTask() {
  todoList.innerHTML = tasks
    .map(
      (task) => `
                <li class="todo-item ${
                  task.completed ? "completed" : ""
                }" data-id="${task.id}">
                    <div class="checkbox ${
                      task.completed ? "checked" : ""
                    }" onclick="toggleTask(this)"></div>
                    <span class="todo-text">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(this)">×</button>
                </li>
            `
    )
    .join("");
}
function deleteTask(deleteBtn) {
  const todoItem = deleteBtn.parentElement;
  const taskId = parseInt(todoItem.dataset.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  renderTask();
  saveTask();
}
