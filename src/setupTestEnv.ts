import { config } from "dotenv";

export default () => {
  if (process.env.STAGE === undefined) {
    config({ path: "./env/local.env" });
  }
};
