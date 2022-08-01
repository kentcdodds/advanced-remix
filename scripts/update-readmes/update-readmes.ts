import path from "path";
import fs from "fs";
import glob from "glob";
import prettier from "prettier";
import { getReadmeTitle } from "../utils/get-readme-title";

const pkg = require(path.join(process.cwd(), "package.json"));
const { title: projectTitle } = pkg;

glob
  .sync("exercise/**/README.md", { ignore: ["**/node_modules/**"] })
  .forEach(async (filepath, index) => {
    const fullFilepath = path.join(process.cwd(), filepath);
    let contents = fs.readFileSync(fullFilepath, {
      encoding: "utf-8",
    });
    const title = await getReadmeTitle(contents);
    const workshop = encodeURIComponent(projectTitle);
    const exerciseNumber = (index + 1).toString().padStart(2, "0");
    const exercise = encodeURIComponent(`${exerciseNumber}. ${title}`);
    const link = `https://ws.kcd.im/?ws=${workshop}&e=${exercise}&em=`;
    if (!contents.includes(link)) {
      const feedbackLinkRegex = /https?:\/\/ws\.kcd\.im.*?(\n|$)/;

      if (!feedbackLinkRegex.test(contents)) {
        throw new Error(
          `Exercise "${filepath}" is missing workshop feedback link`,
        );
      }
      contents = contents.replace(feedbackLinkRegex, link);
      contents = prettier.format(contents, { parser: "markdown" });
      fs.writeFileSync(fullFilepath, contents);
    }

    const finals = glob.sync(
      `final/${path.basename(path.dirname(filepath))}*/README.md`,
    );
    for (const final of finals) {
      const currentContents = fs.readFileSync(final, {
        encoding: "utf-8",
      });
      if (currentContents !== contents) {
        fs.writeFileSync(final, contents);
      }
    }
  });
