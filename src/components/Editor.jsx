import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function Editor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="rounded-md border bg-white">
      <div className="flex gap-2 border-b p-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}>B</button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}>I</button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}>•</button>
      </div>

      <EditorContent editor={editor} className="min-h-[200px] p-3" />
    </div>
  )
}

const btn = (active) =>
  `px-2 py-1 rounded text-sm ${
    active ? "bg-red-700 text-white" : "bg-muted"
  }`
