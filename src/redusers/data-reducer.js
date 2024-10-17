export const initialDataState = {}

export const dataReducer = (state = initialDataState, { type, payload }) => {
	switch (type) {
		case 'DATA':
			return {
				...state,
				task: payload
			}

		default:
			return state;
	}
}
