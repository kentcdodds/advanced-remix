const { runInDirs } = require("./utils");

const [, , ...dirs] = process.argv;
runInDirs("npm run build", dirs);
