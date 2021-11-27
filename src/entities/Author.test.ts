import { Author, EntityManager, newAuthor } from "src/entities";
import { newEntityManager } from "src/setupTests";

describe("Author", () => {
  it("can be created", async () => {
    const em = newEntityManager();
    const a = new Author(em, { firstName: "a1" });
    await em.flush();
  });

  it("can be created with a factory", async () => {
    const em = newEntityManager();
    const a = newAuthor(em);
    await em.flush();
  });
});
