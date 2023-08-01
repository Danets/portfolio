import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const FormikContainer = () => {
  const dropdownOptions = [
    { key: "Select an role", value: "" },
    { key: "Admin", value: "admin" },
    { key: "User", value: "user" },
    { key: "Developer", value: "developer" },
  ];

  const radioOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
  ];

  const checkboxOptions = [
    { key: "Level 1", value: "level1" },
    { key: "Level 2", value: "level2" },
    { key: "Level 3", value: "level3" },
  ];

  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    checkboxOption: Yup.array().required("Required"),
    birthDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select a topic"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Radio topic"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="Checkbox topics"
            name="checkboxOption"
            options={checkboxOptions}
          />
          <FormikControl control="date" label="Pick a date" name="birthDate" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
