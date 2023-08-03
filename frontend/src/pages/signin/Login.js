import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../store/usersApiSlice";
import { setCredentials } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
      try {
        const res = await login(values).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (
          <Form>

            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" id="email" />
            <ErrorMessage name="email">
              {(msg) => <div className={styles["text-error"]}>{msg}</div>}
            </ErrorMessage>

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" id="password" />
            <ErrorMessage name="password">
              {(msg) => <div className={styles["text-error"]}>{msg}</div>}
            </ErrorMessage>

            <button type="submit" disabled={!isValid || isSubmitting}>
              Sign In
            </button>

            <span>New User?</span> <Link to='/signup'>Register</Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
