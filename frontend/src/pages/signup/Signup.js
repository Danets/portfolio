import styles from "./Signup.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
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

          <button type="submit" disabled={!isValid || isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
