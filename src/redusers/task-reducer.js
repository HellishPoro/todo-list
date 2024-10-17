export const initialTaskState = []

export const taskReducer = (state = initialTaskState, { type, payload }) => {
	switch (type) {
		case 'TASK':
			return {
				...state,
				task: payload
			}
		default:
			return state;
	}
}

