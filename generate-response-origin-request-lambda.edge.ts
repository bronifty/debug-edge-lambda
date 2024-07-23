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

  // Check if it's a request or response event
  const { request, response } = event.Records[0].cf;

  let newResponse;

  if (response) {
    // It's a response event, modify the existing response
    newResponse = response;
  } else {
    // It's a request event, create a new response
    newResponse = {
      status: "200",
      statusDescription: "OK",
      headers: {},
    };
  }

  // Set the response body and headers
  newResponse.body = content.message;
  newResponse.headers["content-type"] = [
    {
      key: "Content-Type",
      value: "text/html",
    },
  ];

  console.log("Final response:", JSON.stringify(newResponse, null, 2));
  return newResponse;
};

export { handler };
