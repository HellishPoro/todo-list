import style from "./Task.module.css";
import { Link } from "react-router-dom";

export const Task = ({ id, title }) => {
	return (
		<div key={id} className={style.Task}>
			<Link to={`/${id}`} className={style.link}>{title}</Link>
		</div>
	);
};
