import { schedule } from "@netlify/functions";

const handlerFn = async () => {
  return {
    statusCode: 200,
    body: "this is a demo cron",
  };
};

export const handler = schedule("* * * * *", handlerFn);
