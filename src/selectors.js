export const selectorTask = (state) => state.taskState.task;
export const selectorData = (state) => state.dataState.data;
export const selectorChange = (state) => state.isChangeState;
export const selectorLoading = (state) => state.taskState.isLoading;
export const selectorSearchData = (state) => state.searchState;
export const selectorSortBy = (state) => state.dataState;
