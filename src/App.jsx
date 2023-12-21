export default function App() {
  return (
    <div className="bg-[bisque] h-screen">
      <div className=" text-4xl text-center py-4">Task Manager</div>
      <form className="my-5 flex flex-col lg:flex-row justify-evenly items-center gap-4">
        <div className="flex items-center sm:justify-center gap-2 md:gap-4">
          <label htmlFor="taskName" className="text-xl min-w-36">
            Task Name:
          </label>
          <input
            type="text"
            className="w-[40vw] lg:w-[20vw] text-lg p-1 md:p-2 border-black border-2 rounded-xl"
            name="taskName"
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
          ></textarea>
        </div>
        <button className="bg-[#65350F] disabled:bg-[#987b4f] active:translate-y-1 text-white text-xl p-3 rounded-xl">
          Add Task
        </button>
      </form>
    </div>
  );
}
