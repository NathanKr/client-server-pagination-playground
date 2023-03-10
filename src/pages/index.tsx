import Link from "next/link";
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
        Navigate to page with SSG pagination
      </Link>
    </div>
  );
}

export default Home;