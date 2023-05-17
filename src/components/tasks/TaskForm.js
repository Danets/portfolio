
const TaskForm = ({value, handleSubmit, handleChangeInput}) => {
  
  return (
    <>
      <h3>Input Task</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter Task"
          value={value}
          required
          onChange={(e) => handleChangeInput(e)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TaskForm;
