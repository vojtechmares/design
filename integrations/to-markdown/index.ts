import type { AstroIntegration } from 'astro';
import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import type { ToMarkdownOptions } from './types.js';
import { extractContentRegion } from './html.js';
import { buildFrontmatter } from './frontmatter.js';

export type { ToMarkdownOptions };

export function toMarkdown(options: ToMarkdownOptions): AstroIntegration {
  const { pages, transform } = options;

  return {
    name: 'to-markdown',

    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const td = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced',
          bulletListMarker: '-',
          hr: '---',
        });

        td.use(gfm);

        td.addRule('strip-chrome', {
          filter: ['nav', 'footer', 'aside', 'script', 'style', 'noscript'],
          replacement: () => '',
        });

        td.addRule('strip-svg', {
          filter: (node) => node.nodeName === 'svg' || node.nodeName === 'SVG',
          replacement: () => '',
        });

        td.addRule('fenced-code-lang', {
          filter: (node) =>
            node.nodeName === 'PRE' && node.firstChild?.nodeName === 'CODE',
          replacement: (_content, node) => {
            const code = node.firstChild as Element;
            const lang =
              code.getAttribute('class')?.match(/language-(\S+)/)?.[1] ?? '';
            return `\`\`\`${lang}\n${code.textContent?.trim()}\n\`\`\`\n\n`;
          },
        });

        const distDir = fileURLToPath(dir);
        let converted = 0;

        for (const slug of pages) {
          const htmlPath = join(distDir, slug, 'index.html');

          try {
            await access(htmlPath);
          } catch {
            logger.warn(`No HTML at ${htmlPath}`);
            continue;
          }

          const html = await readFile(htmlPath, 'utf-8');
          const region = extractContentRegion(html);
          let markdown = td.turndown(region);

          if (transform) {
            markdown = transform(markdown, slug);
          }

          const frontmatter = buildFrontmatter(html, '/' + slug + '/');

          const output = `---\n${frontmatter}\n---\n\n${markdown}\n`;
          const mdPath = join(distDir, slug + '.md');
          await writeFile(mdPath, output, 'utf-8');
          converted++;
        }

        logger.info(`Emitted ${converted} Markdown file(s)`);
      },
    },
  };
}
