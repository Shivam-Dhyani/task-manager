import { useEffect, useContext } from "react";
import { TaskContext } from "./Context";

export default function App() {
  const { taskState, dispatch } = useContext(TaskContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (taskState?.taskDetails?.name && taskState?.taskDetails?.desc) {
      if (taskState?.editTaskId) {
        // Edit Mode
        const currentTaskIndex = findCurrentTaskIndex(taskState?.editTaskId);

        const updatedTasksList = [...taskState.tasksList];

        updatedTasksList[currentTaskIndex] = { ...taskState?.taskDetails };

        setStateWithLocalStorage(
          "APPEND_TASK_IN_LIST",
          "tasksList",
          updatedTasksList
        );

        setStateWithLocalStorage("CHANGE_EDIT_ID", "editTaskId", null);
      } else {
        // Create Mode
        setStateWithLocalStorage("APPEND_TASK_IN_LIST", "tasksList", [
          ...taskState.tasksList,
          { ...taskState?.taskDetails, id: Math.random().toString(36) },
        ]);
      }

      setStateWithLocalStorage("EDIT_TASK_DETAILS", "taskDetails", {
        id: "",
        name: "",
        desc: "",
      });
    }
  };

  const handleEditTask = (id) => {
    const currentTaskIndex = findCurrentTaskIndex(id);

    setStateWithLocalStorage("CHANGE_EDIT_ID", "editTaskId", id);

    setStateWithLocalStorage("EDIT_TASK_DETAILS", "taskDetails", {
      ...taskState?.tasksList?.[currentTaskIndex],
    });
  };

  const handleDeleteTask = (id) => {
    const currentTaskIndex = findCurrentTaskIndex(id);

    const updatedTasksList = [...taskState.tasksList];

    updatedTasksList.splice(currentTaskIndex, 1);

    setStateWithLocalStorage(
      "APPEND_TASK_IN_LIST",
      "tasksList",
      updatedTasksList
    );

    if (taskState?.taskDetails?.name || taskState?.taskDetails?.desc) {
      setStateWithLocalStorage("EDIT_TASK_DETAILS", "taskDetails", {
        id: "",
        name: "",
        desc: "",
      });

      setStateWithLocalStorage("CHANGE_EDIT_ID", "editTaskId", null);
    }
  };

  useEffect(() => {
    dispatch({
      type: "APPEND_TASK_IN_LIST",
      payload: JSON.parse(localStorage.getItem("tasksList")) ?? [],
    });

    dispatch({
      type: "EDIT_TASK_DETAILS",
      payload: JSON.parse(localStorage.getItem("taskDetails")),
    });

    dispatch({
      type: "CHANGE_EDIT_ID",
      payload: JSON.parse(localStorage.getItem("editTaskId")),
    });
  }, []);

  const findCurrentTaskIndex = (id) =>
    taskState?.tasksList.findIndex((task) => task.id === id);

  const setStateWithLocalStorage = (actionType, loaclStoageKey, data) => {
    dispatch({ type: actionType, payload: data });

    localStorage.setItem(loaclStoageKey, JSON.stringify(data));
  };

  return (
    <div className="bg-[bisque] h-screen">
      <div className=" text-4xl text-center py-4">Task Manager</div>
      <form
        className="my-5 flex flex-col lg:flex-row justify-evenly items-center gap-4"
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
              setStateWithLocalStorage("EDIT_TASK_DETAILS", "taskDetails", {
                ...taskState?.taskDetails,
                name: e.target.value,
              });
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
              setStateWithLocalStorage("EDIT_TASK_DETAILS", "taskDetails", {
                ...taskState?.taskDetails,
                desc: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-xl p-3 rounded-xl"
          disabled={
            !taskState?.taskDetails?.name || !taskState?.taskDetails?.desc
          }
        >
          {taskState?.editTaskId ? "Edit Task" : "Add Task"}
        </button>
      </form>

      <div>
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
      </div>
    </div>
  );
}
