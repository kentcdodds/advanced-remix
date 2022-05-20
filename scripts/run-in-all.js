const cp = require("child_process");
const { runInDirs } = require("./utils");

const [, , script, ...dirs] = process.argv;
runInDirs(script, dirs);
