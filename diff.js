const fs = require("fs/promises");
const path = require("path");
const cp = require("child_process");
const {
  getExerciseDirs,
  getFinalDirs,
  resolvePath,
  dirExists,
} = require("./scripts/utils");

let { 2: first, 3: second } = process.argv;

if (/\d+/.test(first)) {
  first = `./exercise/${first.padStart(2, "0")}`;
}

if (/\d+/.test(second)) {
  second = `./final/${second.padStart(2, "0")}`;
}

if (!second) {
  second = first.replace("exercise", "final");
}

async function go() {
  first = resolvePath(first);
  if (!(await dirExists(first))) {
    console.log(`${process.argve[2]} (${first}) does not exist`);
    return;
  }
  second = resolvePath(second);
  if (!(await dirExists(second))) {
    console.log(`${process.argv[3]} (${second}) does not exist`);
    return;
  }

  cp.spawnSync(`git diff --no-index ./${first}/app ./${second}/app`, {
    shell: true,
    stdio: "inherit",
  });
}

go();
