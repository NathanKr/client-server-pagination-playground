import { useState } from "react";

export default function usePageBackForward(
  numPages: number
): [number, () => void, () => void] {
  const [pageIndex, setPageIndex] = useState(0);

  function backHandler() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }

  function forwardHandler() {
    if (pageIndex < numPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  }

  return [pageIndex, backHandler, forwardHandler];
}
