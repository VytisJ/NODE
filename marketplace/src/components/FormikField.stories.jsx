import FormikField from "./FormikField";
import { Form, Formik } from "formik";
export default {
  title: "Components/FormikField",
  component: FormikField,
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <Formik initialValues={{ test: "", test1: "Hello" }}>
    <Form style={{ maxWidth: 350 }}>{children}</Form>
  </Formik>
);

export const EmptyField = () => (
  <Wrapper>
    <FormikField name="test" />
  </Wrapper>
);

export const EmptyFieldWithPlaceholder = () => (
  <Wrapper>
    <FormikField name="test" placeholder="Test" />
  </Wrapper>
);

export const Field = () => (
  <Wrapper>
    <FormikField name="test1" />
  </Wrapper>
);

export const LabledField = () => (
  <Wrapper>
    <FormikField name="test1" label="Test" />
  </Wrapper>
);
