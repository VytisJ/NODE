import Contacts from "../pages/Contacts";
import Event from "../pages/Event";
import Home from "../pages/Home";
import NewEvent from "../pages/NewEvent";

export const HOME_PATH = "/";
export const EVENT_PATH = "/:id";
export const NEW_EVENT_PATH = "/new";
export const CONTACTS_PATH = "/contacts";

export const topNavigationItems = [
  { title: "Home", path: HOME_PATH },
  { title: "Contacts", path: CONTACTS_PATH },
];

export const routes = [
  { path: HOME_PATH, Component: Home },
  { path: CONTACTS_PATH, Component: Contacts },
  { path: EVENT_PATH, Component: Event },
  { path: NEW_EVENT_PATH, Component: NewEvent },
];
