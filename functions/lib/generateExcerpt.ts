/**
 * Generates a plain-text excerpt from markdown-style blog content.
 * Strips headers, bullets, numbered lists, tables, bold markers, etc.
 * and truncates to a max length, breaking at a word boundary.
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  const lines = content.split("\n");
  const plainLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") continue;

    // Skip table rows and separators entirely (not useful as prose)
    if (line.startsWith("|") && line.endsWith("|")) continue;

    let text = line;

    // Strip heading markers: #, ##, ### ...
    text = text.replace(/^#{1,6}\s+/, "");

    // Strip bullet markers: -, *, +
    text = text.replace(/^[-*+]\s+/, "");

    // Strip ordered list markers: 1. 2. etc.
    text = text.replace(/^\d+\.\s+/, "");

    // Strip bold/italic markers **text**, *text*, __text__, _text_
    text = text.replace(/\*\*(.*?)\*\*/g, "$1");
    text = text.replace(/__(.*?)__/g, "$1");
    text = text.replace(/\*(.*?)\*/g, "$1");
    text = text.replace(/_(.*?)_/g, "$1");

    // Strip inline code `code`
    text = text.replace(/`([^`]*)`/g, "$1");

    // Strip markdown links [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    text = text.trim();
    if (text.length > 0) {
      plainLines.push(text);
    }
  }

  const combined = plainLines.join(" ").replace(/\s+/g, " ").trim();

  if (combined.length <= maxLength) {
    return combined;
  }

  // Truncate at the last full word within maxLength
  const truncated = combined.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeTruncated = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return safeTruncated.trim() + "...";
}