import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import { UserContext } from "../contexts/UserContext";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  height: 120px;
  width: 120px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  width: 60%;
  padding: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  width: 10%;
`;

const Price = styled.p`
  color: orange;
  font-size: 2rem;
  align-self: center;
  width: 10%;
  text-align: right;
`;

const AdCard = ({ ad, handleEdit, handleDelete }) => {
  const { title, description, imageUrl, price } = ad;
  const { user } = useContext(UserContext);

  return (
    <Container>
      <ImageContainer>
        <Image src={imageUrl} alt={title} />
      </ImageContainer>
      <Info>
        <h2>{title}</h2>
        <p>{description}</p>
      </Info>
      <Actions>
        {user && user.id === ad.userId && (
          <>
            <Button primary onClick={handleEdit}>
              Edit
            </Button>
            <Button secondary onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Actions>
      <Price>€{price}</Price>
    </Container>
  );
};

AdCard.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdCard;
