import IGetProducts from "@/types/i-get-products";
import { HttpStatusCode } from "axios";
import p from "data/products";
import { SERVER_PAGE_SIZE } from "../common/constants";

export function getProducts(serverPageIndex?: string): IGetProducts {
  if (!serverPageIndex) {
    // --- no page so bring all
    return {
      status: HttpStatusCode.Ok,
      products: p,
    };
  }

  const serverPageIndexNumber = Number(serverPageIndex);
  if (Number.isNaN(serverPageIndexNumber)) {
    return {
      status: HttpStatusCode.BadRequest,
      products: [],
    };
  }

  // --- ready for slice
  const indexStart = serverPageIndexNumber * SERVER_PAGE_SIZE;
  const indexEnd = (serverPageIndexNumber + 1) * SERVER_PAGE_SIZE; // end not incliuding
  const p_slice = p.slice(indexStart, indexEnd);
  return {
    status: HttpStatusCode.Ok,
    products: p_slice
  }
}
