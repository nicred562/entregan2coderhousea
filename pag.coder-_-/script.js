
let tasks = [];


const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.getElementById("clearTasksBtn");


addTaskBtn.addEventListener("click", addTask);
clearTasksBtn.addEventListener("click", clearTasks);



function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = { id: Date.now(), text: taskText };
    tasks.push(newTask);
    renderTasks();
    saveTasks();
    taskInput.value = ""; 
  }
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id); 
  renderTasks();
  saveTasks();
}


function clearTasks() {
  tasks = [];
  renderTasks();
  saveTasks();
}


function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    renderTasks();
  }
}


loadTasks();
