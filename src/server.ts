import { app } from "./app";

const port = process.env.PORT || 3000;
const isProduction = process.env.IS_PRODUCTION === "true";

if (isProduction) {
  app.set("env", "production");
}

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
