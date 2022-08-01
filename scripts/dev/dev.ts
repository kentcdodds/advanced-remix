import cp from "child_process";
import { findApp, promptForApp } from "../utils";
import type { App } from "../utils/utils";
import { readDb, saveDb } from "../utils/utils";

let { 2: search } = process.argv;

async function go() {
  let app: App | undefined;
  if (!search) {
    const { lastDevvedApp } = await readDb();
    app = await promptForApp(lastDevvedApp);
    await saveDb({ lastDevvedApp: app.relativePath });
  } else {
    if (/^\d+$/.test(search)) {
      search = `exercise/${search.padStart(2, "0")}`;
    }

    app = await findApp(search);
  }
  if (!app) {
    console.error(`${process.argv[2]} (${search}) does not exist`);
    return;
  }

  console.log(`🏎  Starting dev for ./${app.relativePath}`);

  cp.spawnSync(`npm run dev -s`, {
    // @ts-expect-error no idea what's up with this, but it works as expected
    cwd: app.fullPath,
    shell: true,
    stdio: "inherit",
    env: { PORT: app.portNumber, ...process.env },
  });
}

go();
