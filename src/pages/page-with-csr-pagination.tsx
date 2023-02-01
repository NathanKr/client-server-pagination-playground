import { getProductsApiUrl } from "@/logic/common/urls";
import ClientPagination from "@/components/gen-ui/client-pagination";
import GenericFetchData from "@/components/gen-ui/generic-fetch-data";
import IPage from "@/types/i-page";
import { Button } from "@mui/material";
import { useRef, useState } from "react";

const PageWithCsrPagination = () => {
  const [serverPage, setServerPage] = useState<IPage | null>();
  const [serverPageIndex, setServerPageIndex] = useState(0);
  const inputElServerPageIndex = useRef(null);

  console.log(serverPage);
  

  return (
    <div>
      <h1>Page With CSR Pagination</h1>
      <br />
      <h2 style={{ color: "lightblue" }}>Server page</h2>

      <Button
        variant="outlined"
        onClick={() => {
          const index = Number(
            (inputElServerPageIndex.current! as HTMLInputElement).value
          );
          setServerPageIndex(index);
        }}
      >
        Load server page
      </Button>
      <h3>server page index</h3>
      <input
        type="number"
        placeholder="server page index"
        ref={inputElServerPageIndex}
        defaultValue={serverPageIndex}
      />
      <br />

      <br />
      <GenericFetchData
        url={getProductsApiUrl(serverPageIndex)}
        validate={null}
        setData={(data: IPage) => setServerPage(data)}
        successComponent={<p style={{ color: "green" }}>Success</p>}
        errorComponent={<p style={{ color: "red" }}>Error</p>}
        loadingComponent={<p>Loading ...</p>}
      />
      <br />
      <br />
      {serverPage && <ClientPagination serverPage={serverPage} />}
    </div>
  );
};

export default PageWithCsrPagination;
