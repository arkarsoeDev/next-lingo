'use client'

import { getCountryCodeFromPath } from "@/util";
import { redirect, usePathname } from "next/navigation";
import { ChangeEvent, useEffect } from "react";


const Options = ({ locale }: { locale: string }) => {
  const currentRoute = usePathname()

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    const newRoute = currentRoute.replace(locale, e.target.value)
    console.log(newRoute)
    redirect(newRoute)
  }

  // useEffect(() => {
  //   const countryCode = getCountryCodeFromPath(currentRoute) || 'en'

  //   if (countryCode !== locale) {
  //     const newRoute = currentRoute.replace(countryCode, locale)
  //     redirect(newRoute)
  //   }
  // }, [])

  return (
    <>
      <p>{currentRoute}, current locales is {locale}</p>
      <select value={locale} onChange={handleOnChange} name="" id="">
        <option value="en" >English</option>
        <option value="mm" >mm</option>
      </select>
    </>
  )
}

export default Options
