import React from "react";

interface BlogCardContentProps {
  content: string;
}

/**
 * Strips all markdown syntax and returns plain text only.
 * Removes: # headers, ## subheaders, - bullets, 1. numbered lists, tables, **bold**, and extra whitespace.
 */
function stripMarkdownToPlainText(markdown: string): string {
  let text = markdown;

  // Remove code blocks (``` ... ```)
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code (`...`)
  text = text.replace(/`([^`]+)`/g, "$1");

  // Remove bold markers (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, "$1");

  // Remove italic markers (*text*)
  text = text.replace(/\*(.*?)\*/g, "$1");

  // Remove markdown links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove images ![alt](url)
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");

  // Remove headers (# ## ### etc.)
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Remove bullet points (- or *)
  text = text.replace(/^[\-\*]\s+/gm, "");

  // Remove numbered lists (1. 2. etc.)
  text = text.replace(/^\d+\.\s+/gm, "");

  // Remove table formatting (| pipes and separators)
  text = text.replace(/^\|.*\|$/gm, ""); // table rows
  text = text.replace(/^\|[\s\-:|]+\|$/gm, ""); // separators

  // Remove horizontal rules (---, ***)
  text = text.replace(/^[\-\*]{3,}\s*$/gm, "");

  // Remove extra whitespace lines (multiple newlines)
  text = text.replace(/\n\s*\n/g, "\n\n");

  // Trim leading/trailing whitespace
  text = text.trim();

  return text;
}

/**
 * Extracts a plain text excerpt (first ~300-400 characters) for card preview.
 */
function getPlainTextExcerpt(markdown: string, maxLength: number = 350): string {
  const plainText = stripMarkdownToPlainText(markdown);
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Cut at last space within maxLength
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }
  
  return truncated + "...";
}

export function BlogCardContent({ content }: BlogCardContentProps) {
  const excerpt = getPlainTextExcerpt(content);

  return (
    <p className="text-sm text-muted-foreground line-clamp-3">
      {excerpt}
    </p>
  );
}

export default BlogCardContent;