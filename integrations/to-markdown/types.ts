export interface ToMarkdownOptions {
  /** Explicit list of page slugs to convert, e.g. ['design-system'] */
  pages: string[];
  /** Optional post-processing transform */
  transform?: (md: string, pathname: string) => string;
}
