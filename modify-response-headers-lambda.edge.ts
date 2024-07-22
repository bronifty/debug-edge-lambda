const handler = async (event) => {
  console.log("Initial event:", JSON.stringify(event, null, 2));

  const response = event.Records[0].cf.response;
  console.log("Initial response:", JSON.stringify(response, null, 2));

  const headers = response.headers;
  console.log("Initial headers:", JSON.stringify(headers, null, 2));

  // const headerNameSrc = "X-Amz-Meta-Last-Modified";
  // const headerNameDst = "Last-Modified";
  // if (headers[headerNameSrc.toLowerCase()]) {
  //   console.log(`Found header ${headerNameSrc}`);
  //   headers[headerNameDst.toLowerCase()] = [
  //     {
  //       key: headerNameDst,
  //       value: headers[headerNameSrc.toLowerCase()][0].value,
  //     },
  //   ];
  //   console.log(
  //     `Response header "${headerNameDst}" was set to ` +
  //       `"${headers[headerNameDst.toLowerCase()][0].value}"`
  //   );
  // } else {
  //   console.log(`Header ${headerNameSrc} not found`);
  // }
  headers["strict-transport-security"] = [
    {
      key: "Strict-Transport-Security",
      value: "max-age= 63072000; includeSubdomains; preload",
    },
  ];
  headers["content-security-policy"] = [
    {
      key: "Content-Security-Policy",
      value:
        "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'",
    },
  ];
  headers["x-content-type-options"] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
  ];
  headers["x-frame-options"] = [{ key: "X-Frame-Options", value: "DENY" }];
  headers["x-xss-protection"] = [
    { key: "X-XSS-Protection", value: "1; mode=block" },
  ];
  headers["referrer-policy"] = [
    { key: "Referrer-Policy", value: "same-origin" },
  ];

  console.log("Final response:", JSON.stringify(response, null, 2));
  return response;
};

export { handler };
