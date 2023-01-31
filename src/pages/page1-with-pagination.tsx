import { CLIENT_PAGE_SIZE, SERVER_PAGE_SIZE } from "@/common/constants";
import { getProductsApiUrl } from "@/common/urls";
import GenericFetchData from "@/components/gen-ui/generic-fetch-data";
import IPage from "@/types/i-page";
import IProduct from "@/types/i-product";
import { useRef, useState } from "react";

const numClientPages = SERVER_PAGE_SIZE / CLIENT_PAGE_SIZE;

const Page1WithPagination = () => {
  const [serverPage, setServerPage] = useState<IPage | null>();
  const [serverPageIndex, setServerPageIndex] = useState(0);
  const [clientPageIndex, setClientPageIndex] = useState(0);
  const inputElServerPageIndex = useRef(null);

  function getCurrentClientPage(): IProduct[] {
    const indexStart = clientPageIndex * CLIENT_PAGE_SIZE;
    const indexEnd = (clientPageIndex + 1) * CLIENT_PAGE_SIZE;
    return serverPage?.products
      ? serverPage?.products.slice(indexStart, indexEnd)
      : [];
  }

  function backHandler() {
    if (clientPageIndex > 0) {
      setClientPageIndex(clientPageIndex - 1);
    }
  }

  function forwardHandler() {
    if (clientPageIndex < numClientPages - 1) {
      setClientPageIndex(clientPageIndex + 1);
    }
  }

  const productsElems = getCurrentClientPage().map((product, i) => (
    <li>{product.productName}</li>
  ));

  return (
    <div>
      <h2>Page1WithPagination</h2>
      <br />
      <h3>server page index</h3>
      <input
        type="number"
        placeholder="server page index"
        ref={inputElServerPageIndex}
        defaultValue={serverPageIndex}
      />
      <br />
      <button
        onClick={() => {
          const index = Number(
            (inputElServerPageIndex.current! as HTMLInputElement).value
          );
          setServerPageIndex(index);
        }}
      >
        Get server page data
      </button>
      <br />
      <GenericFetchData
        url={getProductsApiUrl(serverPageIndex)}
        validate={null}
        setData={(data: IPage) => setServerPage(data)}
        successComponent={<p>Success</p>}
        errorComponent={<p>Error</p>}
        loadingComponent={<p>Loading ...</p>}
      />
      <br />
      <br />
      <button onClick={backHandler}>Back client page</button>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <button onClick={forwardHandler}>Forward client page</button>
      <p>current client page index : {clientPageIndex}</p>
      <p>
        current client page items :
        {getCurrentClientPage() ? getCurrentClientPage()?.length : ""}
      </p>
      <br />
      <h3>products</h3>
      <ul>{productsElems}</ul>
    </div>
  );
};

export default Page1WithPagination;
