import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Options from '@/componnets/options';
import { cookies, headers } from 'next/headers';
import { getUserCountry } from '@/actions/getUserCountry';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params
  const headerList = await headers()
  let userLocale = 'en'

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "mm")) {
    notFound();
  }


  // if (locale) {
  //   userLocale = locale
  // } else if (headerList.get('x-user-ip')) {
  //   console.log(headerList.get('x-user-ip'))
  //   let userIp = headerList.get('x-user-ip') || 'en'

  //   let userCountry = await getUserCountry(userIp) || 'en'
  //   userLocale = userCountry.countryCode.toLowerCase()
  // }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Options locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
