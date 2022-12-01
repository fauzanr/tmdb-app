// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MOVIES_URL } from "../../api";
import { MovieRecord } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sort, page } = req.query;

  const moviesRes = await fetch(
    MOVIES_URL(
      Array.isArray(page) ? Number(page[0]) : Number(page) || 1,
      Array.isArray(sort) ? sort[0] : sort
    )
  );
  const movies: MovieRecord[] = await moviesRes.json();

  res.status(200).json(movies);
}
