import Products from "@/components/gen-ui/products";
import usePageBackForward from "@/hooks/use-page-back-forward";
import { getNumProductPages, getProductPage } from "@/logic/server/utils";
import IPage from "@/types/i-page";
import { Button } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface IProps {
  serverPage: IPage;
  numServerPages: number;
  serverPageIndex:number;
  isSuccess:boolean;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { serverPageIndex : serverPageIndexRaw } = context.params as any;

  let props: IProps = {
    serverPage: { products: [] },
    numServerPages: getNumProductPages(),
    serverPageIndex: -1,
    isSuccess: true
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
  isSuccess
}) => {
  const router = useRouter();
  

  if(!isSuccess){
    return <p style={{color:'red'}}>Server error</p>
  }

  return (
    <>
      <h1>Page from server</h1>
      <h2>#pages : {numServerPages}</h2>
      <h3>serverPageIndex : {serverPageIndex}</h3>
      <Button onClick={() => {
        const newServerPageIndex = serverPageIndex+1;
        router.push(`/products/${newServerPageIndex}`)
      }}>Increment and navigate</Button>
      <Button onClick={() => {
        const newServerPageIndex = serverPageIndex-1;
        router.push(`/products/${newServerPageIndex}`)
      }}>Decrement and navigate</Button>
      <br />
      <br />
      <Products products={serverPage.products} />
    </>
  );
};

export default PageWithSsgPagination;
