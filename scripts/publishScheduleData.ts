/*
 * Build-time publish step:
 * emits public/data/schedules.json from already-generated source data.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { trainSchedules } from "../src/data/generated/trainSchedules.generated";
import {
  weekdayFerries,
  weekendFerries,
  weekdayInboundFerries,
  weekendInboundFerries,
} from "../src/data/generated/ferrySchedule.generated";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, "../public/data");
const outputPath = path.resolve(outputDir, "schedules.json");

const payload = {
  generatedAt: new Date().toISOString(),
  trainSchedules,
  ferrySchedules: {
    weekdayFerries,
    weekendFerries,
    weekdayInboundFerries,
    weekendInboundFerries,
  },
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
console.log(`Wrote ${outputPath}`);
