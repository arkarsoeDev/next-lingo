import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Options from '@/components/options';
import { headers } from 'next/headers';
import { ModalProvider } from '@/providers/modal-provider'
import "../globals.css"

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

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "mm")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className='bg-black'>
        <NextIntlClientProvider messages={messages}>
          <Options locale={locale} />
          <ModalProvider />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
