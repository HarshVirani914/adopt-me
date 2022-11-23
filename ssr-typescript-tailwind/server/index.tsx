import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import App from "../src/App";

const PORT: number | string = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html", "utf8");

const parts = html.split("not rendered");

const app = express();

app.use("/frontend", express.static("dist/frontend"));
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
