export const initialChangeState = false

export const isChangeReducer = (state = initialChangeState, { type, payload }) => {
	switch (type) {
		case 'CHANGE':
			return {
				...state,
				task: payload
			}

		default:
			return state;
	}
}
