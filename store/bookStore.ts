import { create } from "zustand";
import { IBook } from "../types/IBook";

interface BookStore {
  booklist: IBook[];
  setBooklist: (books: IBook[]) => void;
  addBook: (book: IBook) => void;
  removeBook: (key: string) => void;
  clearBooklist: () => void;
}

export const useBookStore = create<BookStore>((set) => ({
  booklist: [],
  setBooklist: (books) => set({ booklist: books }),
  addBook: (book) =>
    set((state) => {
      const exists = state.booklist.some((b) => b.key === book.key);
      if (exists) return state;
      return { booklist: [...state.booklist, book] };
    }),
  removeBook: (key) =>
    set((state) => ({
      booklist: state.booklist.filter((b) => b.key !== key)
    })),
  clearBooklist: () => set({ booklist: [] })
}));
