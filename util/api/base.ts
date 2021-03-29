import nc, { Options } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

type ExtendedRequest = {} & NextApiRequest;

const onError: Options<ExtendedRequest, NextApiResponse>["onError"] = (
  err,
  req,
  res,
  next
) => {
  console.error("Failed to handle request:");
  console.error(err);

  res.status(500).end(err.toString());
};

const handler = nc<ExtendedRequest, NextApiResponse>({ onError });

export default handler;
