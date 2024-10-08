import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { User, userRegister } from "../../types/user";
import { useForm } from "react-hook-form";
import TextInputForm from "../../components/form/TextInputForm";
import styles from "../../styles/utils.module.css";
import useUser from "../../hooks/api/useUser";

interface SignUpType {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const Signup = ({ onDismiss, onSignUpSuccessful }: SignUpType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userRegister>({});

  const [user,setUser]=useState<User>();

  const {SignUpcredential}=useUser();

  const onSubmit=async(input:userRegister)=>{
    
    const response=await SignUpcredential(input);

    if(response.success){
      setUser(response.response as User);
    }

  }

  useEffect(() => {
    
    if(user){
      onSignUpSuccessful(user);
    }

  }, [user,onSignUpSuccessful]);

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>SignUp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputForm
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registeroption={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputForm
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registeroption={{ required: "Required" }}
            error={errors.email}
          />

          <TextInputForm
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registeroption={{ required: "Required" }}
            error={errors.email}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          form="signUpForm"
          disabled={isSubmitting}
          className={styles.width100}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
