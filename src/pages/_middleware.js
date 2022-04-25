import { NextRequest, NextResponse } from "next/server";
export function middleware(req) {
  console.log("this middleware req", req);
  const someCookie = req.cookies["something"];
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const res = someCookie ? NextResponse.rewrite(`${base}/${someCookie}`) : null;

  return res;
}
