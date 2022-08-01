import cp from "child_process";
import { findApp, promptForApp, guessNextApp, readDb, saveDb } from "../utils";
import type { App } from "../utils/utils";

let { 2: first, 3: second } = process.argv;

async function go() {
  const prompt = !first && !second;
  let firstApp: App | undefined;
  let secondApp: App | undefined;
  if (prompt) {
    const { lastDiffedApp } = await readDb();
    firstApp = await promptForApp(lastDiffedApp);
    const nextApp = await guessNextApp(firstApp);
    secondApp = await promptForApp(nextApp.relativePath);
    await saveDb({ lastDiffedApp: secondApp.relativePath });
  } else {
    if (/^\d+$/.test(first)) {
      first = `./exercise/${first.padStart(2, "0")}`;
    }

    if (/^\d+$/.test(second)) {
      second = `./final/${second.padStart(2, "0")}`;
    }

    if (!second) {
      second = first.replace("exercise", "final");
    }
    firstApp = await findApp(first);
    secondApp = await findApp(second);
  }

  if (!firstApp) {
    console.error(`${process.argv[2]} (${first}) does not exist`);
    return;
  }
  if (!secondApp) {
    console.error(`${process.argv[3]} (${second}) does not exist`);
    return;
  }

  console.log(
    `Showing diff between ${firstApp.relativePath}/app and ${secondApp.relativePath}/app`
  );

  cp.spawnSync(
    `git diff --no-index ./${firstApp.relativePath}/app ./${secondApp.relativePath}/app`,
    { shell: true, stdio: "inherit" }
  );
}

go();
