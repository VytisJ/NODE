import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
