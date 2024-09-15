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
	const [sortBy, setSortBy] = useState({ order: 'asc' })
	const [searchData, setSearchData] = useState('')
	const debouncedValue = useDebounce(searchData, 1000)


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
		setIsLoading(true);

		fetch(`http://localhost:3005/todo-list`, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				userId: 2,
				completed: false,
				...payload,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((data) => {
				setTask((prevState) => [...prevState, data])
				setData({})
			});
		setIsLoading(false);
	};

	const handleSort = () => {
		setSortBy({ ...sortBy, order: sortBy.order === 'asc' ? 'desc' : 'asc' })
	}


	return (
		<>
			<div>
				<input className={styles.searchData}
					name='input'
					type='title'
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
				/>
			</div>
			<h1 className={styles.header}>Todo List</h1>
			<div className={styles.createTask}>
				<input
					name='title'
					type='title'
					placeholder='Ввести задачу'
					value={data.title || ''}
					onChange={(e) => setData({ ...data, title: e.target.value })}
				/>
				<button className={styles.button} onClick={() => createTask(data)}>Добавить задачу</button>
			</div>
			<button type='submit' onClick={handleSort}>{sortBy.order === "asc" ? "Список по возрастанию" : "Список по убыванию"}</button>
			<div className={styles.add}>
				{isLoading ? <div className={styles.loader}></div> : task.map((task) => (
					<Task
						key={task.id}
						{...task}
					/>
				))}
			</div>
		</>
	)
}

export default App;


