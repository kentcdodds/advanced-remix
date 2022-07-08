const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const dirExists = async (dir) =>
  Boolean(await fs.promises.stat(dir).catch(() => false));

const resolvePath = (p) =>
  [...getExerciseDirs(), ...getFinalDirs()].find((dir) => {
    return path.resolve(dir).startsWith(path.resolve(p));
  });

function getExerciseDirs() {
  return fs.readdirSync("./exercise").map((dir) => `./exercise/${dir}`);
}

function getFinalDirs() {
  return fs.readdirSync("./final").map((dir) => `./final/${dir}`);
}

function runInDirs(script, dirs = []) {
  if (!dirs.length) {
    dirs = [...getExerciseDirs(), ...getFinalDirs()];
  }
  console.log(`🏎  "${script}":\n- ${dirs.join("\n- ")}\n`);

  for (const dir of dirs) {
    console.log(`🏎  ${script} in ${dir}`);
    cp.execSync(script, { cwd: dir, stdio: "inherit" });
  }
}

module.exports = {
  getExerciseDirs,
  getFinalDirs,
  runInDirs,
  resolvePath,
  dirExists,
};
