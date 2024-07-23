const content = {
  message: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple Lambda@Edge Static Content Response</title>
  </head>
  <body>
    <p>Hello from Lambda@Edge!</p>
  </body>
</html>
`,
};

const handler = async (event) => {
  console.log("Initial event:", JSON.stringify(event, null, 2));

  const response = event.Records[0].cf.response;
  console.log("Initial response:", JSON.stringify(response, null, 2));

  const headers = response.headers;
  console.log("Initial headers:", JSON.stringify(headers, null, 2));

  // ... existing header modifications ...

  // Add the response body
  response.body = content.message;
  response.headers["content-type"] = [
    { key: "Content-Type", value: "text/html" },
  ];

  console.log("Final response:", JSON.stringify(response, null, 2));
  return response;
};

export { handler };
