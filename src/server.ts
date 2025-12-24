import { connectDatabase } from "./config/database";
import { app } from "./app";
import { env } from "./config/env";

connectDatabase().then(() => {
  app.listen(env.app.port, () => {
    console.log(`[SERVER] Running on port ${env.app.port}`);
  });
});
