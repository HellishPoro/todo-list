export const initialSearchDataState = ''

export const searchDataReducer = (state = initialSearchDataState, { type, payload }) => {
	switch (type) {
		case 'SEARCH_DATA':
			return {
				...state,
				task: payload
			}
		default:
			return state;
	}
}
