// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpStatusCode } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(HttpStatusCode.Ok).json({ name: 'John Doe' })
}
