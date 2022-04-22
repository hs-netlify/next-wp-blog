import ipRangeCheck from "https://dev.jspm.io/ip-range-check";

export default async (req, context) => {
  //const whitelist = JSON.parse(process.env.WHITE_LIST);
  const whitelist = ["128.0.0.0/1"];
  let headers = [];
  for (var pair of req.headers.entries()) {
    headers.push(pair);
  }

  console.log(headers);

  const ip = req.headers.get("x-forwarded-for");

  if (ipRangeCheck(ip, whitelist)) {
    return new Response(`Your ip is ${ip}`);
  } else {
    return new Response(
      `We're sorry, you can't access our content! - Your req ${JSON.stringify(
        headers
      )}`,
      {
        headers: { "content-type": "text/html" },
        status: 401,
      }
    );
  }
};
