import fs from "node:fs";
import path from "node:path";
import { root } from "../utils/root.js";
import { handler } from "../modify-response-headers-lambda.edge.ts";

const eventPath = path.join(
  root,
  "test",
  "cloudfront-modify-response-header.json"
);
const eventData = fs.readFileSync(eventPath, "utf8");
const event = JSON.parse(eventData);

console.log(JSON.stringify(handler(event), null, 2));
