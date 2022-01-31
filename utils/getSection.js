import { readFile } from "fs/promises";
import xmlJs from "xml-js";

export default async function getSection(bookVolume, sectionId) {
  const xml = await readFile(
    `./book${bookVolume}/${sectionId}.xml`,
    {
      encoding: "utf-8",
    },
    (error, data) => {
      if (error) throw error;
      return data;
    }
  );

  const parsedXml = xmlJs.xml2js(xml, {
    compact: false,
    spaces: 4,
    textFn: (string) => string.trim(),
  });
  return parsedXml;
}
