import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface textInputFormProp {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registeroption?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const TextInputForm = ({
  name,
  label,
  register,
  registeroption,
  error,
  ...props
}: textInputFormProp) => {
  return (
    <Form.Group className="mb-3" controlId={name + " input"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...register(name, registeroption)}
        {...props}
        isInvalid={error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputForm;
