//import * as ipRangeCheck from "ip-range-check";
import ipRangeCheck from "ip-range-check";

//import { Context } from "netlify:edge";
//import ipRangeCheck from "https://dev.jspm.io/ip-range-check";

export default async (req: Request, context: Context) => {
  //const whitelist = JSON.parse(process.env.WHITE_LIST);
  const whitelist = ["192.168.1.0/24"];
  const ip = "192.168.1.1";
  if (ipRangeCheck(ip, whitelist)) {
    console.lkog("here");
    // const random = Math.random();
    // const random = 0.1;

    // if (random > 0.5) {
    return;
  } else {
    return new Response(`We're sorry, you can't access our content!`, {
      headers: { "content-type": "text/html" },
      status: 401,
    });
  }
};
