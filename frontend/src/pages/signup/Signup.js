import styles from "./Signup.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store/usersApiSlice";
import { setCredentials } from "../../store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register(values).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" id="firstName" />
            <ErrorMessage name="firstName">
              {(msg) => <div className={styles["text-error"]}>{msg}</div>}
            </ErrorMessage>

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" id="lastName" />
            <ErrorMessage name="lastName">
              {(msg) => <div className={styles["text-error"]}>{msg}</div>}
            </ErrorMessage>

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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />
            <ErrorMessage name="confirmPassword">
              {(msg) => <div className={styles["text-error"]}>{msg}</div>}
            </ErrorMessage>

            <button type="submit" disabled={!isValid || isSubmitting}>
              Sign Up
            </button>

            <span>You have already registered?</span> <Link to='/signin'>Log in</Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
