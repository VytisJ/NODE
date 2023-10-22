import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [dalyviai, setDalyviai] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const deleteDalyvis = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/dalyviai/${id}`);
      setDalyviai((prevDalyviai) =>
        prevDalyviai.filter(
          (dalyvis) => dalyvis._id.toString() !== id.toString()
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  const onLogout = () => {
    navigate("/login");
  };

  const userEmail = location.state ? location.state.userEmail : "";

  return (
    <div>
      <header>
        <div className="headerStyle">
          <h1>EVENT ADMIN</h1>
          <h2>Logged in as: {userEmail}</h2>
          <button className="formButton" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="formDalyviai">
        <div>
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
                .min(18, "Minimum age is 18"),
              gender: Yup.string().required("Gender is required"),
            })}
            onSubmit={(values, { resetForm }) => {
              const newDalyvis = values;
              axios
                .post("http://localhost:3000/", newDalyvis)
                .then(() => {
                  setDalyviai((prevDalyviai) => [...prevDalyviai, newDalyvis]);
                  resetForm();
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <Form className="formStyle">
              <h2>Add new event participant</h2>
              <Field
                className="formFieldStyle"
                name="name"
                placeholder="Name"
              />
              <Field
                className="formFieldStyle"
                name="surname"
                placeholder="Surname"
              />
              <Field
                className="formFieldStyle"
                name="email"
                placeholder="Email"
              />
              <Field
                className="formFieldStyle"
                name="age"
                placeholder="Age"
                type="number"
              />
              <Field className="formFieldStyle" name="gender" as="select">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <button className="formButton" type="submit">
                Add new
              </button>
              <ErrorMessage name="name" component="div" className="error" />
              <ErrorMessage name="surname" component="div" className="error" />
              <ErrorMessage name="email" component="div" className="error" />
              <ErrorMessage name="age" component="div" className="error" />
              <ErrorMessage name="gender" component="div" className="error" />
            </Form>
          </Formik>
        </div>
      </div>
      <div className="eventHeader">
        <h1>Event participants</h1>
      </div>

      {dalyviai.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
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
                <td>
                  <button onClick={() => deleteDalyvis(dalyvis._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Home;
