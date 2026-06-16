import React from "react";

interface BlogContentProps {
  content: string;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .map((cell) => cell.trim())
    .filter((_, i, arr) => i !== 0 && i !== arr.length - 1); // strip leading/trailing empty splits
}

/** Returns true if the line is a markdown separator row like |---|---| */
function isTableSeparator(line: string): boolean {
  return /^\|[\s\-|:]+\|$/.test(line.trim());
}

/** Returns true if the line looks like a markdown table row */
function isTableRow(line: string): boolean {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

export function BlogContent({ content }: BlogContentProps) {
  const lines = content.split("\n");

  type Block =
    | { type: "title"; text: string }
    | { type: "subtitle"; text: string }
    | { type: "bullet"; items: string[] }
    | { type: "ordered"; items: string[] }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "plain"; text: string }
    | { type: "spacer" };

  const blocks: Block[] = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    if (line.startsWith("# ")) {
      blocks.push({ type: "title", text: line.slice(2).trim() });
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "subtitle", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      const text = line.slice(2).trim();
      const last = blocks[blocks.length - 1];
      if (last?.type === "bullet") {
        last.items.push(text);
      } else {
        blocks.push({ type: "bullet", items: [text] });
      }
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "").trim();
      const last = blocks[blocks.length - 1];
      if (last?.type === "ordered") {
        last.items.push(text);
      } else {
        blocks.push({ type: "ordered", items: [text] });
      }
    } else if (isTableRow(line)) {
      // Peek ahead: if next line is a separator, this is a header row
      const nextLine = lines[idx + 1] ?? "";
      if (isTableSeparator(nextLine)) {
        // This is a table header — collect all following data rows
        const headers = parseTableRow(line);
        idx += 2; // skip separator line
        const rows: string[][] = [];
        while (idx < lines.length && isTableRow(lines[idx])) {
          rows.push(parseTableRow(lines[idx]));
          idx++;
        }
        idx--; // back up so the for-loop increment lands correctly
        blocks.push({ type: "table", headers, rows });
      } else if (isTableSeparator(line)) {
        // lone separator — skip
      } else {
        // table row without a header above it — treat as plain
        blocks.push({ type: "plain", text: line.trim() });
      }
    } else if (line.trim() === "") {
      blocks.push({ type: "spacer" });
    } else {
      blocks.push({ type: "plain", text: line.trim() });
    }
  }

  return (
    <article className="w-11/12 md:w-full mx-auto py-8 space-y-3 text-base leading-relaxed text-muted-foreground font-sans">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "title":
            return (
              <h1
                key={i}
                className="text-3xl font-bold tracking-tight text-foreground mt-2 mb-1"
              >
                {block.text}
              </h1>
            );

          case "subtitle":
            return (
              <h2
                key={i}
                className="text-xl font-semibold text-foreground border-b border-border pb-1 mt-6"
              >
                {block.text}
              </h2>
            );

          case "bullet":
            return (
              <ul key={i} className="list-disc list-inside space-y-1 pl-2">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );

          case "ordered":
            return (
              <ol key={i} className="list-decimal list-inside space-y-1 pl-2">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      {block.headers.map((header, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 font-semibold border-b border-border whitespace-nowrap"
                        >
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr
                        key={j}
                        className={j % 2 === 0 ? "bg-background" : "bg-muted/40"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="px-4 py-3 border-b border-border last:border-b-0 text-foreground"
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "plain":
            return <p key={i}>{renderInline(block.text)}</p>;

          case "spacer":
            return <div key={i} className="h-2" />;

          default:
            return null;
        }
      })}
    </article>
  );
}

export default BlogContent;