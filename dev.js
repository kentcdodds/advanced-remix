const fs = require("fs/promises");
const cp = require("child_process");
const path = require("path");
const { getExerciseDirs, getFinalDirs } = require("./scripts/utils");

let { 2: appDir } = process.argv;

const resolvePath = (p) =>
  [...getExerciseDirs(), ...getFinalDirs()].find((dir) =>
    path.resolve(dir).startsWith(path.resolve(p))
  );

async function go() {
  appDir = resolvePath(appDir);
  // warn if the directory deosn't exist
  const stat = await fs.stat(appDir).catch(() => false);
  if (!stat) {
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
