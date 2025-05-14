import { IBook } from "../types/IBook";
import { IBookSearchResponse } from "../types/IBookSearchResponse";
import { Get } from "./APIConfig";
import { APIConfig } from "./APIUtils";

interface IBookDetailsResponse {
  description?: string | { value: string };
  subjects?: string[];
}

const KNOWN_GENRES = [
  "Fantasy fiction",
  "Adventure fiction",
  "Science fiction",
  "Historical fiction",
  "Romance",
  "Thriller",
  "Horror",
  "Mystery",
  "Drama",
  "Comedy",
  "Nonfiction",
  "Fiction",
  "Juvenile fiction"
];

export async function searchBook(
  query: string,
  page: number = 1
): Promise<IBook[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await Get<IBookSearchResponse>(
    `${APIConfig.book.search + encodedQuery}&page=${page}`
  );
  return response.data.docs;
}

function fetchGenres(subjects: string[] = []): string[] {
  return subjects.filter((subject) => KNOWN_GENRES.includes(subject));
}

export async function fetchBookDetails(workKey: string): Promise<{
  description: string;
  genres: string[];
}> {
  const response = await Get<IBookDetailsResponse>(`${workKey}.json`);
  const data = response.data;

  const description =
    typeof data.description === "string"
      ? data.description
      : data.description?.value || "No description available.";

  const genres = fetchGenres(data.subjects || []);

  return { description, genres };
}
