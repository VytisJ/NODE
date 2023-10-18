import Home from "../pages/Home";
import Login from "../pages/Login";
import NewAd from "../pages/NewAd";
import Register from "../pages/Register";
import Ad from "../pages/Ad";
import EditAd from "../pages/EditAd";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const AD_PATH = "/:id";
export const NEW_AD_PATH = "/new";
export const EDIT_AD_PATH = `${AD_PATH}/edit`;

export const topNavigationItems = [
  { title: "Home", path: HOME_PATH },
  { title: "Login", path: LOGIN_PATH, hideOnAuth: true },
  { title: "Register", path: REGISTER_PATH, hideOnAuth: true },
];

export const routes = [
  { path: HOME_PATH, Component: Home },
  { path: LOGIN_PATH, Component: Login },
  { path: REGISTER_PATH, Component: Register },
  { path: AD_PATH, Component: Ad },
  { path: NEW_AD_PATH, Component: NewAd },
  { path: EDIT_AD_PATH, Component: EditAd },
];
