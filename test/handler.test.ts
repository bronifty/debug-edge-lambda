import fs from "node:fs";
import path from "node:path";
import { root } from "../utils/root.js";
import { handler as modifyResponseHeadersHandler } from "../modify-response-headers-lambda.edge.ts";
import { handler as generateResponseOriginRequestHandler } from "../generate-response-origin-request-lambda.edge.ts";
import { handler as hybridHandler } from "../hybrid-lambda.edge.ts";

const eventPath = path.join(
  root,
  "test",
  "cloudfront-modify-response-header.json"
);
const eventData = fs.readFileSync(eventPath, "utf8");
const event = JSON.parse(eventData);

// console.log(JSON.stringify(modifyResponseHeadersHandler(event), null, 2));
// console.log(
//   JSON.stringify(generateResponseOriginRequestHandler(event), null, 2)
// );
console.log(JSON.stringify(hybridHandler(event), null, 2));
