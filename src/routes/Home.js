import React from "react";
import { gql, useQuery } from "@apollo/client";

const GetMovies = gql`
  {
    movies {
      id
      title
      medium_cover_image
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GetMovies);
  if (loading) return <div>loading...</div>;
  if (data && data.movies) return data.movies.map((m) => <div>{m.title}</div>);
}

export default Home;
