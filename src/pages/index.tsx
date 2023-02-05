import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import { NextPage } from "next";

const Home : NextPage = () => {
  return (
    <div>
      {/* <MuiLink>  remark because i get issue with this */}
      <Link href="/page-with-csr-pagination">
        Navigate to page with CSR pagination
      </Link>
      {/* </MuiLink> */}
      <br />
      <Link href="/products/0">
        Navigate to page with SSG pagination - first server page
      </Link>
    </div>
  );
}

export default Home;