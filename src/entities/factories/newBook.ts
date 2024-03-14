import { DeepNew, FactoryOpts, New, newTestInstance } from "joist-orm";
import { Book, EntityManager } from "../entities";

export function newBook(em: EntityManager, opts: FactoryOpts<Book> = {}): DeepNew<Book> {
  return newTestInstance(em, Book, opts);
}
