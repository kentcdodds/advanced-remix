const fs = require("fs");
const path = require("path");
const { getExerciseDirs, getFinalDirs } = require("./utils");

for (const dir of [...getExerciseDirs(), ...getFinalDirs()]) {
  const pkgName = `${path.dirname(dir).slice(2)}-${path.basename(dir)}`;
  try {
    const pathToPkg = path.join(__dirname, "..", dir, "package.json");
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
