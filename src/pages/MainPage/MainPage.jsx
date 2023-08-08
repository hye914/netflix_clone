import styled from "styled-components";
import Banner from "../../components/MainPage/Banner";
import Row from "../../components/MainPage/Row";
import requests from "../../api/requests";

export const Container = styled.div`
  width: 100%;
`;

export const RowPoster = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: ${(props) => (props.isLarge == "true" ? "320px" : "144px")};
  margin: 0.5%;
  transition: transform 450ms;
  border-radius: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

export default function MainPage() {
  return (
    <Container>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comnedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </Container>
  );
}
