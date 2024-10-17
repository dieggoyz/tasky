document.addEventListener('DOMContentLoaded', loadTasks)

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || []
	tasks.forEach(addTaskToDOM)
}

function addTask() {
	const taskInput = document.getElementById('taskInput')
	const taskText = taskInput.value.trim()

	if (!taskText) return

	const task = { text: taskText, completed: false }
	addTaskToDOM(task)
	saveTaskToLocalStorage(task)
	taskInput.value = ''
}

function addTaskToDOM(task) {
	const taskList = document.getElementById('taskList')
	const li = document.createElement('li')
	const taskText = document.createElement('span')

	taskText.innerText = task.text
	li.classList.toggle('completed', task.completed)

	const completeBtn = createButton(task.completed ? 'Uncheck' : 'Check', () => {
		task.completed = !task.completed
		li.classList.toggle('completed')
		completeBtn.innerText = task.completed ? 'Uncheck' : 'Check'
		updateLocalStorage()
	})

	const editBtn = createButton('Edit', () => {
		const newText = prompt('Edit task:', task.text)
		if (newText) {
			task.text = newText
			taskText.innerText = task.text
			li.classList.toggle('completed', task.completed)
			completeBtn.innerText = task.completed ? 'Uncheck' : 'Check'
			updateLocalStorage()
		}
	})

	const deleteBtn = createButton('Delete', () => {
		taskList.removeChild(li)
		updateLocalStorage()
	})

	li.append(taskText, completeBtn, editBtn, deleteBtn)
	taskList.appendChild(li)
}

function createButton(text, onClick) {
	const button = document.createElement('button')
	button.innerText = text
	button.onclick = onClick
	return button
}

function saveTaskToLocalStorage(task) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || []
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateLocalStorage() {
	const tasks = Array.from(document.getElementById('taskList').children).map((li) => {
		return {
			text: li.querySelector('span').innerText,
			completed: li.classList.contains('completed'),
		}
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
