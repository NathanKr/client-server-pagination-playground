import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

export default function Home() {
  return (
    <div>
      {/* <MuiLink> */}
        <Link href="/page-with-csr-pagination">
          Navigate to page with CSR pagination
        </Link>
      {/* </MuiLink> */}
    </div>
  );
}
