import { PropTypes } from "prop-types";
import { createContext, useReducer } from "react";

export const TaskContext = createContext();

const Context = ({ children }) => {
  const initialState = {
    tasksList: [],
    taskDetails: {
      id: "",
      name: "",
      desc: "",
    },
    editTaskId: null,
  };

  const setDataInLocalStorage = (loaclStoageKey, data) =>
    localStorage.setItem(loaclStoageKey, JSON.stringify(data));

  const taskReducer = (taskState, action) => {
    const findCurrentTaskIndex = (id) =>
      taskState?.tasksList.findIndex((task) => task.id === id);

    switch (action.type) {
      case "APPEND_TASK_IN_LIST":
        return {
          ...taskState,
          tasksList: [...action.payload],
        };
      case "EDIT_TASK_DETAILS":
        return {
          ...taskState,
          taskDetails: action.payload,
        };
      case "CHANGE_EDIT_ID":
        return {
          ...taskState,
          editTaskId: action.payload,
        };

      case "ADD_TASK":
        setDataInLocalStorage("tasksList", [
          ...taskState.tasksList,
          { ...taskState?.taskDetails, id: Math.random().toString(36) },
        ]);
        setDataInLocalStorage("taskDetails", {
          id: "",
          name: "",
          desc: "",
        });
        return {
          ...taskState,
          tasksList: [
            ...taskState.tasksList,
            { ...taskState?.taskDetails, id: Math.random().toString(36) },
          ],
          taskDetails: {
            id: "",
            name: "",
            desc: "",
          },
        };
      case "EDIT_TASK": {
        const currentTaskIndex = findCurrentTaskIndex(taskState?.editTaskId);
        const updatedTasksList = [...taskState.tasksList];
        updatedTasksList[currentTaskIndex] = { ...taskState?.taskDetails };
        setDataInLocalStorage("tasksList", updatedTasksList);
        setDataInLocalStorage("editTaskId", null);
        setDataInLocalStorage("taskDetails", {
          id: "",
          name: "",
          desc: "",
        });
        return {
          ...taskState,
          tasksList: updatedTasksList,
          editTaskId: null,
          taskDetails: {
            id: "",
            name: "",
            desc: "",
          },
        };
      }
      case "DELETE_TASK": {
        const currentTaskIndex = findCurrentTaskIndex(action.payload);
        const updatedTasksList = [...taskState.tasksList];
        updatedTasksList.splice(currentTaskIndex, 1);
        setDataInLocalStorage("tasksList", updatedTasksList);
        if (taskState?.taskDetails?.name || taskState?.taskDetails?.desc) {
          setDataInLocalStorage("editTaskId", null);
          setDataInLocalStorage("taskDetails", {
            id: "",
            name: "",
            desc: "",
          });
        }
        return {
          ...taskState,
          tasksList: updatedTasksList,
          ...((taskState?.taskDetails?.name ||
            taskState?.taskDetails?.desc) && {
            editTaskId: null,
            taskDetails: { id: "", name: "", desc: "" },
          }),
        };
      }
      default:
        return taskState;
    }
  };

  const [taskState, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider
      value={{
        taskState,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
