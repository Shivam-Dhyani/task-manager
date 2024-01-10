export const findCurrentTaskIndex = (id, taskState) =>
  taskState?.tasksList.findIndex((task) => task.id === id);

export const setStateWithLocalStorage = (
  dispatch,
  actionType,
  loaclStoageKey,
  data
) => {
  dispatch({ type: actionType, payload: data });
  localStorage.setItem(loaclStoageKey, JSON.stringify(data));
};

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;
