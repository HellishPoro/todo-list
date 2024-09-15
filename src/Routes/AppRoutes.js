import { Routes, Route } from 'react-router-dom'
import App from "../App";
import TodoEditPages from '../pages/TodoEditPages/TodoEditPages';
import TodoPages from '../pages/TodoPages/TodoPages';


const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/:id" element={<TodoPages />} />
			<Route path="/:id/:edit" element={<TodoEditPages />} />
			<Route path="/*" element={<h1>Page not found</h1>} />
		</Routes>
	)
}


export default AppRoutes
