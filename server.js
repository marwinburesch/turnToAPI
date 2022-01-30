const express = require("express");
const { readFile } = require("fs/promises");

const app = express();
const xmlJs = require("xml-js");

app.use(express.json());

app.get("/:id", async (request, response) => {
  const xml = await readFile(
    `./book1/${request.params.id}.xml`,
    {
      encoding: "utf-8",
    },
    (error, data) => {
      if (error) throw error;
      return data;
    }
  );

  const parsedXml = xmlJs.xml2json(xml, {
    compact: false,
    spaces: 4,
    textFn: (string) => string.trim(),
  });

  response.send(parsedXml);
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
