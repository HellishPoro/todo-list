import style from './Task.module.css'
import { useState } from 'react'

export const Task = ({ id, text, changeTask, deleteTask }) => {
	const [textUpdate, setTextUpdate] = useState(text)
	const [isEdit, setIsEdit] = useState(false)
	const handleEdit = () => setIsEdit(!isEdit)

	const handleUpdateTask = () => {
		changeTask(id, textUpdate).then(() => {
			setIsEdit(false)
		})
	}
	return (
		<div key={id} className={style.Task} >
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
					<button type='submit' onClick={handleUpdateTask}>Update</button>
					<button onClick={handleEdit}>Cancel</button>
				</>
			) : (
				<button onClick={handleEdit}>Edit</button>
			)}
			<button onClick={() => deleteTask(id)}>Delete</button>
		</div>
	)
}
