import PropTypes from "prop-types";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link, generatePath } from "react-router-dom";
import { EVENT_PATH } from "../routes/routes";
import "./EventCard.scss";

const EventCard = ({ event }) => {
  const { id, imageUrl, title, startingDate, endingDate, attendanceeCount } =
    event;

  return (
    <div className="card-container">
      <img src={imageUrl} alt={title} className="card-img" />
      <div className="card-info">
        <Link to={generatePath(EVENT_PATH, { id })} className="card-title">
          {title}
        </Link>
        <p className="card-date">
          {startingDate} - {endingDate}
        </p>
      </div>
      <div>
        <p className="card-additionalInfo">
          <BsPersonFillCheck className="card-icon" />
          {attendanceeCount}
        </p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    startingDate: PropTypes.string.isRequired,
    endingDate: PropTypes.string.isRequired,
    attendanceeCount: PropTypes.number.isRequired,
  }),
};

export default EventCard;
