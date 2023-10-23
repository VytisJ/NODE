import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [dalyviai, setDalyviai] = useState([]);
  const [editingId, setEditingId] = useState(null);
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

  const editDalyvis = (id) => {
    setEditingId(id);
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

      {dalyviai.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th colSpan={6} className="eventHeader">
                <h1>Event participants</h1>
              </th>
            </tr>
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
                {editingId === dalyvis._id ? (
                  <EditRow
                    dalyvis={dalyvis}
                    onCancel={() => setEditingId(null)}
                    onSave={(updatedDalyvis) => {
                      setEditingId(null);
                    }}
                  />
                ) : (
                  <>
                    <td>{dalyvis.name}</td>
                    <td>{dalyvis.surname}</td>
                    <td>{dalyvis.email}</td>
                    <td>{dalyvis.age}</td>
                    <td>{dalyvis.gender}</td>
                    <td>
                      <div className="button-container">
                        <button onClick={() => deleteDalyvis(dalyvis._id)}>
                          Delete
                        </button>

                        <button onClick={() => editDalyvis(dalyvis._id)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </>
                )}
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

const EditRow = ({ dalyvis, onCancel, onSave }) => {
  const [editedDalyvis, setEditedDalyvis] = useState({ ...dalyvis });
  const handleSave = () => {
    axios
      .put(`http://localhost:3000/dalyviai/${editedDalyvis._id}`, editedDalyvis)
      .then((response) => {
        if (response.status === 200) {
          onSave(editedDalyvis);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <td>
        <input
          type="text"
          value={editedDalyvis.name}
          onChange={(e) =>
            setEditedDalyvis({ ...editedDalyvis, name: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={editedDalyvis.surname}
          onChange={(e) =>
            setEditedDalyvis({ ...editedDalyvis, surname: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={editedDalyvis.email}
          onChange={(e) =>
            setEditedDalyvis({ ...editedDalyvis, email: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="number"
          value={editedDalyvis.age}
          onChange={(e) =>
            setEditedDalyvis({ ...editedDalyvis, age: e.target.value })
          }
        />
      </td>
      <td>
        <select
          value={editedDalyvis.gender}
          onChange={(e) =>
            setEditedDalyvis({ ...editedDalyvis, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </td>
      <td>
        <div className="button-container">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </td>
    </>
  );
};

export default Home;
