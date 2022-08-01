const { runInDirs } = require("./utils");

const [, , script, ...dirs] = process.argv;
runInDirs(script, dirs);
