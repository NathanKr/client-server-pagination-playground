import { CLIENT_PAGE_SIZE, SERVER_PAGE_SIZE } from "@/logic/common/constants";
import IPage from "@/types/i-page";
import IProduct from "@/types/i-product";
import { Button } from "@mui/material";
import { FC, useState } from "react";

interface IProps {
  serverPage: IPage;
}

const numClientPages = SERVER_PAGE_SIZE / CLIENT_PAGE_SIZE;

const ClientPagination: FC<IProps> = ({ serverPage }) => {
  const [clientPageIndex, setClientPageIndex] = useState(0);

  function getCurrentClientPage(): IProduct[] {
    const indexStart = clientPageIndex * CLIENT_PAGE_SIZE;
    const indexEnd = (clientPageIndex + 1) * CLIENT_PAGE_SIZE;
    return serverPage.products.slice(indexStart, indexEnd);
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
    <li key={i}>{product.productName}</li>
  ));

  return (
    <div>
      <h2 style={{ color: "lightblue" }}>ClientPagination</h2>
      <Button variant="outlined" onClick={backHandler}>
        Back client page
      </Button>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <Button variant="outlined" onClick={forwardHandler}>
        Forward client page
      </Button>
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

export default ClientPagination;
