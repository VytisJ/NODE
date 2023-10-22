import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import NavigationBar from "./components/NavigationBar";
import "./App.scss";

const App = () => {
  return (
    <>
      <NavigationBar />
      <main className="main-container">
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;
