import { Get } from "./APIConfig";
import { APIConfig } from "./APIUtils";

export async function searchBook() {
  return await Get(APIConfig.book.search).then(({ data }) => {
    return data;
  });
}
