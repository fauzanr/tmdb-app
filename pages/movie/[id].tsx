import styled from "@emotion/styled";
import { Badge, Button, Description, Grid, Rating, Text } from "@geist-ui/core";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IMAGE_URL, MOVIE_URL } from "../../api";
import { Container } from "../../components/styled";
import { blurDataUrl } from "../../config";
import { Movie } from "../../types";

const TrailerContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
`;

const Trailer = styled.iframe`
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  flex: auto;
  width: 100%;
  position: relative;
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // @ts-expect-error: property does not exist
  const { id } = params;

  const res = await fetch(MOVIE_URL(id));
  const data: Movie = await res.json();

  console.log(MOVIE_URL(id));

  return {
    props: { movie: data },
  };
};

const MovieDetail = ({ movie }: { movie: Movie }) => {
  return (
    <Container style={{ padding: "1rem" }}>
      <Link href="/">
        <Button type="abort" auto mb={1}>
          &lt; Back to Home
        </Button>
      </Link>

      <Grid.Container gap={3} mb={2}>
        <Grid xs={24} sm={8} alignItems="flex-start">
          <Image
            src={IMAGE_URL(movie.poster_path || movie.backdrop_path)}
            placeholder="blur"
            blurDataURL={blurDataUrl()}
            width={600}
            height={900}
            layout="responsive"
            alt={movie.title}
          />
        </Grid>

        <Grid xs={24} sm={16}>
          <div style={{ flex: "auto" }}>
            <Text h1>
              {movie.title}&nbsp;({new Date(movie.release_date).getFullYear()})
            </Text>

            {movie.tagline && (
              <Text font="18px" style={{ color: "#b3b3b3" }} mb={1} mt={0}>
                <em>"{movie.tagline}"</em>
              </Text>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating count={1} value={1} type="warning" />
              <Text mr={0.4}>{movie.vote_average}</Text>
              <Text style={{ color: "#ccc" }}>({movie.vote_count})</Text>
            </div>

            {movie.genres.map((genre) => (
              <Badge key={genre.id} type="success" mt={1} mr={0.4}>
                {genre.name}
              </Badge>
            ))}

            <Description title="Overview" content={movie.overview} mt={2} />
            <Description
              title="Total Runtime"
              content={`${movie.runtime} Minutes`}
              mt={2}
            />
            <Description
              title="Production"
              content={movie.production_companies.map((item, idx) => (
                <span key={item.id} style={{ color: "#000" }}>
                  {item.name}
                  {movie.production_companies.length - idx > 1 && ", "}
                </span>
              ))}
              mt={2}
            />
          </div>
        </Grid>
      </Grid.Container>

      <Text h2 mb={1}>
        Casts
      </Text>
      <Grid.Container wrap="wrap" gap={1} mb={2}>
        {movie.credits?.cast?.slice(0, 10).map((cast) => (
          <Grid style={{ overflow: "hidden", width: 180 }}>
            <ImageContainer>
              <Image
                src={IMAGE_URL(cast.profile_path)}
                placeholder="blur"
                blurDataURL={blurDataUrl()}
                width={180}
                height={240}
                objectFit="cover"
                alt={cast.name}
                style={{ borderRadius: 8, maxWidth: "100%" }}
              />
            </ImageContainer>
            <Text>{cast.name}</Text>
            <Text type="secondary" small>
              {cast.character}
            </Text>
          </Grid>
        ))}
      </Grid.Container>

      {movie.videos?.results?.length > 0 && (
        <>
          <Text h2 mb={1}>
            Trailer
          </Text>
          <TrailerContainer>
            <Trailer
              src={`https://www.youtube-nocookie.com/embed/${movie.videos.results[0].key}`}
              frameBorder="0"
            ></Trailer>
          </TrailerContainer>
        </>
      )}
    </Container>
  );
};

export default MovieDetail;
