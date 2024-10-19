import style from "./Task.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../redusers";
import { selectorTask } from "../selectors";

export const Task = ({ id, text, completed }) => {
	const [textUpdate, setTextUpdate] = useState(text);
	const task = useSelector(selectorTask);
	const [isEdit, setIsEdit] = useState(false);
	const handleEdit = () => setIsEdit(!isEdit);

	const dispatch = useDispatch();

	const todoUpdate = (id, textUpdate) => {
		dispatch(updateTodo(id, textUpdate))
	}

	const todoDelete = (id) => {
		dispatch(deleteTodo(id));
		setIsEdit(false)
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
					<button type="submit" onClick={() => todoUpdate({ id, text: textUpdate })}>
						Изменить
					</button>
					<button onClick={handleEdit}>Вернуться</button>
				</>
			) : (
				<button onClick={handleEdit}>Редактировать</button>
			)
			}
			<input
				className={style.input}
				name="chechbox"
				type="checkbox"
				defaultChecked={completed}
			/>
			<button onClick={() => todoDelete(id)}>Удалить</button>
		</div >
	);
};
