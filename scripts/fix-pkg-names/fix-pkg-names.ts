import fs from "fs";
import path from "path";
import { getApps } from "../utils";

async function go() {
  for (const app of await getApps()) {
    const { base, dir } = path.parse(app.relativePath);
    const pkgName = `${dir}-${base}`;
    try {
      const pathToPkg = path.join(app.fullPath, "package.json");
      const pkg = require(pathToPkg);
      if (pkg.name === pkgName) continue;
      pkg.name = pkgName;
      fs.writeFileSync(pathToPkg, `${JSON.stringify(pkg, null, 2)}\n`);
    } catch (error) {
      if (error.message?.includes("Cannot find module")) {
        continue;
      }
      throw error;
    }
  }
}

go();
