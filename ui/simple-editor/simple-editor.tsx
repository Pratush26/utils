"use client"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { EditorContent, EditorContext, useEditor, type JSONContent } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"

// Renamed to avoid clashing with the `content` prop below.
import defaultContent from "@/components/tiptap-templates/simple/data/content.json"

const MainToolbarContent = ({
  onLinkClick,
  isMobile,
}: {
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4, 5, 6]} />
        <ListDropdownMenu
          modal={false}
          types={["bulletList", "orderedList", "taskList"]}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <Spacer />
    </>
  )
}

const MobileToolbarContent = ({ onBack }: { onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        <LinkIcon className="tiptap-button-icon" />
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    <LinkContent />
  </>
)

export interface SimpleEditorHandle {
  getHTML: () => string
  getJSON: () => JSONContent
  getText: () => string
  isEmpty: () => boolean
  clear: () => void
  setContent: (content: string | JSONContent) => void
  focus: () => void
}

export interface SimpleEditorProps {
  /** Initial content (HTML string or Tiptap JSON). Falls back to the template's sample content.json if omitted. */
  content?: string | JSONContent
  /** Fires on every content change with the current HTML. Use for react-hook-form's Controller, or your own state. */
  onChange?: (html: string) => void
  /** Set to false to render read-only (e.g. previewing a submitted form). */
  editable?: boolean
}

export const SimpleEditor = forwardRef<SimpleEditorHandle, SimpleEditorProps>(
  ({ content, onChange, editable = true }, ref) => {
    const isMobile = useIsBreakpoint()
    const { height } = useWindowSize()
    const [mobileView, setMobileView] = useState<"main" | "link">("main")
    const toolbarRef = useRef<HTMLDivElement>(null)

    const editor = useEditor({
      immediatelyRender: false,
      editable,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "simple-editor",
        },
      },
      extensions: [
        StarterKit.configure({
          horizontalRule: false,
          link: {
            openOnClick: false,
            enableClickSelection: true,
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
      content: content ?? defaultContent,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
    })

    // Keep the editor's editable state in sync if the prop changes after mount.
    useEffect(() => {
      if (editor && editor.isEditable !== editable) {
        editor.setEditable(editable)
      }
    }, [editable, editor])

    useImperativeHandle(
      ref,
      () => ({
        getHTML: () => editor?.getHTML() ?? "",
        getJSON: () => editor?.getJSON() ?? {},
        getText: () => editor?.getText() ?? "",
        isEmpty: () => editor?.isEmpty ?? true,
        clear: () => editor?.commands.clearContent(true),
        setContent: (newContent) =>
          editor?.commands.setContent(newContent, { emitUpdate: false }),
        focus: () => editor?.commands.focus(),
      }),
      [editor]
    )

    const rect = useCursorVisibility({
      editor,
      overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
    })

    useEffect(() => {
      if (!isMobile && mobileView !== "main") {
        setMobileView("main")
      }
    }, [isMobile, mobileView])

    return (
      <div className="simple-editor-wrapper w-full max-w-full overflow-hidden rounded-md border">
        <EditorContext.Provider value={{ editor }}>
          {editable && (
            <div className="w-full overflow-x-auto overscroll-x-contain">
              <Toolbar
                ref={toolbarRef}
                className="flex-nowrap"
                style={{
                  width: "max-content",
                  minWidth: "100%",
                  ...(isMobile
                    ? {
                        bottom: `calc(100% - ${height - rect.y}px)`,
                      }
                    : {}),
                }}
              >
                {mobileView === "main" ? (
                  <MainToolbarContent
                    onLinkClick={() => setMobileView("link")}
                    isMobile={isMobile}
                  />
                ) : (
                  <MobileToolbarContent onBack={() => setMobileView("main")} />
                )}
              </Toolbar>
            </div>
          )}

          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content w-full max-w-full"
          />
        </EditorContext.Provider>
      </div>
    )
  }
)

SimpleEditor.displayName = "SimpleEditor"