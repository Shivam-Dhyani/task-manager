import { useContext, useState } from "react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
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
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

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

  const getFilteredTasks = (isCompleted) => {
    return taskState?.tasksList.filter(
      (task) => task.isCompleted === isCompleted
    );
  };

  const filteredTasks = getFilteredTasks(showCompletedTasks);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center">
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-lg md:text-xl mx-5 my-2 p-2 md:p-3 rounded-xl"
          onClick={() => {
            navigate("/");
            dispatch({ type: "RESET_TASK_DETAILS" });
          }}
        >
          Add Task
        </button>
        <div className="w-full md:w-[80%] md:m-2 py-2 md flex justify-evenly">
          <span
            className={`text-sm sm:text-xl md:text-2xl ${
              !showCompletedTasks &&
              "underline text-base sm:text:2xl md:text-3xl"
            } cursor-pointer`}
            onClick={() => setShowCompletedTasks(false)}
          >
            Remaining Tasks
            <span className="text-xl sm:text-2xl md:text-3xl">{` (${
              getFilteredTasks(false).length
            })`}</span>
          </span>
          <div className="border-l border-black min-h-max mx-2 md:hidden"></div>
          <span
            className={`text-sm sm:text-xl md:text-2xl ${
              showCompletedTasks && "underline text-[1rem] md:text-3xl"
            } cursor-pointer`}
            onClick={() => setShowCompletedTasks(true)}
          >
            Completed Tasks
            <span className="text-xl md:text-3xl">{` (${
              getFilteredTasks(true).length
            })`}</span>
          </span>
        </div>
      </div>
      <div>
        {!isEmpty(filteredTasks) ? (
          <ul className="overflow-auto max-h-[78vh] md-2 md:p-4">
            {filteredTasks.map((task) => {
              const checkPriorityLevel = (level) => task?.priority === level;
              const isHighPriority = checkPriorityLevel("high");
              const isMediumPriority = checkPriorityLevel("medium");
              const isLowPriority = checkPriorityLevel("low");
              const priorityColorClass = isHighPriority
                ? "text-red-500"
                : isMediumPriority
                ? "text-yellow-500"
                : isLowPriority
                ? "text-green-500"
                : "text-gray-500";

              return (
                <li key={task?.id} className="mb-3">
                  <div className="relative p-1.5 md:p-3 m-2 border-black border-2 rounded-xl flex items-center">
                    <span
                      className={`bg-[bisque] ${priorityColorClass} sm:text-lg text-sm absolute -top-3.5 left-4 md:left-12 font-medium px-2 rounded`}
                    >
                      {isHighPriority
                        ? "High"
                        : isMediumPriority
                        ? "Medium"
                        : isLowPriority
                        ? "Low"
                        : "No Priority"}
                    </span>
                    <span
                      className={`bg-[bisque] text-black sm:text-lg text-sm absolute -top-3.5 right-4 md:right-12 font-medium px-2 rounded`}
                    >
                      {task?.duration ?? "No Time Limit"}
                    </span>
                    <input
                      type="checkbox"
                      checked={task?.isCompleted}
                      className="accent-[#65350F] h-6 mr-2 size-5 md:size-8"
                      onChange={() =>
                        dispatch({
                          type: "UPDATE_TASK_STATUS",
                          payload: task?.id,
                        })
                      }
                    />
                    <span className="w-[15%] line-clamp-2 md:text-xl">
                      {task?.name}
                    </span>
                    <div className="border-l border-black min-h-max mx-2 h-12"></div>
                    <span className="w-[60%] sm:w-[60%] md:w-[85%] md:text-xl line-clamp-2">
                      {task?.desc}
                    </span>
                    <div className="sm:w-[18%] md:w-[14%] lg:w-[10%] flex justify-evenly items-center">
                      <MdModeEditOutline
                        // size={40}
                        className="text-[#65350F] cursor-pointer size-7 sm:size-8  md:size-10"
                        onClick={() => {
                          handleEditTask(task?.id);
                        }}
                      />
                      <MdDeleteForever
                        size={40}
                        className="text-[#65350F] cursor-pointer size-7 sm:size-8  md:size-10"
                        onClick={() => {
                          handleDeleteTask(task?.id);
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-2xl h-[70vh] flex justify-center items-center">
            No Task Available
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayTask;
