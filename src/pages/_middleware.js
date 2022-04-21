import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const someCookie = req.cookies["something"];
  console.log("someCookie");

  const res = NextResponse.rewrite(
    `/something/${someCookie ? someCookie : ""}`
  );

  //  const res = NextResponse.rewrite("/info");

  return res;
}
