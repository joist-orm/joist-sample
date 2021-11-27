// organize-imports-ignore
import { config } from "dotenv";
import { EntityManager } from "src/entities";
import { knex as createKnex, Knex } from "knex";
import { PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";
// Do this via a `-r` sort of thing? `NODE_OPTIONS`?
if (process.env.STAGE === undefined) {
  config({ path: "./env/local.env" });
}

let knex: Knex;

export function newEntityManager(): EntityManager {
  knex ??= createKnex({
    client: "pg",
    connection: newPgConnectionConfig() as any,
    debug: false,
    asyncStackTraces: true,
  });
  return new EntityManager({}, new PostgresDriver(knex));
}

afterAll(async () => {
  if (knex) {
    await knex.destroy();
  }
});
