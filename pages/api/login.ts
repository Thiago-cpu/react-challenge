import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";

type successResponse = {
  jwt: string;
};

type errorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<successResponse | errorResponse>
) {
  if (process.env.SECRET === undefined) {
    return res.status(404).json({ error: "unauthorized" });
  }
  if (req.method === "GET") {
    const { username, password } = req.query;
    if (username === "admin" && password === "123") {
      const jwt = sign({ username, password }, process.env.SECRET);
      return res.status(200).json({ jwt });
    }
  }
  return res.status(404).json({ error: "unauthorized" });
}
