import { readFileSync, writeFileSync } from "fs";

const extra = JSON.parse(readFileSync("data/companies/extra_unique_candidates.json", "utf8"));
const truly = JSON.parse(readFileSync("data/companies/truly_missing_list_2.json", "utf8"));

const pool = [
  ...truly.map(c => c.name),
  ...extra.map(c => c.name)
];

console.log(`Loaded ${pool.length} candidate names.`);

const batches = {
  "317": pool.slice(0, 25),
  "318": pool.slice(25, 50),
  "319": pool.slice(50, 75),
  "320": pool.slice(75, 100),
  "321": pool.slice(100, 125)
};

writeFileSync("data/companies/candidate_batches_317_321.json", JSON.stringify(batches, null, 2), "utf8");
console.log("Successfully generated candidate_batches_317_321.json");
for (const [batch, list] of Object.entries(batches)) {
  console.log(`Batch ${batch} count: ${list.length}`);
}
