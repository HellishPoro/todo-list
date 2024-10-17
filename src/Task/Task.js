import style from "./Task.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectorTask } from "../selectors";

export const Task = ({ id, text, completed }) => {
	const [textUpdate, setTextUpdate] = useState(text);
	const [isEdit, setIsEdit] = useState(false);
	const handleEdit = () => setIsEdit(!isEdit);

	const dispatch = useDispatch()

	const task = useSelector(selectorTask)

	const changeTask = async (id, payload) => {
		dispatch({ type: 'IS_LOADING', payload: true });
		const response = await fetch(`http://localhost:3005/todo-list/${payload.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				text: payload,
			}),
		});
		if (response.ok) {
			const changeTask = await response.json();
			const copyTask = task.slice();
			const indexTask = task.findIndex((task) => task.id === id);
			if (indexTask) {
				copyTask[indexTask] = changeTask;
				dispatch({ type: 'TASK', payload: copyTask })
			}
			dispatch({ type: 'IS_LOADING', payload: false });
			dispatch({ type: 'CHANGE', payload: true })
		}
	};

	const deleteTask = async (id) => {
		dispatch({ type: 'IS_LOADING', payload: true });

		const response = await fetch(`http://localhost:3005/todo-list/${id}`, {
			method: 'DELETE'
		})
		if (response.ok) {
			dispatch({ type: 'TASK', payload: (task.filter((task) => task.id !== id)) })
			dispatch({ type: 'CHANGE', payload: true })
		}
		dispatch({ type: 'IS_LOADING', payload: false });

	}

	const handleUpdateTask = () => {
		changeTask(id, textUpdate).then(() => {
			setIsEdit(false);
		});
	};
	return (
		<div key={id} className={style.Task}>
			{isEdit ? (
				<input
					value={textUpdate}
					onChange={(e) => setTextUpdate(e.target.value)}
				/>
			) : (
				<span>{text}</span>
			)}
			{isEdit ? (
				<>
					<button type="submit" onClick={handleUpdateTask}>
						Изменить
					</button>
					<button onClick={handleEdit}>Вернуться</button>
				</>
			) : (
				<button onClick={handleEdit}>Редактировать</button>
			)}
			<input className={style.input} name="chechbox" type='checkbox' defaultChecked={completed} />
			<button onClick={() => deleteTask(id)}>Удалить</button>
		</div>
	);
};
