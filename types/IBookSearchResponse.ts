import { IBook } from "./IBook";

export interface IBookSearchResponse {
  docs: IBook[];
  numFound: number;
  q: string;
  offset: number | null;
}
