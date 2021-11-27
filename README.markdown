
## Steps

* Install basic things

  ```shell
  npm install -g @homebound/mrm-tasks-prettier \
    @homebound/mrm-tasks-gitignore \
    @homebound/mrm-tasks-typescript
   ```

* Copy/paste `migrations/...author.ts`
* Add `joist-orm`, `joist-migration-utils`, `joist-codegen` to `package.json`
* Copy/paste `run.sh`
* Copy/paste `env/local.env`, changed port
* Add `ts-node`
* Add `joist:migrate` script, run it
* Add `joist:codegen` script, run it
* Added `Author.test.ts` 
* Add `dotenv`

