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

  const taskReducer = (taskState, action) => {
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
