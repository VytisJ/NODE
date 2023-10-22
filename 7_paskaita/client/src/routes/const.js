import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

export const topNavigationItems = [
  { title: "Home", path: HOME_PATH },
  { title: "Login", path: LOGIN_PATH, hideOnAuth: true },
  { title: "Register", path: REGISTER_PATH, hideOnAuth: true },
];

export const routes = [
  { path: HOME_PATH, Component: Home },
  { path: LOGIN_PATH, Component: Login },
  { path: REGISTER_PATH, Component: Register },
];
