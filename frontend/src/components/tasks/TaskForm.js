
const TaskForm = ({value, submit, changeInput}) => {
  
  return (
    <>
      <h3>Input Task</h3>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={value}
          required
          onChange={changeInput}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TaskForm;
