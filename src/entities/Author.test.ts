// organize-imports-ignore
import { config } from "dotenv";
// Do this via a `-r` sort of thing? `NODE_OPTIONS`?
if (process.env.STAGE === undefined) {
  config({ path: "./env/local.env" });
}
import { Author, EntityManager } from "src/entities";
import { PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";
import { knex as createKnex, Knex } from "knex";

describe("Author", () => {
  it("can be created", async () => {
    const ctx = {};
    const knex = createKnex({
      client: "pg",
      connection: newPgConnectionConfig() as any,
      debug: false,
      asyncStackTraces: true,
    });
    const pg = new PostgresDriver(knex);
    const em = new EntityManager(ctx, pg);

    const a = new Author(em, { firstName: "a1" });
    await em.flush();
    await knex.destroy();
  });
});
