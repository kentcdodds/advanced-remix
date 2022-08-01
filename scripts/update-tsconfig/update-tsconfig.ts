import fs from "fs";
import path from "path";
import prettier from "prettier";
import { getApps, getWorkshopRoot } from "../utils";

async function go() {
  const apps = await getApps();
  const workshopRoot = await getWorkshopRoot();
  const config = {
    files: [],
    exclude: ["node_modules"],
    references: apps.map((a) => ({ path: a.relativePath })),
  };
  await fs.promises.writeFile(
    path.join(workshopRoot, "tsconfig.json"),
    prettier.format(JSON.stringify(config, null, 2), { parser: "json" }),
  );
}

go();
