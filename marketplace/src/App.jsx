import NavigationBar from "./components/NavigationBar";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <UserProvider>
      <NavigationBar />
      <AppRoutes />
      <ToastContainer autoClose={3000} pauseOnHover={false} />
    </UserProvider>
  );
};

export default App;
