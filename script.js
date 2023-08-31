document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const openDeletePopupBtn = document.getElementById("openDeletePopupBtn");
  
    openDeletePopupBtn.addEventListener("click", deleteCompletedTasks);
  
    function deleteCompletedTasks() {
      const completedTasks = document.querySelectorAll(".completed");
  
      completedTasks.forEach(taskItem => {
        const listItem = taskItem.parentElement;
        taskList.removeChild(listItem);
      });
    }
  
    const taskInput = document.getElementById("taskInput");
    const taskTime = document.getElementById("taskTime");
    const ampm = document.getElementById("ampm");
    const addTaskBtn = document.getElementById("addTaskBtn");
  
    addTaskBtn.addEventListener("click", addTask);
    ampm.addEventListener("change", checkInputs);
    taskTime.addEventListener("change", checkInputs);
    taskInput.addEventListener("keyup", event => {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    let selectedTime = "";
    let selectedAMPM = "";
  
    function addTask() {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "" && selectedTime !== "" && selectedAMPM !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="task-info">
            <span class="task-text">${taskText}</span>
            <span class="task-time">${selectedTime} ${selectedAMPM}</span>
          </div>
          <input type="checkbox" class="checkbox">
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        selectedTime = "";
        selectedAMPM = "";
        bindTaskEvents(li);
        sortTasksByTime();
      }
    }
  
    function bindTaskEvents(taskItem) {
      const checkbox = taskItem.querySelector(".checkbox");
      checkbox.addEventListener("change", () => {
        taskItem.querySelector(".task-text").classList.toggle("completed", checkbox.checked);
      });
    }
  
    function sortTasksByTime() {
      const tasks = Array.from(document.querySelectorAll("#taskList li"));
      tasks.sort((a, b) => {
        const timeA = a.querySelector(".task-time").textContent;
        const timeB = b.querySelector(".task-time").textContent;
        return timeA.localeCompare(timeB);
      });
  
      taskList.innerHTML = "";
      tasks.forEach(task => {
        taskList.appendChild(task);
      });
    }
  
    function checkInputs() {
      selectedAMPM = ampm.value;
      selectedTime = taskTime.value;
  
      if (selectedTime && selectedAMPM) {
        addTaskBtn.removeAttribute("disabled");
      } else {
        addTaskBtn.setAttribute("disabled", "true");
      }
    }
  
    // Rest of the code remains the same
  });
  