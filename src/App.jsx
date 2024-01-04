import { useEffect, useContext } from "react";
import { TaskContext } from "./Context";
import { Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import DisplayTask from "./pages/DisplayTask";

export default function App() {
  const { dispatch } = useContext(TaskContext);

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

  return (
    <div className="bg-[bisque] h-screen px-4">
      <div className=" text-4xl text-center py-4">Task Manager</div>
      <Routes>
        <Route path="/" element={<AddTask />} />
        <Route path="/show" element={<DisplayTask />} />
      </Routes>
    </div>
  );
}
