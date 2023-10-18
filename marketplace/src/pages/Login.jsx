import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormikField from "../components/FormikField";
import Button from "../components/Button";
import { loginUser } from "../api/users";
import { HOME_PATH } from "../routes/const";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Container = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const StyledField = styled.div`
  margin-bottom: 1rem;
`;

const Error = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      if (response) {
        setUser(response);
        navigate(HOME_PATH);
      } else {
        setError("User email or password is incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Login form</Title>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().required("Required").email(),
          password: Yup.string().required("Required").min(8),
        })}
      >
        <Form>
          <StyledField>
            <FormikField label="Email" name="email" />
          </StyledField>
          <StyledField>
            <FormikField label="Password" name="password" type="password" />
          </StyledField>
          {error && <Error>{error}</Error>}
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
