import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      language
      rating
      isLiked @client
      id
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #e67e22, #f39c12);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 20px;
  width: 45%;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  color: #ecf0f1;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const SugPosters = styled.div`
  margin-top: 15px;
  padding: 10px 10px 20px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;
const SugFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const SugPoster = styled.div`
  width: 150px;
  height: 200px;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data?.movie?.title}  ${data?.movie?.isLiked ? "⭐" : "😑"}`}
        </Title>
        {!loading && (
          <>
            <Subtitle>
              {data?.movie?.language} ·&nbsp;
              {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
            <SugPosters>
              Suggestions
              <SugFlex>
                {data?.suggestions.map((s) => (
                  <Link to={`/${s.id}`}>
                    <SugPoster key={s.id} bg={s.medium_cover_image}></SugPoster>
                  </Link>
                ))}
              </SugFlex>
            </SugPosters>
          </>
        )}
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Detail;
