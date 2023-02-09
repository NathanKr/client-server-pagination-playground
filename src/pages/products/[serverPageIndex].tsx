import ResponsiveMuiPagination from "@/components/gen-ui/responsive-mui-pagination";
import Products from "@/components/products";
import { getNumProductPages, getProductPage } from "@/logic/server/utils";
import IPage from "@/types/i-page";
import { Button, Pagination } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface IProps {
  serverPage: IPage;
  numServerPages: number;
  serverPageIndex: number;
  isSuccess: boolean;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { serverPageIndex: serverPageIndexRaw } = context.params as any;

  let props: IProps = {
    serverPage: { products: [] },
    numServerPages: getNumProductPages(),
    serverPageIndex: -1,
    isSuccess: true,
  };

  props.serverPageIndex = parseInt(serverPageIndexRaw);

  if (isNaN(props.serverPageIndex) || props.serverPageIndex < 0) {
    props.isSuccess = false;
  } else {
    props.serverPage = getProductPage(props.serverPageIndex);
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
  serverPageIndex,
  isSuccess,
}) => {
  const router = useRouter();

  const handleChange = (e: any, pageNumber: number) => {
    const newServerPageIndex = pageNumber - 1;
    navigate(newServerPageIndex);
  };

  function navigate(newPageIndex: number): void {
    router.push(`/products/${newPageIndex}`);
  }

  if (!isSuccess) {
    return <p style={{ color: "red" }}>Server error</p>;
  }

  return (
    <>
      <h1>Page from server</h1>
      <h2>#pages : {numServerPages}</h2>
      <h3>serverPageIndex : {serverPageIndex}</h3>
      {/* <Button
        onClick={() => {
          const newServerPageIndex = serverPageIndex + 1;
          navigate(newServerPageIndex);
        }}
      >
        Increment and navigate
      </Button>
      <Button
        onClick={() => {
          const newServerPageIndex = serverPageIndex - 1;
          navigate(newServerPageIndex);
        }}
      >
        Decrement and navigate
      </Button> */}
      <br />
      <div
        style={{
          padding: "3px",
          backgroundColor: "lightgray",
          display: "inline-block",
        }}
      >
        <ResponsiveMuiPagination
          count={numServerPages}
          page={serverPageIndex + 1}
          handleChange={handleChange}
        />
      </div>
      <br />
      <br />
      <Products products={serverPage.products} />
    </>
  );
};

export default PageWithSsgPagination;
