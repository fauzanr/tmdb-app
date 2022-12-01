import { posterFallbackPath } from "../config";
import { MovieListTypes } from "../types";

const BASE_URL = "https://api.themoviedb.org";
const IMG_BASE_URL = "https://image.tmdb.org/t/p";
const API_KEY = `${process.env.TMDB_API_KEY}`;

const createURL = (path: string, query?: Record<string, string | number>) => {
  const url = new URL(path, BASE_URL);

  query &&
    Object.keys(query).forEach((key) => {
      url.searchParams.append(key, String(query[key]));
    });
  url.searchParams.set("api_key", API_KEY);

  return url.href;
};

export const MOVIES_URL = (
  page = 1,
  type?: typeof MovieListTypes[number] | string
) =>
  createURL(`/3/movie/${type || MovieListTypes[0]}`, {
    page,
  });
export const DISCOVER_URL = (page = 1, sortBy: string) =>
  createURL("3/discover/movies", {
    page,
    sort_by: sortBy,
  });
export const MOVIE_URL = (id: string | number) =>
  createURL(`/3/movie/${id}`, { append_to_response: "videos,credits" });
export const IMAGE_URL = (imgPath?: string | null) =>
  imgPath ? `${IMG_BASE_URL}/w300${imgPath}` : posterFallbackPath;
