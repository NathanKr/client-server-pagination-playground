import Products from "@/components/gen-ui/products";
import usePageBackForward from "@/hooks/use-page-back-forward";
import { getNumProductPages, getProductPage } from "@/logic/server/utils";
import IPage from "@/types/i-page";
import { Button } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface IProps {
  serverPage: IPage;
  numServerPages: number;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { serverPageIndex } = context.params as any;

  let props: IProps = {
    serverPage: { products: [] },
    numServerPages: getNumProductPages(),
  };

  if (serverPageIndex) {
    props.serverPage = getProductPage(serverPageIndex);
  }

  return {
    props, // will be passed to the page component as props
  };
};

interface IPath {
  params: { serverPageIndex: string };
}

function getParams(): IPath[] {
  const numServerPages = getNumProductPages();
  const array = Array.from(Array(numServerPages).keys());

  return array.map((it) => ({ params: { serverPageIndex: `${it}` } }));
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getParams(),
    fallback: false, // false or 'blocking'
  };
};

const PageWithSsgPagination: NextPage<IProps> = ({
  serverPage,
  numServerPages,
}) => {
  const {
    pageIndex: serverPageIndex,
    backHandler,
    forwardHandler,
  } = usePageBackForward(numServerPages);
  return (
    <>
      <h1>Page from server</h1>
      <h2>#pages : {numServerPages}</h2>
      <h3>serverPageIndex : {serverPageIndex}</h3>
      <Button onClick={forwardHandler}>Forward server page index</Button>
      <br />
      <Button onClick={backHandler}>Backward server page index</Button>
      <br />
      <h4>Issues</h4>
      <p style={{ color: "red" }}>
        Following link , not clear why - looks like text
      </p>
      <Link href={`/products/${serverPageIndex}`}>
        Navigate to page index : {serverPageIndex}
      </Link>
      <br />
      <br />
      <Products products={serverPage.products} />
    </>
  );
};

export default PageWithSsgPagination;
