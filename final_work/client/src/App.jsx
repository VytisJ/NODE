import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const App = () => {
  const [dalyviai, setDalyviai] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((resp) => resp.data)
      .then((response) => {
        setDalyviai(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {dalyviai.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {dalyviai.map((dalyvis) => (
              <tr key={dalyvis._id}>
                <td>{dalyvis.name}</td>
                <td>{dalyvis.surname}</td>
                <td>{dalyvis.email}</td>
                <td>{dalyvis.age}</td>
                <td>{dalyvis.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}

      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          age: "",
          gender: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          surname: Yup.string().required("Surname is required"),
          email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
          age: Yup.number()
            .required("Age is required")
            .positive("Age must be positive")
            .min(18, "Minimum age is 18"), // Minimum age validation
          gender: Yup.string().required("Gender is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          const newDalyvis = values;
          axios
            .post("http://localhost:3000/", newDalyvis)
            .then(() => {
              setDalyviai((prevDalyviai) => [...prevDalyviai, newDalyvis]);
              resetForm(); // Clear the form after successful submission
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <Form>
          <Field className="formkStyle" name="name" placeholder="Name" />
          <Field className="formkStyle" name="surname" placeholder="Surname" />
          <Field className="formkStyle" name="email" placeholder="Email" />
          <Field
            className="formkStyle"
            name="age"
            placeholder="Age"
            type="number"
          />
          <Field className="formkStyle" name="gender" as="select">
            <option value="">Select Gender</option> {/* Add an empty option */}
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>
          <button type="submit">Add new event participant</button>
          <ErrorMessage name="name" component="div" className="error" />
          <ErrorMessage name="surname" component="div" className="error" />
          <ErrorMessage name="email" component="div" className="error" />
          <ErrorMessage name="age" component="div" className="error" />
          <ErrorMessage name="gender" component="div" className="error" />
        </Form>
      </Formik>
    </div>
  );
};

export default App;
