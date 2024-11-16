function getCountryCodeFromUrl(url: string) {
  const regex = /^\/([a-z]{2})(?=\/|$)/i; // Case-insensitive with 'i' flag
  const path = new URL(url).pathname; // Extracts the path from the full URL
  const match = path.match(regex);

  return match ? match[1] : null; // Returns the country code or null if not found
}
