import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{dalyvis._id}</td>
              <td>{dalyvis.name}</td>
              <td>{dalyvis.surname}</td>
              <td>{dalyvis.email}</td>
              <td>{dalyvis.age}</td>
              <td>{dalyvis.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          age: "",
          gender: "",
        }}
        onSubmit={(values) => {
          const newDalyvis = values;
          axios
            .post("http://localhost:3000/", newDalyvis)
            .then(() => {
              setDalyviai((prevDalyviai) => [...prevDalyviai, newDalyvis]);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <Form>
          <Field class=".formkStyle" name="name" placeholder="Name..." />
          <br></br>
          <Field name="surname" placeholder="Surname..." />
          <br></br>
          <Field name="email" placeholder="Email..." />
          <br></br>
          <Field name="age" placeholder="Age..." />
          <br></br>
          <Field name="gender" placeholder="Gender..." />
          <br></br>
          <button type="submit">Add new event participant</button>
        </Form>
      </Formik>
    </div>
  );
};

export default App;
