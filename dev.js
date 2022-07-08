const fs = require("fs/promises");
const cp = require("child_process");
const path = require("path");
const {
  getExerciseDirs,
  getFinalDirs,
  resolvePath,
  dirExists,
} = require("./scripts/utils");

let { 2: appDir } = process.argv;

if (/\d+/.test(appDir)) {
  appDir = `./exercise/${appDir.padStart(2, "0")}`;
}

async function go() {
  appDir = resolvePath(appDir);
  // warn if the directory deosn't exist
  const stat = await fs.stat(appDir).catch(() => false);
  if (!(await dirExists(appDir))) {
    console.log(`${appDir} does not exist`);
    return;
  }

  const [_dot, category, numberName] = appDir.split("/");
  const [number] = numberName.split("-");
  const PORT =
    {
      exercise: 4000,
      final: 5000,
    }[category] + Number(number);

  cp.spawn(`npm run dev -s`, {
    cwd: appDir,
    shell: true,
    stdio: "inherit",
    env: { PORT, ...process.env },
  });
}

go();
