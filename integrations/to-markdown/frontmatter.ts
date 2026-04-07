export function buildFrontmatter(html: string, pathname: string): string {
  const title =
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? '';
  const description =
    html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim() ?? '';
  const canonical =
    html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1]?.trim() ?? '';

  const lines: string[] = [
    `pathname: "${pathname}"`,
    title ? `title: "${title.replace(/"/g, '\\"')}"` : '',
    description ? `description: "${description.replace(/"/g, '\\"')}"` : '',
    canonical ? `canonical: "${canonical}"` : '',
  ].filter(Boolean);

  return lines.join('\n');
}
