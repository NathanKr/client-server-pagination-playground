import { SERVER_PAGE_QUERY_STRING } from "./constants";

export function getQueryString(serverPageIndex: number): string {
  return `?${SERVER_PAGE_QUERY_STRING}=${serverPageIndex}`;
}
