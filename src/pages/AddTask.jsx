import { useContext } from "react";
import { useNavigate } from "react-router";
import { TaskContext } from "../Context";
import { setStateWithLocalStorage } from "../utils/common";

const AddTask = () => {
  const navigate = useNavigate();
  const { taskState, dispatch } = useContext(TaskContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (taskState?.taskDetails?.name && taskState?.taskDetails?.desc) {
      if (taskState?.editTaskId) {
        // Edit Mode
        dispatch({ type: "EDIT_TASK" });
        navigate("/show");
      } else {
        // Create Mode
        dispatch({ type: "ADD_TASK" });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row md:items-start">
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-lg md:text-xl mx-5 my-2 p-2 md:p-3 rounded-xl"
          onClick={() => {
            navigate("/show");
            dispatch({ type: "RESET_TASK_DETAILS" });
          }}
        >
          Show Tasks
        </button>
      </div>
      <form
        className="my-5 flex flex-col justify-evenly items-center gap-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex items-center sm:justify-center gap-2 md:gap-4">
          <label htmlFor="taskName" className="text-xl min-w-36">
            Task Name:
          </label>
          <input
            type="text"
            className="w-[40vw] lg:w-[20vw] text-lg p-1 md:p-2 border-black border-2 rounded-xl"
            name="taskName"
            value={taskState?.taskDetails?.name}
            onChange={(e) => {
              setStateWithLocalStorage(
                dispatch,
                "EDIT_TASK_DETAILS",
                "taskDetails",
                {
                  ...taskState?.taskDetails,
                  name: e.target.value,
                }
              );
            }}
          />
        </div>
        <div className="flex items-center sm:justify-center gap-2 md:gap-4">
          <label htmlFor="taskName" className="text-xl min-w-36">
            Task Priority:
          </label>
          <select
            name=""
            id=""
            className="w-[40vw] lg:w-[20vw] text-lg p-1 md:p-2 border-black border-2 rounded-xl"
            value={taskState?.taskDetails?.priority}
            onChange={(e) => {
              setStateWithLocalStorage(
                dispatch,
                "EDIT_TASK_DETAILS",
                "taskDetails",
                {
                  ...taskState?.taskDetails,
                  priority: e.target.value,
                }
              );
            }}
          >
            <option value="">Select Task&apos;s Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex items-center sm:justify-center gap-2 md:gap-4">
          <label htmlFor="taskName" className="text-xl min-w-36">
            Task Duration:
          </label>
          <input
            type="time"
            className="w-[40vw] lg:w-[20vw] text-lg p-1 md:p-2 border-black border-2 rounded-xl"
            name="taskName"
            value={taskState?.taskDetails?.duration || "00:00"}
            defaultValue="00:00"
            onChange={(e) => {
              setStateWithLocalStorage(
                dispatch,
                "EDIT_TASK_DETAILS",
                "taskDetails",
                {
                  ...taskState?.taskDetails,
                  duration: e.target.value,
                }
              );
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <label htmlFor="taskDesc" className="text-xl min-w-21">
            Task Description:
          </label>
          <textarea
            name="taskDesc"
            className="w-[40vw] lg:w-[20vw] text-lg p-1 md:p-2 border-black border-2 rounded-xl"
            rows="3"
            value={taskState?.taskDetails?.desc}
            onChange={(e) => {
              setStateWithLocalStorage(
                dispatch,
                "EDIT_TASK_DETAILS",
                "taskDetails",
                {
                  ...taskState?.taskDetails,
                  desc: e.target.value,
                }
              );
            }}
          ></textarea>
        </div>
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-xl p-3 rounded-xl w-full md:w-fit"
          disabled={
            !taskState?.taskDetails?.name ||
            !taskState?.taskDetails?.desc ||
            !taskState?.taskDetails?.priority ||
            !taskState?.taskDetails?.duration
          }
        >
          {taskState?.editTaskId ? "Edit Task" : "Add Task"}
        </button>
      </form>
    </>
  );
};

export default AddTask;
