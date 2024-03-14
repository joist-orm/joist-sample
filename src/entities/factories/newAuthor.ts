import { DeepNew, FactoryOpts, New, newTestInstance } from "joist-orm";
import { Author, EntityManager } from "../entities";

export function newAuthor(em: EntityManager, opts: FactoryOpts<Author> = {}): DeepNew<Author> {
  return newTestInstance(em, Author, opts);
}
