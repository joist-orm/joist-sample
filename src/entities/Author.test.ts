import { Author, Book, newAuthor } from "src/entities";
import { newEntityManager, queries } from "src/setupTests";
import { describe, expect, it } from "@jest/globals";

describe("Author", () => {
  it("can be created", async () => {
    const em = newEntityManager(); // 1 per HTTP request
    const a1 = em.create(Author, { firstName: "a1" });
    const a2 = em.create(Author, { firstName: "a2" });
    em.create(Book, { author: a1, title: "b1" });
    em.create(Book, { author: a2, title: "b2" });
    await em.flush();
    expect(queries).toMatchInlineSnapshot(`
     [
       "BEGIN;",
       "select nextval('authors_id_seq') from generate_series(1, 2) UNION ALL select nextval('books_id_seq') from generate_series(1, 2)",
       "INSERT INTO "authors" ("id", "first_name", "last_name", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5),($6, $7, $8, $9, $10)",
       "INSERT INTO "books" ("id", "title", "created_at", "updated_at", "author_id") VALUES ($1, $2, $3, $4, $5),($6, $7, $8, $9, $10)",
       "COMMIT;",
     ]
    `);
  });

  it("can be created with a factory", async () => {
    const em = newEntityManager();
    const a = newAuthor(em);
    await em.flush();
  });
});
