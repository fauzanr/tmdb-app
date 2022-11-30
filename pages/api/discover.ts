// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DISCOVER_URL, LATEST_MOVIES_URL } from "../../api";
import { MovieRecord } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sort } = req.query;
  const moviesRes = await fetch(
    !sort
      ? LATEST_MOVIES_URL
      : DISCOVER_URL(Array.isArray(sort) ? sort[0] : sort)
  );
  const movies: MovieRecord[] = await moviesRes.json();

  res.status(200).json(movies);
}
