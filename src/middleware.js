import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["es", "en"];
const publicPages = [
  "/",
  "/login",
  "/login/.+",
  "/signup",
  "/recover",
  "/recover/.+",
  "/cart",
  "/contact",
  "/favorites",
  "/shop",
  "/shop/.+",
];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "es",
});

const authMiddleware = withAuth(
  async function onSuccess(req) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    const pathname = req.nextUrl.pathname;
    const role = req.nextauth.token?.user.rol;

    if (pathname.includes("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(url);
    }

    if (pathname.includes("/api/orders/all") && role !== "ADMIN") {
      return NextResponse.redirect(url);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export default async function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
