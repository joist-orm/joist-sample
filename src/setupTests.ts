import { EntityManager } from "src/entities";
import { knex as createKnex, Knex } from "knex";
import { PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";
import { beforeEach, afterAll } from "@jest/globals";

let knex: Knex;
export let queries: string[] = [];

export function resetQueries(): void {
  queries = [];
}

function getKnex(): Knex {
  if (!knex) {
    knex = createKnex({
      client: "pg",
      connection: newPgConnectionConfig() as any,
      debug: false,
      asyncStackTraces: true,
    });
    knex.on("query", (e: any) => {
      queries.push(e.sql);
    });
  }
  return knex;
}

export function newEntityManager(): EntityManager {
  return new EntityManager({}, new PostgresDriver(getKnex()));
}

beforeEach(async () => {
  const knex = getKnex();
  await knex.select(knex.raw("flush_database()"));
  queries = [];
});

afterAll(async () => {
  if (knex) {
    await knex.destroy();
  }
});
