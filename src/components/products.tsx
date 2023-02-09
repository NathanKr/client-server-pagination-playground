import IProduct from "@/types/i-product";
import React, { FC } from "react";

interface IProps {
  products: IProduct[];
}

const Products: FC<IProps> = ({ products }) => {
  const productsElems = products.map((product, i) => (
    <li key={i}>{product.productName}</li>
  ));

  return (
    <>
      <h3>products</h3>
      <ul>{productsElems}</ul>
    </>
  );
};

export default Products;
