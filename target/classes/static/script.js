let tasks = [];
let selectedDate = null;

// Initialize the flatpickr calendar
flatpickr("#taskDate", {
    enableTime: false,
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
        selectedDate = dateStr; // Store the selected date
        displayTasks(); // Update the displayed tasks
    }
});

// Add task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText && selectedDate) {
        const task = {
            id: new Date().getTime(),
            text: taskText,
            date: selectedDate,
            completed: false
        };

        tasks.push(task);  // Add task to tasks array
        taskInput.value = '';  // Clear input field
        displayTasks();  // Refresh the task list
    } else {
        alert("Please select a date and enter a task.");
    }
}

// Display tasks for the selected date
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    const tasksForDate = tasks.filter(task => task.date === selectedDate);

    if (tasksForDate.length === 0) {
        taskList.innerHTML = '<p>No tasks for this day.</p>';
    }

    tasksForDate.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="check" onclick="toggleTaskCompletion(${task.id})">Check</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    checkIfAllTasksCompleted(tasksForDate);
}

// Toggle the task completion status
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

// Check if all tasks are completed for the selected date
function checkIfAllTasksCompleted(tasksForDate) {
    const allCompleted = tasksForDate.every(task => task.completed);
    if (allCompleted) {
        document.getElementById('celebrationMessage').style.display = 'block'; // Show celebration
    } else {
        document.getElementById('celebrationMessage').style.display = 'none';
    }
}
