const path = require("path");
const fs = require("fs");
const glob = require("glob");

const pkg = require(path.join(process.cwd(), "package.json"));
const { title: projectTitle } = pkg;

glob
  .sync("+(exercise|final)/**/README.md", { ignore: ["**/node_modules/**"] })
  .forEach((filepath, index) => {
    const fullFilepath = path.join(process.cwd(), filepath);
    const contents = fs.readFileSync(fullFilepath, {
      encoding: "utf-8",
    });
    const firstLine = contents.split("\n")[0];
    const titleMatch = firstLine.match(/# (?<title>.*)$/);
    if (!titleMatch) {
      throw new Error(`Title is invalid for "${filepath}"`);
    }
    const title = titleMatch.groups.title.trim();
    const workshop = encodeURIComponent(projectTitle);
    const exercise = encodeURIComponent(`${index + 1}: ${title}`);
    const link = `https://ws.kcd.im/?ws=${workshop}&e=${exercise}&em=`;
    if (contents.includes(link)) {
      return;
    }

    const feedbackLinkRegex = /https?:\/\/ws\.kcd\.im.*?\n/;

    if (!feedbackLinkRegex.test(contents)) {
      throw new Error(
        `Exercise "${filepath}" is missing workshop feedback link`
      );
    }
    const newContents = contents.replace(feedbackLinkRegex, link);
    fs.writeFileSync(fullFilepath, newContents);
  });
