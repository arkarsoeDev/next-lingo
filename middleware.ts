import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const customMiddleware = async (request: NextRequest, response: NextResponse) => {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  response.headers.set('x-user-ip', ip)

  return response
}

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  // A `response` can now be passed here
  return await customMiddleware(request, response);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en)/:path*']
};
