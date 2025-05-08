import { Book, BookSearchResponse } from "../screens/authentication/HomeScreen";
import { Get } from "./APIConfig";
import { APIConfig } from "./APIUtils";

/*
export async function searchBook(query: string) {
  return await Get<Book[]>(APIConfig.book.search + query).then(
    ({ data }) => data
  );
}
*/

export async function searchBook(query: string): Promise<Book[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await Get<BookSearchResponse>(
    APIConfig.book.search + encodedQuery
  );
  return response.data.docs;
}
