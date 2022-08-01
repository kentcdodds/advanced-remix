const path = require("path");
const fs = require("fs");
const { getApps } = require("./utils");

async function go() {
  for (const app of await getApps()) {
    const nodeModulesDir = path.join(app.relativePath, "node_modules");
    const pkgLock = path.join(nodeModulesDir, "package-lock.json");
    console.log(`💥 deleting ${nodeModulesDir} and lockfile`);
    await fs.promises.rm(nodeModulesDir, { recursive: true }).catch(() => {});
    await fs.promises.rm(pkgLock).catch(() => {});
  }
}

go();
