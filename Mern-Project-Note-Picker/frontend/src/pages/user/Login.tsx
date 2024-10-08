import { Button, Form, Modal } from "react-bootstrap";
import { User, userLogin } from "../../types/user";
import { useForm } from "react-hook-form";
import TextInputForm from "../../components/form/TextInputForm";
import styles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";
import useUser from "../../hooks/api/useUser";

interface LoginType {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const Login = ({ onDismiss, onLoginSuccessful }: LoginType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userLogin>({});

  const [user,setUser]=useState<User>();

  const {loginUser}=useUser();


  const onLogin = async (input:userLogin)=>{
       const response=await loginUser(input);

       if(response.success){
        setUser(response.response as User)
       }
  }


  useEffect(() => {
    if (user) {
      onLoginSuccessful(user);
    }
  }, [user, onLoginSuccessful]);

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="signUpForm" onSubmit={handleSubmit(onLogin)}>
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
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registeroption={{ required: "Required" }}
            error={errors.password}
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
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
