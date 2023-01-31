import { getQueryString } from "./query-string-utils";

export function getBaseProductsApiUrl(): string {
  return "/api/products";
}

export function getProductsApiUrl(serverPageIndex: number): string {
  return `${getBaseProductsApiUrl()}${getQueryString(serverPageIndex)}`;
}
