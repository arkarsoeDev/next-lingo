import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getUserCountry } from './actions/getUserCountry';

const handleI18nRouting = createMiddleware(routing);

const customMiddleware = async (request: NextRequest, response: NextResponse) => {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  let userCountry = await getUserCountry(ip)
  let localeCode = userCountry.countryCode.toLowerCase()
  const storedLocale = (request.cookies.get('NEXT_LOCALE')?.value || 'false') === 'true'
  // response.headers.set('x-user-ip', ip)

  // if (!storedLocale) {

  // const [, locale, ...segments] = request.nextUrl.pathname.split('/');
  // request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;
  // request.cookies.set('NEXT_LOCALE', localeCode)
  // }


  if (!storedLocale) {
    const [, locale, ...segments] = request.nextUrl.pathname.split('/');
    request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;

    response = NextResponse.rewrite(request.nextUrl);
    response.cookies.set('NEXT_LOCALE', localeCode);
  }

  return response
}

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return customMiddleware(request, response)

  // A `response` can now be passed here
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mm|en)/:path*']
};
