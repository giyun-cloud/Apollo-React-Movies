import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GetMovies = gql`
  {
    movies(rating: 8.5) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #e67e22, #f39c12);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const Home = () => {
  const { loading, data } = useQuery(GetMovies);
  return (
    <Container>
      <Header>
        <Title>Apollo 2022</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie id={m.id} isLiked={m.isLiked} bg={m.medium_cover_image} />
        ))}
      </Movies>
    </Container>
  );
};

export default Home;
