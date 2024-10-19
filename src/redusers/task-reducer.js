export const initialTaskState = {
	task: [],
	isLoading: false,
	error: null,
};

export const taskReducer = (state = initialTaskState, { type, payload }) => {
	switch (type) {
		case "GET_TASK__REQUEST":
			return {
				...state,
				isLoading: true,
			};
		case "GET_TASK__SUCCESS":
			return {
				...state,
				task: payload,
				isLoading: false,
			};
		case "GET_TASK__DeLETE__SUCCESS":
			return {
				...state,
				task: state.task.filter((task) => task.id !== payload),
				isLoading: false,
			};
		case "CREATE_TASK__SUCCESS":
			return {
				...state,
				task: [...state.task, payload],
				isLoading: false,
			};
		case "UPDATE_TASK__SUCCESS":
			return {
				...state,
				task: state.task.map((task) =>
					task.id === payload.id ? payload : task
				),
				isLoading: false,
			};
		case "GET_TASK__ERROR":
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const getTodos = (arg) => async (dispatch, getState) => {
	dispatch({ type: "GET_TASK__REQUEST" });
	try {
		const response = await fetch(
			`http://localhost:3005/todo-list?_sort=text&_order=${arg.order}&q=${arg.q}`
		);
		const data = await response.json();
		dispatch({ type: "GET_TASK__SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_TASK__ERROR", payload: error });
	}
};

export const deleteTodo = (id) => async (dispatch, getState) => {
	dispatch({ type: "GET_TASK__REQUEST" });
	try {
		const response = await fetch(`http://localhost:3005/todo-list/${id}`, {
			method: "DELETE",
		});

		dispatch({ type: "GET_TASK__DeLETE__SUCCESS", payload: id });
	} catch (error) {
		dispatch({ type: "GET_TASK__ERROR", payload: error });
	}
};

export const createTodo = (payload) => async (dispatch, getState) => {
	dispatch({ type: "GET_TASK__REQUEST" });
	try {
		const response = await fetch(`http://localhost:3005/todo-list`, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				...payload,
			}),
		});
		const data = await response.json();
		dispatch({ type: "CREATE_TASK__SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_TASK__ERROR", payload: error });
	}
};


export const updateTodo = (payload) => async (dispatch, getState) => {
	dispatch({ type: "GET_TASK__REQUEST" });
	try {
		const response = await fetch(`http://localhost:3005/todo-list/${payload.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				...payload,
			}),
		});
		const data = await response.json();
		dispatch({ type: "UPDATE_TASK__SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_TASK__ERROR", payload: error });
	}
};

// `http://localhost:3005/todo-list?q=${debouncedValue}&_sort=text&_order=${sortBy.order}`
// getTodo
// updateTodo
// deleteTodo
// createTodo
