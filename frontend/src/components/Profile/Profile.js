import styles from "./Profile.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../store/usersApiSlice";
import { setCredentials } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = {
    firstName: userInfo ? userInfo.firstName : "",
    lastName: userInfo ? userInfo.lastName : "",
    email: userInfo ? userInfo.email : "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(4, "Too Short!").max(8, "Too Long!"),
    confirmPassword: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser(values).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile was updated successfully!");
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
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
