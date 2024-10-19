export const initialDataState = {
	order: "desc",
	data: "",
};

export const dataReducer = (state = initialDataState, { type, payload }) => {
	switch (type) {
		case "SORT_BY":
			return {
				...state,
				order: payload,
			};
		case "DATA":
			return {
				data: payload
			}
		default:
			return state;
	}
};
