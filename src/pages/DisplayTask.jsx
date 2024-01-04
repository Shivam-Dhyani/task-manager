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
      <div className="flex flex-col lg:flex-row md:items-start">
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-lg md:text-xl mx-5 my-2 p-2 md:p-3 rounded-xl"
          onClick={() => navigate("/")}
        >
          Add Task
        </button>
      </div>
      <div>
        {!isEmpty(taskState?.tasksList) ? (
          <ul className="overflow-auto max-h-[78vh] md-2 md:p-4">
            {taskState?.tasksList?.map((task) => (
              <li key={task?.id}>
                <div className="p-1.5 md:p-3 m-2 border-black border-2 rounded-xl flex justify-between">
                  <span className="w-[10%] text-ellipsis overflow-hidden md:text-xl">
                    {task?.name}
                  </span>
                  <div className="border-l border-black min-h-max mx-2"></div>
                  <span className="w-[50%] sm:w-[60%] md:w-[85%] md:text-xl line-clamp-2">
                    {task?.desc}
                  </span>
                  <div className="sm:w-[18%] md:w-[14%] lg:w-[10%] flex justify-between">
                    <button
                      className="bg-[#65350F] disabled:bg-[#987b4f] border-black border-2 text-white md:text-lg p-[2px] md:p-1 active:translate-y-[2px] disabled:translate-y-0 rounded-lg"
                      onClick={() => {
                        handleEditTask(task?.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#65350F] disabled:bg-[#987b4f] border-black border-2 text-white md:text-lg p-[2px] md:p-1 active:translate-y-[2px] disabled:translate-y-0 rounded-lg"
                      onClick={() => {
                        handleDeleteTask(task?.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl h-[75vh] flex justify-center items-center">
            No Task Available
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayTask;
