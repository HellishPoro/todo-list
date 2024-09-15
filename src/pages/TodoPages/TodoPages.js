import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../App.module.css'

const TodoPages = () => {
	const { id } = useParams()
	const [task, setTask] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()

	const getTaskById = async () => {
		setIsLoading(true)
		const response = await fetch('http://localhost:3005/todo-list/' + id)

		if (!response.ok) {
			navigate('/')
		}
		const data = await response.json()
		setTask(data)
		setIsLoading(false)
	}

	const deletingATask = async () => {
		const response = await fetch('http://localhost:3005/todo-list/' + id, {
			method: 'DELETE'
		})
		if (response.ok) {
			navigate('/')
		}
	}

	useEffect(() => {
		getTaskById()
	}, [id])



	return (
		<>
			{
				isLoading ? <div className={styles.loader}></div> : <div>
					{task.title}
					<button onClick={() => navigate('/' + id + '/edit')}>Edit</button>
					<button onClick={deletingATask}>Delete</button>
					<button onClick={() => navigate('/')}>Go Back</button>
				</div>
			}
		</>
	)
}

export default TodoPages
