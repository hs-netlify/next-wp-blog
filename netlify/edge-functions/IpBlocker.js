import ipRangeCheck from "https://dev.jspm.io/ip-range-check";

export default async (req, context) => {
  //const whitelist = JSON.parse(process.env.WHITE_LIST);
  const whitelist = ["128.0.0.0/1"];
  const ip = req.headers.get("x-forwarded-for");
  console.log(ip);
  // const ip = "192.168.1.1";
  if (ipRangeCheck(ip, whitelist)) {
    console.log("here");
    // const random = Math.random();
    // const random = 0.1;

    // if (random > 0.5) {
    return new Response(`Your ip is ${ip}`);
  } else {
    return new Response(
      `We're sorry, you can't access our content! - Your req ${JSON.stringify(
        req
      )}`,
      {
        headers: { "content-type": "text/html" },
        status: 401,
      }
    );
  }
};
