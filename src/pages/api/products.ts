// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SERVER_PAGE_QUERY_STRING } from "@/logic/common/constants";
import { getProducts } from "@/logic/server/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const serverPageIndex = req.query[SERVER_PAGE_QUERY_STRING];

  const result = getProducts(serverPageIndex as string);


  res.status(result.status).json({ products: result.products });
}
