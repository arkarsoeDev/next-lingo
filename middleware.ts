import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getUserCountry } from './actions/getUserCountry';
import { cookies } from 'next/headers';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value || false
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');
  const cookieStore = await cookies()

  const maintain = true

  if (!storedLocale) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    let userCountry = await getUserCountry(ip)
    let localeCode = userCountry.countryCode.toLowerCase() || 'en'

    let redirectUrl: URL = new URL(`/${localeCode}/${segments.join('/')}`, request.url)

    if (maintain) {
      if (new URL(`/${localeCode}/maintain`, request.url).pathname !== request.nextUrl.pathname) {
        redirectUrl = new URL(`/${localeCode}/maintain`, request.url)
      }
    } else if (request.nextUrl.pathname === `/${storedLocale}/maintain`) {
      return NextResponse.redirect(new URL(`/${storedLocale}`, request.url))
    }

    cookieStore.set('NEXT_LOCALE', localeCode)
    const response = NextResponse.redirect(redirectUrl)
    return response
  }

  if (maintain) {
    if (new URL(`/${storedLocale}/maintain`, request.url).pathname !== request.nextUrl.pathname) {
      return NextResponse.redirect(new URL(`/${storedLocale}/maintain`, request.url))
    }
  } else if (request.nextUrl.pathname === `/${storedLocale}/maintain`) {
    return NextResponse.redirect(new URL(`/${storedLocale}`, request.url))
  }

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mm|en)/:path*']
};
