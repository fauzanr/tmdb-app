import { posterFallbackPath } from "../config";

const BASE_URL = "https://api.themoviedb.org";
const IMG_BASE_URL = "https://image.tmdb.org/t/p";
const API_KEY = `${process.env.TMDB_API_KEY}`;

const createURL = (path: string, query?: Record<string, string>) => {
  const url = new URL(path, BASE_URL);

  query &&
    Object.keys(query).forEach((key) => {
      url.searchParams.append(key, query[key]);
    });
  url.searchParams.set("api_key", API_KEY);

  return url.href;
};

export const LATEST_MOVIES_URL = createURL("/3/discover/movie", {
  sort_by: "release_date.desc",
});
export const DISCOVER_URL = (sortBy: string) =>
  createURL("3/discover/movie", {
    sort_by: sortBy,
  });
export const MOVIE_URL = (id: string | number) => createURL(`/3/movie/${id}`);
export const IMAGE_URL = (imgPath?: string | null) =>
  imgPath ? `${IMG_BASE_URL}/w300${imgPath}` : posterFallbackPath;
