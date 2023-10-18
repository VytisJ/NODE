import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.$primary &&
    `
    background-color: #4CAF50;
    &:hover {
      background-color: #45a049;
    }
  `}

  ${(props) =>
    props.$secondary &&
    `
    background-color: #f44336;
    &:hover {
      background-color: #da190b;
    }
  `}
`;

const Button = ({ primary, secondary, children, ...props }) => {
  return (
    <StyledButton $primary={primary} $secondary={secondary} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
