import NavigationBar from "./components/NavigationBar";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <UserProvider>
      <NavigationBar />
      <AppRoutes />
    </UserProvider>
  );
};

export default App;
