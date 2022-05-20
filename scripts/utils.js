const fs = require("fs");
const cp = require("child_process");

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
    const child = cp.execSync(script, { cwd: dir });
    console.log(child.toString());
  }
}

module.exports = {
  getExerciseDirs,
  getFinalDirs,
  runInDirs,
};
