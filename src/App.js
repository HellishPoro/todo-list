import styles from './App.module.css'
import { useEffect } from 'react';
import { Task } from './Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { selectorLoading, selectorSearchData, selectorSortBy, selectorTask, selectorData, selectorChange } from './selectors'
import { useDebounce } from './hoock/useDebounce';

function App() {
	const task = useSelector(selectorTask)
	const isLoading = useSelector(selectorLoading)
	const isChange = useSelector(selectorChange)
	const data = useSelector(selectorData)
	const sortBy = useSelector(selectorSortBy)
	const searchData = useSelector(selectorSearchData)
	const dispatch = useDispatch()
	const debouncedValue = useDebounce(searchData, 500)



	useEffect(() => {
		dispatch({ type: 'IS_LOADING', payload: true })
		fetch(`http://localhost:3005/todo-list?q=${debouncedValue}&_sort=text&_order=${sortBy.order}`)
			.then((loaderDate) => loaderDate.json())
			.then((loaderTodo) => {
				dispatch({ type: 'TASK', payload: loaderTodo })
			})
			.finally(() => dispatch({ type: 'IS_LOADING', payload: false }))

	}, [sortBy.order, debouncedValue, isChange])


	const createTask = (payload) => {
		dispatch({ type: 'IS_LOADING', payload: true });

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
				dispatch({ type: 'TASK', payload: ((prevState) => [...prevState, data]) })
				dispatch({ type: 'DATA', payload: {} })
			});
		dispatch({ type: 'IS_LOADING', payload: false });
	};

	const handleSort = () => {
		dispatch({ type: 'SORT_BY', payload: ({ ...sortBy, order: sortBy.order === 'asc' ? 'desc' : 'asc' }) })
	}


	return (
		<>
			<div>
				<input className={styles.searchData}
					name='input'
					type='text'
					value={searchData}
					onChange={(e) => dispatch({ type: 'SEARCH_DATA', payload: (e.target.value) })}
				/>
			</div>
			<h1 className={styles.header}>Todo List</h1>
			<div className={styles.createTask}>
				<input
					name='title'
					type='text'
					placeholder='Ввести задачу'
					value={data.text || ''}
					onChange={(e) => dispatch({ type: 'DATA', payload: ({ ...data, text: e.target.value }) })}
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

export default App

