document.getElementById("add-task").addEventListener("click", function () {
	const taskInput = document.getElementById("new-task");
	const taskText = taskInput.value.trim();

	if (taskText !== "") {
		addTask(taskText);
		taskInput.value = "";
		taskInput.focus();
	}
});

document.getElementById("new-task").addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		const taskText = e.target.value.trim();

		if (taskText !== "") {
			addTask(taskText);
			e.target.value = "";
			e.target.focus();
		}
	}
});

function addTask(taskText) {
	const taskList = document.getElementById("task-list");
	const taskItem = document.createElement("li");

	taskItem.innerHTML = `
        <label>
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
        </label>
        <button class="delete-task">X</button>
    `;

	taskItem.querySelector(".checkbox").addEventListener("change", function () {
		taskItem.classList.toggle("completed");
		updateTaskCount();
		saveTasks();
	});

	taskItem
		.querySelector(".delete-task")
		.addEventListener("click", function () {
			taskItem.remove();
			updateTaskCount();
			saveTasks();
		});

	taskList.appendChild(taskItem);
	updateTaskCount();
	saveTasks();
}

function saveTasks() {
	const tasks = [];
	document.querySelectorAll("#task-list li").forEach(taskItem => {
		tasks.push({
			text: taskItem.querySelector("span").textContent,
			completed: taskItem.classList.contains("completed")
		});
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach(task => {
		const taskItem = document.createElement("li");
		taskItem.innerHTML = `
            <label>
                <input type="checkbox" class="checkbox" ${
					task.completed ? "checked" : ""
				}>
                <span>${task.text}</span>
            </label>
            <button class="delete-task">X</button>
        `;
		if (task.completed) {
			taskItem.classList.add("completed");
		}
		taskItem
			.querySelector(".checkbox")
			.addEventListener("change", function () {
				taskItem.classList.toggle("completed");
				updateTaskCount();
				saveTasks();
			});
		taskItem
			.querySelector(".delete-task")
			.addEventListener("click", function () {
				taskItem.remove();
				updateTaskCount();
				saveTasks();
			});
		document.getElementById("task-list").appendChild(taskItem);
	});
	updateTaskCount();
}

function updateTaskCount() {
	const taskCount = document.getElementById("task-list").children.length;
	document.getElementById("task-count").textContent = `${taskCount} Tasks`;
}

function updateDate() {
	const now = new Date();
	const day = now.toLocaleString("en-US", { weekday: "long" });
	const date = now.toLocaleString("en-US", { day: "numeric", month: "long" });

	document.getElementById("current-day").textContent = day;
	document.getElementById("current-date").textContent = date;
}

updateDate();
loadTasks();

// Particles.js configuration
particlesJS("particles-js", {
	particles: {
		number: { value: 100, density: { enable: true, value_area: 800 } },
		color: { value: "#ffffff" },
		shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
		opacity: {
			value: 0.5,
			random: false,
			anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
		},
		size: {
			value: 3,
			random: true,
			anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#ffffff",
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 6,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: { enable: false, rotateX: 600, rotateY: 1200 }
		}
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: { enable: true, mode: "repulse" },
			onclick: { enable: true, mode: "push" },
			resize: true
		},
		modes: {
			grab: { distance: 400, line_linked: { opacity: 1 } },
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 8,
				speed: 3
			},
			repulse: { distance: 200, duration: 0.4 },
			push: { particles_nb: 4 },
			remove: { particles_nb: 2 }
		}
	},
	retina_detect: true
});
