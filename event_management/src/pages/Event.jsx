import { useParams } from "react-router-dom";
import "./Event.scss";

const Event = () => {
  const { id } = useParams();
  const events = JSON.parse(localStorage.getItem("event")) || [];
  const foundEvent = events.find((event) => event.id === +id);

  if (!foundEvent) {
    return <div>Event not found</div>;
  }

  const { imageUrl, title, startingDate, endingDate, description } = foundEvent;

  return (
    <div className="event">
      <img src={imageUrl} alt={title} className="event-img" />
      <p className="event-date">
        {startingDate} - {endingDate}
      </p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Event;
