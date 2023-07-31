import useValidateInput from "../../hooks/useValidateInput";
import styles from "./Login.module.css";

const Login = () => {
  const {
    value:     email,
    isInputValid: isEmailValid,
    isInputInvalid: isEmailInvalid,
    handleInputFocus: handleEmailFocus,
    handleChangeInput: handleChangeEmail,
    resetValues: resetUsername
  } = useValidateInput((val) => val.trim() !== '');

  const {
    value: password,
    isInputValid: isPasswordValid,
    isInputInvalid: isPassswordInValid,
    handleInputFocus: handlePasswordFocus,
    handleChangeInput: handleChangePassword,
    resetValues: resetPassword
  } = useValidateInput((val) => val.length > 8);

  const classErrorName = isEmailValid
    ? `${styles["form-control-error"]}`
    : "";
  const classErrorPass = isPassswordInValid
    ? `${styles["form-control-error"]}`
    : "";

  let isFormValid = false;

  if (isEmailValid && isPasswordValid) {
    isFormValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    const data = {email, password };
    resetUsername();
    resetPassword();
  };

  return (
    <>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <div className={classErrorName}>
          <input
            type="text"
            placeholder="Enter Email"
            required
            name="email"
            value={email}
            onChange={handleChangeEmail}
            onBlur={handleEmailFocus}
          />
          {isEmailInvalid && <div>Put Email</div>}
        </div>

        <div className={classErrorPass}>
          <input
            type="password"
            placeholder="Enter Password"
            required
            name="password"
            value={password}
            onChange={handleChangePassword}
            onBlur={handlePasswordFocus}
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
