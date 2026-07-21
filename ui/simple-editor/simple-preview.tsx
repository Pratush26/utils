// components/tiptap-templates/simple/content-preview.tsx
"use client"

import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions (same set as SimpleEditor, so rendering matches exactly) ---
import { StarterKit } from "@tiptap/starter-kit"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// NOTE: simple-editor.scss is intentionally NOT imported here —
// that file styles the editor "box" (border, focus ring, caret,
// min-height, toolbar layout). We don't want any of that in a preview.
import "@/components/tiptap-templates/simple/content-preview.scss"

export interface ContentPreviewProps {
  /** HTML string or Tiptap JSON to render, read-only. */
  content: string | JSONContentLike
  className?: string
}

// Loosely typed so we don't have to import JSONContent just for this prop.
type JSONContentLike = Record<string, unknown>

export function ContentPreview({ content, className }: ContentPreviewProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class: "content-preview-body",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: false,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content,
  })

  if (!editor) return null

  return (
    <div className={`content-preview-wrapper ${className ?? ""}`}>
      <EditorContext.Provider value={{ editor }}>
        <EditorContent editor={editor} role="presentation" />
      </EditorContext.Provider>
    </div>
  )
}