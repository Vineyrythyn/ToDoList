let currentTask = null;
let taskActionPlans = {};

// Function to display task details in the textarea and update the heading on the right side
function showTaskDetails(element, taskName) {
  const taskDetails = document.getElementById("taskDetails");
  const taskHeading = document.getElementById("taskHeading");

  // Update the heading to show which task is selected
  taskHeading.textContent = `${taskName} Action Plan`;
  
  taskDetails.placeholder = `Write what you plan to do for "${taskName}"...`;
  currentTask = taskName;

  // Clear textarea after selecting a task
  taskDetails.value = '';
}

// Function to save the action plan for the current task and display it below the textarea
function saveTaskDetails() {
  if (currentTask) {
    const taskDetails = document.getElementById("taskDetails").value.trim();

    if (taskDetails !== '') {
      if (!taskActionPlans[currentTask]) {
        taskActionPlans[currentTask] = [];
      }

      taskActionPlans[currentTask].push(taskDetails);
      renderTask(currentTask, taskDetails);
      document.getElementById("taskDetails").value = '';  // Clear textarea after saving

      alert(`Action plan for "${currentTask}" saved!`);
    } else {
      alert('Please enter details for the task!');
    }
  }
}

// Render saved task details in the right side
function renderTask(taskName, taskDetails) {
  const savedTasksDiv = document.getElementById("savedTasks");

  let taskDiv = document.createElement("div");
  taskDiv.className = "saved-task";
  taskDiv.innerHTML = `
    <strong>${taskName}:</strong> ${taskDetails}
    <div class="task-actions">
      <button class="editBtn" onclick="editTask(this)">✏ Edit</button>
      <button class="deleteBtn" onclick="deleteTask(this)">❌ Delete</button>
    </div>
  `;
  
  savedTasksDiv.appendChild(taskDiv);
}

// Function to edit a saved task
function editTask(button) {
  const taskDiv = button.parentElement.parentElement;
  const taskContent = taskDiv.querySelector('strong').nextSibling.textContent.trim();
  const taskName = taskDiv.querySelector('strong').textContent;

  document.getElementById("taskDetails").value = taskContent;
  document.getElementById("taskHeading").textContent = `${taskName} (Editing)`;

  taskDiv.remove();
}

// Function to delete a saved task
function deleteTask(button) {
  if (confirm('Are you sure you want to delete this task?')) {
    const taskDiv = button.parentElement.parentElement;
    taskDiv.remove();
  }
}
