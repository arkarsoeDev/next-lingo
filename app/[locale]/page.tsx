import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import dynamic from 'next/dynamic';
import image from '@/public/princess.jpeg'
import Image from 'next/image';

const CustomEditor = dynamic(() => import('@/components/custom/editor'));

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <div className='w-[200px] h-[200px] bg-black'>
        <CustomEditor />
      </div>
      <Image src={image} alt="Picture of the author" className='w-[300px] h-[300px]' />
      <Image
        src={image}
        alt="Picture of the author"
        // sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={500}
        height={300}
      />
      <Image
        fill
        alt='test'
        src={image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}
