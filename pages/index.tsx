import styled from "@emotion/styled";
import { Button, Tabs, Text, Grid, Rating, Badge } from "@geist-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { DISCOVER_URL, IMAGE_URL, LATEST_MOVIES_URL } from "../api";
import { Card, Container, Grid as GridContainer } from "../components/styled";
import { MovieRecord, PaginationResponse } from "../types";

const CardRelative = styled(Card)`
  position: relative;
`;

const PosterCover = styled.div`
  flex: none;
  background: lightgray;
  position: relative;
  aspect-ratio: 6 / 9;
`;

const BlurBg = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  display: none;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  pointer-events: none;

  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);

  &[data-active="true"] {
    display: flex;
  }
`;

const SORT_LIST = [
  // {value: "release_date.asc", text: ''},
  { value: "release_date.desc", text: "Upcoming" },
  // {value: "popularity.asc", text: ''},
  { value: "popularity.desc", text: "Popular" },
  // {value: "revenue.asc", text: ''},
  // {value: "revenue.desc", text: ''},
  // {value: "primary_release_date.asc", text: ''},
  // {value: "primary_release_date.desc", text: ''},
  // {value: "original_title.asc", text: ''},
  // {value: "original_title.desc", text: ''},
  // {value: "vote_average.asc", text: ''},
  // { value: "vote_average.desc", text: "" },
  // {value: "vote_count.asc", text: ''},
  { value: "vote_count.desc", text: "Highest Rating" },
];

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { sort } = query;
  const moviesRes = await fetch(
    !sort
      ? LATEST_MOVIES_URL
      : DISCOVER_URL(Array.isArray(sort) ? sort[0] : sort)
  );
  const movies: MovieRecord[] = await moviesRes.json();

  return {
    props: {
      movies,
      sort: sort || "release_date.desc",
    },
  };
};

const Home = ({
  movies,
  sort,
}: {
  movies: PaginationResponse<MovieRecord[]>;
  sort?: string | string[];
}) => {
  const router = useRouter();
  const [hoverId, setHoverId] = useState<number | string | null>(null);

  const handleChangeSort = (sort: string | string[]) => {
    router.push({ query: { sort } });
  };

  return (
    <>
      <Head>
        <title>TMDB App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Tabs
            value={sort ? (Array.isArray(sort) ? sort[0] : sort) : undefined}
            align="center"
            onChange={handleChangeSort}
          >
            {SORT_LIST.map((sort) => (
              <Tabs.Item
                key={sort.value}
                value={sort.value}
                label={sort.text}
              ></Tabs.Item>
            ))}
          </Tabs>

          <GridContainer>
            {movies.results.map((movie) => (
              <CardRelative
                key={`${movie.id}_${movie.title}`}
                onMouseEnter={() => setHoverId(movie.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <PosterCover>
                  <Image
                    src={IMAGE_URL(movie.poster_path || movie.backdrop_path)}
                    fill
                    objectFit="cover"
                    alt={movie.title}
                  />
                </PosterCover>
                <BlurBg data-active={hoverId === movie.id}>
                  <Text b>{movie.title}</Text>
                  <Text small>{movie.release_date}</Text>
                  <Grid.Container gap={1} wrap="nowrap" mt={1}>
                    <Grid>
                      <Rating
                        locked={true}
                        value={Math.ceil(movie.vote_average) / 2}
                        type="warning"
                      />
                    </Grid>
                    <Grid>
                      <Badge type="secondary">{movie.vote_average}</Badge>
                    </Grid>
                  </Grid.Container>
                </BlurBg>
              </CardRelative>
            ))}
          </GridContainer>

          <Grid.Container justify="center" mt={2}>
            <Grid>
              <Button type="success">Load More</Button>
            </Grid>
          </Grid.Container>
        </Container>
      </main>
    </>
  );
};

export default Home;
