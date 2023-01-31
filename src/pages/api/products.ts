// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SERVER_PAGE_SIZE, SERVER_PAGE_QUERY_STRING } from "@/common/constants";
import p from "data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverPage = req.query[SERVER_PAGE_QUERY_STRING];

  if (!serverPage) {
    // --- no page so bring all
    return res.status(200).json({products : p});
  }

  const parsed = Number(serverPage);
  if (Number.isNaN(parsed)) {
    return res.status(400);
  }

  const indexStart = parsed * SERVER_PAGE_SIZE,
    indexEnd = (parsed + 1) * SERVER_PAGE_SIZE; // end not incliuding
  const p_slice = p.slice(indexStart, indexEnd);
  res.status(200).json({products : p_slice});
}
