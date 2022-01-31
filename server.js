import express from "express";
import getSection from "./utils/getSection.js";

const app = express();

app.use(express.json());

app.get("/:bookVolume/:sectionId", async (request, response) => {
  const { bookVolume, sectionId } = request.params;
  const data = await getSection(bookVolume, sectionId);
  response.status(200).send(data);
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
