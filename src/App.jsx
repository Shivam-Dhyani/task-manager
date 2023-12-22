import { useState, useEffect } from "react";

export default function App() {
  const [tasksList, setTasksList] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    name: "",
    desc: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (taskDetails?.name && taskDetails?.desc) {
      if (editTaskId) {
        // Edit Mode
        const currentTaskIndex = findCurrentTaskIndex(editTaskId);

        const updatedTasksList = [...tasksList];

        updatedTasksList[currentTaskIndex] = { ...taskDetails };

        setStateWithLocalStorage(setTasksList, "tasksList", updatedTasksList);

        setStateWithLocalStorage(setEditTaskId, "editTaskId", null);
      } else {
        // Create Mode
        setStateWithLocalStorage(setTasksList, "tasksList", [
          ...tasksList,
          { ...taskDetails, id: Math.random().toString(36) },
        ]);
      }

      setStateWithLocalStorage(setTaskDetails, "taskDetails", {
        id: "",
        name: "",
        desc: "",
      });
    }
  };

  const handleEditTask = (id) => {
    const currentTaskIndex = findCurrentTaskIndex(id);

    setStateWithLocalStorage(setEditTaskId, "editTaskId", id);

    setStateWithLocalStorage(setTaskDetails, "taskDetails", {
      ...tasksList?.[currentTaskIndex],
    });
  };

  const handleDeleteTask = (id) => {
    const currentTaskIndex = findCurrentTaskIndex(id);

    const updatedTasksList = [...tasksList];

    updatedTasksList.splice(currentTaskIndex, 1);

    setStateWithLocalStorage(setTasksList, "tasksList", updatedTasksList);

    if (taskDetails?.name || taskDetails?.desc) {
      setStateWithLocalStorage(setTaskDetails, "taskDetails", {
        id: "",
        name: "",
        desc: "",
      });

      setStateWithLocalStorage(setEditTaskId, "editTaskId", null);
    }
  };

  useEffect(() => {
    setTasksList(JSON.parse(localStorage.getItem("tasksList")) ?? []);
    setTaskDetails(JSON.parse(localStorage.getItem("taskDetails")));
    setEditTaskId(JSON.parse(localStorage.getItem("editTaskId")));
  }, []);

  const findCurrentTaskIndex = (id) =>
    tasksList.findIndex((task) => task.id === id);

  const setStateWithLocalStorage = (setState, loaclStoageKey, data) => {
    setState(data);

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
            value={taskDetails?.name}
            onChange={(e) => {
              setTaskDetails({ ...taskDetails, name: e.target.value });

              localStorage.setItem(
                "taskDetails",
                JSON.stringify({ ...taskDetails, name: e.target.value })
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
            value={taskDetails?.desc}
            onChange={(e) => {
              setTaskDetails({ ...taskDetails, desc: e.target.value });

              localStorage.setItem(
                "taskDetails",
                JSON.stringify({ ...taskDetails, desc: e.target.value })
              );
            }}
          ></textarea>
        </div>
        <button
          className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 disabled:translate-y-0 text-white text-xl p-3 rounded-xl"
          disabled={!taskDetails?.name || !taskDetails?.desc}
        >
          {editTaskId ? "Edit Task" : "Add Task"}
        </button>
      </form>

      <div>
        <ul className="overflow-auto h-[30vh]">
          {tasksList &&
            tasksList?.map((task) => (
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
