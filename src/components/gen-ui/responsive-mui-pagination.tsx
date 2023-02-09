import IResponsiveMuiPagination from "@/types/i-responsive-mui-pagination";
import { Pagination, PaginationProps, useMediaQuery } from "@mui/material";
import React, { FC } from "react";

const ResponsiveMuiPagination: FC<IResponsiveMuiPagination> = ({
  count,
  page,
  handleChange,
}) => {
  const matches = useMediaQuery("(max-width:500px)");

  const props : PaginationProps = {
    count,
    color: "secondary",
    size: "large",
    page,
    variant: "outlined",
    shape: "rounded",
    onChange: handleChange,
  };

  if (matches){
    props.siblingCount=0
  }

  return (
    <div>
      <Pagination {...props} />
    </div>
  );
};

export default ResponsiveMuiPagination;
