
# Joist Sample App

This is a bare minimum sample app using Joist as an ORM.

There are two domain objects, `Author` and `Book`, and a single test, `Author.test.ts`.

There are no examples of business logic or Joist's various features; for those see the docs.

## Setup

- `npm i`
- `npm run joist-migrate`
- `npm test`

## Example Workflow

A typical workflow for adding a new entity looks like:

- Run `npm run joist-new-migration "add publisher"`
- Edit the `migrations/...add-publisher.ts` file and add
  ```typescript
  createEntityTable(pgm, "publishers", {
    name: { type: "text", notNull: true },
  });
  ```
- Run `npm run joist-migrate`
- Run `npm run joist-codegen`
- Copy/paste the `Author.test.ts` and write a test for `Publisher`

## Steps Taken to Setup This Repo

TODO: Automate this with more, probably with mrm.

- Install basic prettier/TypeScript/jest.

  ```shell
  npm install -g mrm
  npm install -g \
    @homebound/mrm-tasks-prettier \
    @homebound/mrm-tasks-gitignore \
    @homebound/mrm-tasks-typescript
  mrm @homebound/mrm-tasks-prettier \
    @homebound/mrm-tasks-gitignore \
    @homebound/mrm-tasks-typescript
  ```

- Copy/paste `migrations/...author.ts`
- Add `joist-orm`, `joist-migration-utils`, `joist-codegen` to `package.json`
- Copy/paste `run.sh`
- Copy/paste `env/local.env`, changed port
- Add `ts-node` to `package.json`
  - Should come from `mrm`?
- Add `joist-migrate` script, run it
- Add `joist-codegen` script, run it
- Add `Author.test.ts`
- Add `dotenv` to `package.json`
- Add `joist-new-migration` to `package.json`
- Add `.gitattributes` to suppress diffs on generated files
