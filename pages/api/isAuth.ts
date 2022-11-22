import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

type successResponse = {
  isAuth: boolean;
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
    const { jwt } = req.query;
    if (typeof jwt === "string") {
      try {
        const isAuth = verify(jwt, process.env.SECRET);
        return res.status(200).json({ isAuth: Boolean(isAuth) });
      } catch {
        // nothing to do here
      }
    }
  }
  return res.status(401).json({ isAuth: false });
}
