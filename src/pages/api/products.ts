// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  SERVER_PAGE_SIZE,
  SERVER_PAGE_QUERY_STRING,
  LAST_SERVER_PAGE_INDEX,
} from "@/common/constants";
import p from "data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverPageIndex = req.query[SERVER_PAGE_QUERY_STRING];

  if (!serverPageIndex) {
    // --- no page so bring all
    return res.status(200).json({ products: p });
  }

  const serverPageIndexNumber = Number(serverPageIndex);
  if (Number.isNaN(serverPageIndexNumber)) {
    return res.status(400);
  }

  let indexStart, indexEnd; // end not incliuding
  if (serverPageIndexNumber == LAST_SERVER_PAGE_INDEX) {
    indexStart = p.length - SERVER_PAGE_SIZE;
    indexEnd = p.length;
  } else {
    indexStart = serverPageIndexNumber * SERVER_PAGE_SIZE;
    indexEnd = (serverPageIndexNumber + 1) * SERVER_PAGE_SIZE;
  }

  const p_slice = p.slice(indexStart, indexEnd);
  res.status(200).json({ products: p_slice });
}
