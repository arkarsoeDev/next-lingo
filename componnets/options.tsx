'use client'

import { redirect, usePathname } from "next/navigation";
import { ChangeEvent } from "react";


const Options = ({ locale }: { locale: string }) => {
  const currentRoute = usePathname()

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRoute = currentRoute.replace(locale, e.target.value)
    redirect(newRoute)
  }

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
