import { EntityManager } from "src/entities";
import { knex as createKnex, Knex } from "knex";
import { PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";

let knex: Knex;

function getKnex(): Knex {
  return (knex ??= createKnex({
    client: "pg",
    connection: newPgConnectionConfig() as any,
    debug: false,
    asyncStackTraces: true,
  }));
}

export function newEntityManager(): EntityManager {
  return new EntityManager({}, new PostgresDriver(getKnex()));
}

beforeEach(async () => {
  const knex = await getKnex();
  await knex.select(knex.raw("flush_database()"));
});

afterAll(async () => {
  if (knex) {
    await knex.destroy();
  }
});
