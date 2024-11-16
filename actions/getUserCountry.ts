'use server'

export const getUserCountry = async (ip: string) => {
  const res = await fetch("http://ip-api.com/json/" + ip)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data;
}
