import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getUserCountry } from './actions/getUserCountry';
import { cookies } from 'next/headers';

const handleI18nRouting = createMiddleware(routing);

const customMiddleware = async (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  let response
  const storedLocale = (request.cookies.get('NEXT_LOCALE')?.value || 'false') === 'true'

  if (!storedLocale) {
    const [, locale, ...segments] = request.nextUrl.pathname.split('/');
    response = NextResponse.redirect(`/${'mm'}/${segments.join('/')}`)
  }
}

export async function middleware(request: NextRequest) {
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value || false
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');
  const cookieStore = await cookies()

  const maintain = true

  console.log(storedLocale)

  if (!storedLocale) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    let userCountry = await getUserCountry(ip)
    let localeCode = userCountry.countryCode.toLowerCase()
    console.log('passing here')


    cookieStore.set('NEXT_LOCALE', localeCode)
    const response = maintain ?
      NextResponse.redirect(new URL(`/${localeCode}/${segments.join('/')}`, request.url)) :
      NextResponse.redirect(new URL(`/${localeCode}/maintain`, request.url))
    return response
  }

  if (maintain) {
    return NextResponse.redirect(new URL(`/${locale}/maintain`, request.url))
  }

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mm|en)/:path*']
};
