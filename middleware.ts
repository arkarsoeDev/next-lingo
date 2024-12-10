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
  // response.headers.set('x-user-ip', ip)

  if (!storedLocale) {
    // let userCountry = await getUserCountry(ip)
    // let localeCode = userCountry.countryCode.toLowerCase()
    const [, locale, ...segments] = request.nextUrl.pathname.split('/');
    // request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;
    response = NextResponse.redirect(`/${'mm'}/${segments.join('/')}`)
    // request.cookies.set('NEXT_LOCALE', localeCode)
  }
}

export async function middleware(request: NextRequest) {
  // request.cookies.delete('NEXT_LOCALE')
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value || false
  const cookieStore = await cookies()
  // response.headers.set('x-user-ip', ip)

  console.log(storedLocale)

  if (!storedLocale) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    // let userCountry = await getUserCountry(ip)
    let localeCode = 'tetin'
    // request.nextUrl.pathname = `/${localeCode}/${segments.join('/')}`;
    // request.cookies.set('NEXT_LOCALE', localeCode)
    // return NextResponse.rewrite(new URL(`/${'mm'}/${segments.join('/')}`, request.url))
    console.log('passing here')

    const [, locale, ...segments] = request.nextUrl.pathname.split('/');
    // request.cookies.set('NEXT_LOCALE', 'mm')
    cookieStore.set('NEXT_LOCALE', localeCode)
    const response = NextResponse.redirect(new URL(`/${localeCode}/${segments.join('/')}`, request.url))
    return response
  }

  // return NextResponse.rewrite(new URL(`/${'mm'}/${segments.join('/')}`, request.url))
  const response = handleI18nRouting(request);
  console.log('this is working')
  // console.log(response)
  // A `response` can now be passed here
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mm|en)/:path*']
};
