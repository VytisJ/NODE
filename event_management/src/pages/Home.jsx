import Button from "../components/Button";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { NEW_EVENT_PATH } from "../routes/routes";

const Home = () => {
  const events = JSON.parse(localStorage.getItem("event")) || [];
  const navigate = useNavigate();

  [
    {
      id: 346,
      name: "Rapis",
      dob: 1591315200000,
      client_email: "rap@gmail.com",
      archived: 0,
    },
    {
      id: 364,
      name: "Lucky",
      dob: 1252454400000,
      client_email: "notsomuch@gmail.com",
      archived: 0,
    },
    {
      id: 382,
      name: "Loki",
      dob: 1689033600000,
      client_email: "pavargau@nesuprantu.com",
      archived: 0,
    },
  ];
  return (
    <div>
      <div className="event-top-container">
        <h1>All events</h1>
        <Button onClick={() => navigate(NEW_EVENT_PATH)}>
          Create new Event
        </Button>
      </div>
      {events.length > 0
        ? events.map((event) => (
            <div key={event.id} className="event-item">
              <EventCard event={event} />
            </div>
          ))
        : "There are no created events yet."}
    </div>
  );
};

export default Home;
