import { PropTypes } from "prop-types";
import { createContext, useReducer, useState } from "react";

export const TaskContext = createContext();

const Context = ({ children }) => {
  const [tasksList, setTasksList] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    name: "",
    desc: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);

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
          tasksList: [
            ...taskState.tasksList,
            { id: Math.random().toString(36), ...action.payload },
          ],
        };
      case "EDIT_TASK_NAME":
        return {
          ...taskState,
          taskDetails: { ...taskState.taskDetails, name: action.payload },
        };

      case "EDIT_TASK_DESC":
        return {
          ...taskState,
          taskDetails: { ...taskState.taskDetails, desc: action.payload },
        };
      case "CHANGE_EDIT_ID":
        return {
          ...taskState,
          editTaskId: action.payload,
        };
    }
  };

  const [taskState, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider
      value={{
        tasksList,
        setTasksList,
        taskDetails,
        setTaskDetails,
        editTaskId,
        setEditTaskId,
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
