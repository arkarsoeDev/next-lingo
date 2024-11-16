export const getCountryCodeFromPath = (path: string) => {
  const regex = /^\/([a-z]{2})(?=\/|$)/i; // Case-insensitive
  const match = path.match(regex);

  return match ? match[1] : null; // Returns the country code or null if not found
}
