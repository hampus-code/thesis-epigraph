import { IBook } from "../types/IBook";
import { IBookSearchResponse } from "../types/IBookSearchResponse";
import { Get } from "./APIConfig";
import { APIConfig } from "./APIUtils";

export async function searchBook(query: string): Promise<IBook[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await Get<IBookSearchResponse>(
    APIConfig.book.search + encodedQuery
  );
  return response.data.docs;
}
