import InputFormik from "./InputFormik";
import TextareaFormik from "./TextareaFormik";
import SelectFormik from "./SelectFormik";
import RadioButtonsFormik from "./RadioButtonsFormik";
import CheckboxGroupFormik from "./CheckboxGroupFormik";
import DatePickerFormik from "./DatePickerFormik";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputFormik {...rest} />;
    case "textarea":
      return <TextareaFormik {...rest} />;
    case "select":
      return <SelectFormik {...rest} />;
    case "radio":
      return <RadioButtonsFormik {...rest} />;
    case "checkbox":
      return <CheckboxGroupFormik {...rest} />;
    case "date":
      return <DatePickerFormik {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
