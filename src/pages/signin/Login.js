import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [data, setFormdata] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    setFormdata({
      username: "",
      password: "",
    });
  };
  const handleChangeInput = (event, name) => {
    setFormdata((prevstate) => ({
      ...prevstate,
      [name]: event.target.value,
    }));
  };
  return (
    <>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          required
          value={data.username}
          onChange={(e) => handleChangeInput(e, "username")}
        />

        <input
          type="password"
          placeholder="Enter Password"
          required
          value={data.password}
          onChange={(e) => handleChangeInput(e, "password")}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
