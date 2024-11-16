import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getUserCountry } from './actions/getUserCountry';

const handleI18nRouting = createMiddleware(routing);

const customMiddleware = async (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  let userCountry = await getUserCountry(ip) || 'en'
  let localeCode = userCountry.countryCode.toLowerCase()
  const storedLocale = (request.cookies.get('NEXT_LOCALE')?.value || 'false') === 'true'
  // response.headers.set('x-user-ip', ip)

  const [, locale, ...segments] = request.nextUrl.pathname.split('/');

  if (!storedLocale) {
    request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;
  }

  return request
}

export async function middleware(request: NextRequest) {
  const newRequest = await customMiddleware(request)
  const response = handleI18nRouting(newRequest);

  // A `response` can now be passed here
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mm|en)/:path*']
};
