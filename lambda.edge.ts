const handler = async (event) => {
  console.log("Initial event:", JSON.stringify(event, null, 2));

  const response = event.Records[0].cf.response;
  console.log("Initial response:", JSON.stringify(response, null, 2));

  const headers = response.headers;
  console.log("Initial headers:", JSON.stringify(headers, null, 2));

  const headerNameSrc = "X-Amz-Meta-Last-Modified";
  const headerNameDst = "Last-Modified";

  if (headers[headerNameSrc.toLowerCase()]) {
    console.log(`Found header ${headerNameSrc}`);
    headers[headerNameDst.toLowerCase()] = [
      {
        key: headerNameDst,
        value: headers[headerNameSrc.toLowerCase()][0].value,
      },
    ];
    console.log(
      `Response header "${headerNameDst}" was set to ` +
        `"${headers[headerNameDst.toLowerCase()][0].value}"`
    );
  } else {
    console.log(`Header ${headerNameSrc} not found`);
  }

  console.log("Final response:", JSON.stringify(response, null, 2));
  return response;
};

export { handler };
