import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { Task } from "./Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { selectorLoading, selectorSortBy, selectorTask } from "./selectors";
import { useDebounce } from "./hoock/useDebounce";
import { createTodo, getTodos } from "./redusers";

function App() {
	const [value, setvalue] = useState("");
	const dispatch = useDispatch();
	const task = useSelector(selectorTask);
	const isLoading = useSelector(selectorLoading);
	const sortBy = useSelector(selectorSortBy);
	const [data, setData] = useState("")
	const debouncedValue = useDebounce(value, 2000);

	useEffect(() => {
		dispatch(getTodos({ order: sortBy.order, q: debouncedValue }));
	}, [dispatch, sortBy.order, debouncedValue]);

	const todoCreate = (completed, text) => {
		dispatch(createTodo(completed, text))
	}

	const handleSort = () => {
		dispatch({
			type: "SORT_BY",
			payload: sortBy.order === "asc" ? "desc" : "asc",
		});
	};

	return (
		<>
			<div>
				<input
					className={styles.searchData}
					name="input"
					type="text"
					value={value}
					onChange={(e) => setvalue(e.target.value)}
				/>
			</div>
			<h1 className={styles.header}>Todo List</h1>
			<div className={styles.createTask}>
				<input
					name="title"
					type="text"
					placeholder="Ввести задачу"
					value={data || ''}
					onChange={(e) => setData(e.target.value)}
				/>
				<button className={styles.button} onClick={() => todoCreate({ completed: false, text: data })}>Добавить задачу</button>
			</div>
			<button type="submit" onClick={handleSort}>
				{sortBy.order === "asc"
					? "Список по возрастанию"
					: "Список по убыванию"}
			</button>
			<div className={styles.add}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					task.map((task) => <Task key={task.id} {...task} />)
				)}
			</div>
		</>
	);
}

export default App;
