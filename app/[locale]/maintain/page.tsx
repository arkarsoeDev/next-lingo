import { useTranslations } from "next-intl";

const MaintainPage = () => {
  const t = useTranslations('HomePage');
  return (
    <div>{t('maintain')}</div>
  )
}

export default MaintainPage
