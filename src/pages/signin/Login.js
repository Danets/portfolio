import { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [data, setFormdata] = useState({ username: "", password: "" });
  const [isTouchedUsername, setTouchUsername] = useState(false);
  const [isTouchedPassword, setTouchPassword] = useState(false);
  const isUsernameValid = data.username.trim() !== "";
  const isPasswordValid = data.password.trim() !== "";
  const isUsernameInvalid = !isUsernameValid && isTouchedUsername;
  const isPassswordInValid = !isPasswordValid && isTouchedPassword;

  const classErrorName = isUsernameInvalid ? `${styles['form-control-error']}` : '';
  const classErrorPass = isPassswordInValid ? `${styles['form-control-error']}` : '';

  let isFormValid = false;

  if (isUsernameValid && isPasswordValid) {
    isFormValid = true;
  }

  const handleUsernameFocus = () => {
    setTouchUsername(true);
  };

  const handlePasswwordFocus = () => {
    setTouchPassword(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouchUsername(true);
    setTouchPassword(true);
    if (!isUsernameValid && !isPasswordValid) return;
    setFormdata({
      username: "",
      password: "",
    });
    setTouchUsername(false);
    setTouchPassword(false);
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
        <div className={classErrorName}>
          <input
            type="text"
            placeholder="Enter Username"
            required
            value={data.username}
            onChange={(e) => handleChangeInput(e, "username")}
            onBlur={handleUsernameFocus}
          />
          {isUsernameInvalid && <div>Put name</div>}
        </div>

        <div className={classErrorPass}>
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={data.password}
            onChange={(e) => handleChangeInput(e, "password")}
            onBlur={handlePasswwordFocus}
          />
          {isPassswordInValid && <div>Put Password</div>}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
