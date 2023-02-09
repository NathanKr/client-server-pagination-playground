export default interface IResponsiveMuiPagination {
  count: number;
  page: number;
  handleChange: (e: any, pageNumber: number) => void;
}
