export const initialLoadingState = false

export const isLoadingReducer = (state = initialLoadingState, { type, payload }) => {
	switch (type) {
		case 'IS_LOADING':
			return {
				...state,
				isLoading: payload
			}

		default:
			return state;
	}
}
