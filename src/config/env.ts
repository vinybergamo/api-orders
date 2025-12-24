import { get } from "env-var";
import { config } from "dotenv";

config();

export const env = {
  app: {
    port: get("PORT").required().default(3333).asPortNumber(),
  },
  jwt: {
    secret: get("JWT_SECRET").required().asString(),
  },
  mongo: {
    url: get("MONGO_URL").required().asString(),
  },
};
