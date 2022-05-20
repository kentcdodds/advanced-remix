const fs = require("fs/promises");
const path = require("path");
const cp = require("child_process");
const { getExerciseDirs, getFinalDirs } = require("./scripts/utils");

let { 2: first, 3: second } = process.argv;

const dirExists = async (dir) => Boolean(await fs.stat(dir).catch(() => false));
const resolvePath = (p) =>
  [...getExerciseDirs(), ...getFinalDirs()].find((dir) =>
    path.resolve(dir).startsWith(path.resolve(p))
  );

async function go() {
  first = resolvePath(first);
  if (!(await dirExists(first))) {
    console.log(`${first} does not exist`);
    return;
  }
  second = resolvePath(second);
  if (!(await dirExists(second))) {
    console.log(`${second} does not exist`);
    return;
  }

  cp.spawnSync(`git diff --no-index ./${first}/app ./${second}/app`, {
    shell: true,
    stdio: "inherit",
  });
}

go();
