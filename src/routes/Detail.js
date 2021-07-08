import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GetMovie = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GetMovie, {
    variables: { id },
  });
  if (loading) return "loading";
  if (data && data.movie) return data.movie.title;
  return <div>oo</div>;
}

export default Detail;
