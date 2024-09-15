import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from '../../App.module.css'

const TodoEditPages = () => {
	const [task, setTask] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const { id } = useParams()

	const match = useMatch({
		path: '/:id/edit',
		exact: true,
	})

	const changeTask = async (event) => {
		event.preventDefault()
		const response = await fetch(
			'http://localhost:3005/todo-list/' + match.params.id,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({
					title: task.title,
				}),
			}
		)
		if (response.ok) {
			navigate('/' + match.params.id)
		}
	}
	const handleChange = (event) => {
		const { name, value } = event.target
		setTask((prevState) => ({ ...prevState, [name]: value }))
	}

	useEffect(() => {
		setIsLoading(true)
		fetch('http://localhost:3005/todo-list/' + match.params.id)
			.then((response) => response.json())
			.then((data) => {
				setTask(data)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => setIsLoading(false))
	}, [match.params.id])




	return (
		<div>
			<h5>Task</h5>
			{isLoading ? <div className={styles.loader}></div> : <div>
				<form onSubmit={changeTask}>
					<input name='title' value={task.title} onChange={handleChange} />
					<button type='submit'>Update</button>
					<button onClick={() => navigate('/' + id)}>Go Back</button>
				</form>
			</div>}
		</div>
	)
}

export default TodoEditPages
