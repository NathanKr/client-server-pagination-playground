import IGetProducts from "@/types/i-get-products";
import IPage from "@/types/i-page";
import { HttpStatusCode } from "axios";
import p from "data/products";
import { SERVER_PAGE_SIZE } from "../common/constants";

export function getProductPage(serverPageIndex: number): IPage {
  let page: IPage = {
    products: [],
  };

  const indexStart = serverPageIndex * SERVER_PAGE_SIZE;
  const indexEnd = (serverPageIndex + 1) * SERVER_PAGE_SIZE; // end not incliuding
  page.products = p.slice(indexStart, indexEnd);

  return page;
}

export function getNumProductPages() : number{
    return Math.ceil(p.length / SERVER_PAGE_SIZE)
}

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
  const page = getProductPage(serverPageIndexNumber);

  return {
    status: HttpStatusCode.Ok,
    products: page.products,
  };
}
