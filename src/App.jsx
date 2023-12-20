export default function App() {
  return (
    <div className="bg-[bisque] h-screen">
      <form>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" name="taskName" className="border-black" />
        </div>
      </form>
    </div>
  );
}
