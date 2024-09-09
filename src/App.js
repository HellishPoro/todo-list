import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Task } from './Task/Task'
import { useDebounce } from './hoock/useDebounce';

function App() {
	const [task, setTask] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isChange, setIsChange] = useState(false)
	const [data, setData] = useState({})
	const change = () => setIsChange(!isChange)
	const [sortBy, setSortBy] = useState({ order: 'ack' })
	const [searchData, setSearchData] = useState('')
	const debouncedValue = useDebounce(searchData, 500)

	useEffect(() => {
		setIsLoading(true)
		fetch(`http://localhost:3005/todo-list?q=${debouncedValue}&_sort=text&_order=${sortBy.order}`)
			.then((loaderDate) => loaderDate.json())
			.then((loaderTodo) => {
				setTask(loaderTodo)
			})
			.finally(() => setIsLoading(false))
	}, [sortBy.order, debouncedValue, isChange])


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
			.then((data) => {
				setTask((prevState) => [...prevState, data])
				setData({})
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
	const handleSort = () => {
		setSortBy({ ...sortBy, order: sortBy.order === 'asc' ? 'desc' : 'asc' })
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
				<input className={styles.searchData}
					type='text'
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
				/>
			</div>
			<button type='submit' onClick={handleSort}>{sortBy.order === "asc" ? "Список по возрастанию" : "Список по убыванию"}</button>
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


