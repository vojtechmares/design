/** Extracts the inner HTML of the first matching content region. */
export function extractContentRegion(html: string): string {
  const regions: RegExp[] = [
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i,
  ];

  for (const re of regions) {
    const match = html.match(re);
    if (match?.[1]) return match[1];
  }

  return html;
}
