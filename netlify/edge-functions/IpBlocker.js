import ipRangeCheck from "https://dev.jspm.io/ip-range-check";

export default async (req, context) => {
  //const allowList = JSON.parse(process.env.ALLOW_LIST);
  // const allowList=["128.0.0.0/1"];
  // let headers = [];
  // for (var pair of req.headers.entries()) {
  //   headers.push(pair);
  // }
  // console.log(req.headers.get("x-nf-client-connection-ip"));
  // console.log(JSON.stringify(context));

  const ip = req.headers.get("x-forwarded-for");

  if (ipRangeCheck(ip, allowList)) {
    return new Response(`Your ip is ${ip}`);
  } else {
    return new Response(
      `We're sorry, you can't access our content!\n Your req ${JSON.stringify(
        headers
      )}\n your context: ${JSON.stringify(context)}`,
      {
        headers: { "content-type": "text/html" },
        status: 401,
      }
    );
  }
};
