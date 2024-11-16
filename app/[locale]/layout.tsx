import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Options from '@/componnets/options';
import { headers } from 'next/headers';

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
  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  if (headerList.get('x-user-ip')) {
    console.log(headerList.get('x-user-ip'))
    userLocale = headerList.get('x-user-ip') || 'en'
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={userLocale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Options locale={userLocale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
