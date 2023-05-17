
const TaskForm = ({value, submit, changeInput}) => {
  
  return (
    <>
      <h3>Input Task</h3>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="Enter Task"
          value={value}
          required
          onChange={(e) => changeInput(e)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TaskForm;
