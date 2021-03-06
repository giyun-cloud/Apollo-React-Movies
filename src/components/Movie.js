import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LikeMovie = gql`
  mutation likeMovie($id: Int) {
    likeMovie(id: $id) @client
  }
`;
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      language
      rating
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
`;

const Poster = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;
const Button = styled.button`
  color: #34495e;
  border-radius: 4px;
  border: 1px solid #34495e;
  background-color: #ecf0f1;
  padding: 2px;
  width: 50px;
  margin-top: 2px;
  font-size: 13px;
`;

function Movie({ id, bg, isLiked }) {
  const [likeMovie] = useMutation(LikeMovie, {
    variables: { id },
  });
  const { loading } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <Button onClick={likeMovie}>
        {isLiked ? (loading ? "loading" : "UnLike") : "Like"}
      </Button>
    </Container>
  );
}

export default Movie;
