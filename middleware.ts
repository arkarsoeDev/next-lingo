import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getUserCountry } from './actions/getUserCountry';

const handleI18nRouting = createMiddleware(routing);

const customMiddleware = async (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  const storedLocale = (request.cookies.get('NEXT_LOCALE')?.value || 'false') === 'true'
  // response.headers.set('x-user-ip', ip)

  // if (!storedLocale) {
  let userCountry = await getUserCountry(ip)
  let localeCode = userCountry.countryCode.toLowerCase()
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');
  request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;
  request.cookies.set('NEXT_LOCALE', localeCode)
  // }

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
