const express = require("express");
const { readFile } = require("fs/promises");

const app = express();

const xmlJs = require("xml-js");

app.use(express.json());

app.get("/:id", async (req, res) => {
  const xml = await readFile(
    `./book1/${req.params.id}.xml`,
    {
      encoding: "utf-8",
    },
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );

  const parsed = xmlJs.xml2json(xml, {
    compact: false,
    spaces: 4,
    textFn: (string) => string.trim(),
  });

  res.send(parsed);
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
