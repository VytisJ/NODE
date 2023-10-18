import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, generatePath } from "react-router-dom";
import { fetchAds } from "../api/ads";
import AdCard from "../components/AdCard";
import Button from "../components/Button";
import { NEW_AD_PATH, EDIT_AD_PATH } from "../routes/const";
import { deleteAd } from "../api/ads";
import { UserContext } from "../contexts/UserContext";

const Container = styled.div`
  max-width: 1100px;
  margin: 3rem auto;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledAd = styled.div`
  margin-bottom: 1rem;
`;

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  const getAds = () => {
    fetchAds()
      .then((response) => setAds(response))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAds();
  }, []);

  // const handleDeleteNotEfficiant = async (id) => {
  //   try {
  //     await deleteAd(id);
  //     getAds();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleEdit = (id) => {
    const path = generatePath(EDIT_AD_PATH, { id });
    navigate(path);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAd(id);
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ActionBar>
        <h2>Marketplace</h2>
        {isLoggedIn && (
          <Link to={NEW_AD_PATH}>
            <Button>Add ad</Button>
          </Link>
        )}
      </ActionBar>
      {ads.map((ad) => (
        <StyledAd key={ad.id}>
          <AdCard
            ad={ad}
            handleEdit={() => handleEdit(ad.id)}
            handleDelete={() => handleDelete(ad.id)}
          />
        </StyledAd>
      ))}
    </Container>
  );
};

export default Home;
