import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Task } from './Task/Task'


function App() {
	const [task, setTask] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isChange, setIsChange] = useState(false)
	const [data, setData] = useState({})
	const [isSorted, setIsSorted] = useState(false)
	const change = () => setIsChange(!isChange)

	useEffect(() => {
		setIsLoading(true)
		fetch(`http://localhost:3005/todo-list`)
			.then((loaderDate) => loaderDate.json())
			.then((loaderTodo) => {
				setTask(loaderTodo)
			})
			.finally(() => setIsLoading(false))
	}, [isChange])


	const createTask = (payload) => {
		setIsLoading(true)

		fetch(`http://localhost:3005/todo-list`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				...payload
			})
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setData({})
				change()
			})
		setIsLoading(false)
	}

	const changeTask = async (id, payload) => {
		setIsLoading(true)
		const response = await fetch('http://localhost:3005/todo-list/' + id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: payload
			})
		})
		if (response.ok) {
			const changeTask = await response.json()
			const copyTask = task.slice()
			const indexTask = task.findIndex((task) => task.id === id)
			if (indexTask) {
				copyTask[indexTask] = changeTask
				setTask(copyTask)
			}
			setIsLoading(false)
			change()
		}
	}

	const deleteTask = async (id) => {
		setIsLoading(true)
		const response = await fetch('http://localhost:3005/todo-list/' + id, {
			method: 'DELETE'
		})
		if (response.ok) {
			setTask(task.filter((task) => task.id !== id))
			change()
		}
		setIsLoading(false)
	}

	const sorting = () => {
		setIsSorted(!isSorted)
		if (isSorted === false) {
			fetch(`http://localhost:3005/todo-list?_sort=views&_order=asc`)
				.then((response) => response.json())
				.then((loaderDate) => {
					setTask(loaderDate)
					change()
				})
		} else {
			fetch(`http://localhost:3005/todo-list`)
				.then((response) => response.json())
				.then((loaderDate) => {
					setTask(loaderDate)
					change()
				})
		}

	}

	return (
		<>
			<h1 className={styles.header}>Todo List</h1>
			<div className={styles.createTask}>
				<input
					name='title'
					type='text'
					placeholder='Ввести задачу'
					value={data.text || ''}
					onChange={(e) => setData({ ...data, text: e.target.value })}
				/>
				<button className={styles.button} onClick={() => createTask(data)}>Добавить задачу</button>
			</div>
			<button type='submit' onClick={sorting}>{isSorted === false ? "Сортировка" : "другое имя"}</button>
			<div className={styles.add}>
				{isLoading ? <div className={styles.loader}></div> : task.map((task) => (
					<Task
						key={task.id}
						{...task}
						changeTask={changeTask}
						deleteTask={deleteTask}
					/>
				))}
			</div>
		</>
	)
}

export default App;


