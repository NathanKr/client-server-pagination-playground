import { HttpStatusCode } from "axios";
import IProduct from "./i-product";

export default interface IGetProducts{
    status : HttpStatusCode ;
    products : IProduct[];
}