export const initialSortByState = {
	order: 'asc'
}

export const sortByReduser = (state = initialSortByState, { type, payload }) => {
	switch (type) {
		case 'SORT_BY':
			return {
				...state,
				task: payload
			}
		default:
			return state;
	}
};
