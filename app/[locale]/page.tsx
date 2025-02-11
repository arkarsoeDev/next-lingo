import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => import('@/components/custom/editor'));

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link className='text-primary' href="/about">{t('about')}</Link>
    </div>
  );
}
