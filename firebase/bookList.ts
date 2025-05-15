import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IBook } from "../types/IBook";

export async function fetchBooklist(uid: string): Promise<IBook[]> {
  const booksRef = collection(db, "users", uid, "books");
  const querySnap = await getDocs(booksRef);

  const books: IBook[] = [];
  querySnap.forEach((doc) => {
    const data = doc.data();
    books.push({
      title: data.title,
      author_name: data.author,
      key: data.key,
      cover_i: data.cover || undefined,
      description: data.description
    });
  });

  return books;
}
