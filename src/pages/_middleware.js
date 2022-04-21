import { NextRequest, NextResponse } from "next/server";
export function middleware(req) {
  const someCookie = req.cookies["something"];
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  console.log(someCookie);
  const res = someCookie ? NextResponse.rewrite(`${base}/${someCookie}`) : null;

  return res;
}
