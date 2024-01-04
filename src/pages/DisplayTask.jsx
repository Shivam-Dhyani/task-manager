import { useContext } from "react";
import { TaskContext } from "../Context";
import {
  findCurrentTaskIndex,
  setStateWithLocalStorage,
} from "../utils/common";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";

const DisplayTask = () => {
  const navigate = useNavigate();

  const { taskState, dispatch } = useContext(TaskContext);

  const handleEditTask = (id) => {
    const currentTaskIndex = findCurrentTaskIndex(id, taskState);
    setStateWithLocalStorage(dispatch, "CHANGE_EDIT_ID", "editTaskId", id);
    setStateWithLocalStorage(dispatch, "EDIT_TASK_DETAILS", "taskDetails", {
      ...taskState?.tasksList?.[currentTaskIndex],
    });
    navigate("/");
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <>
      <button
        className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-xl p-3 rounded-xl"
        onClick={() => navigate("/")}
      >
        Add Task
      </button>
      <div>
        {!isEmpty(taskState?.tasksList) ? (
          <ul className="overflow-auto h-[30vh]">
            {taskState?.tasksList?.map((task) => (
              <li key={task?.id}>
                <div>
                  <span>{task?.name}</span>
                  <span>{task?.desc}</span>
                  <button
                    className="bg-[#65350F] disabled:bg-[#987b4f] border-black border-2 text-white text-md p-1 active:translate-y-[2px] disabled:translate-y-0 rounded-lg"
                    onClick={() => {
                      handleEditTask(task?.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#65350F] disabled:bg-[#987b4f] border-black border-2 text-white text-md p-1 active:translate-y-[2px] disabled:translate-y-0 rounded-lg"
                    onClick={() => {
                      handleDeleteTask(task?.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "No Task Available"
        )}
      </div>
    </>
  );
};

export default DisplayTask;
