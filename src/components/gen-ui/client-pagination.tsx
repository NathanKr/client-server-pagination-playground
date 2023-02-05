import usePageBackForward from "@/hooks/use-page-back-forward";
import { CLIENT_PAGE_SIZE, SERVER_PAGE_SIZE } from "@/logic/common/constants";
import IPage from "@/types/i-page";
import IProduct from "@/types/i-product";
import { Button } from "@mui/material";
import { FC, useState } from "react";
import Products from "./products";

interface IProps {
  serverPage: IPage;
}

const numClientPages = SERVER_PAGE_SIZE / CLIENT_PAGE_SIZE;

const ClientPagination: FC<IProps> = ({ serverPage }) => {
  const [clientPageIndex, backHandler, forwardHandler] =
    usePageBackForward(numClientPages);

  function getCurrentClientPage(): IProduct[] {
    const indexStart = clientPageIndex * CLIENT_PAGE_SIZE;
    const indexEnd = (clientPageIndex + 1) * CLIENT_PAGE_SIZE;
    return serverPage.products.slice(indexStart, indexEnd);
  }

  return (
    <div>
      <h2 style={{ color: "lightblue" }}>Client Page</h2>
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
      <Products products={getCurrentClientPage()} />
    </div>
  );
};

export default ClientPagination;
