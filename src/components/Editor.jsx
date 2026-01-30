import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { Button } from "./ui/button"
import { ImagePlus, Bold, Italic, Link2 } from "lucide-react"
import { http } from "../lib/http"
import { useRef } from "react"

export default function Editor({ value, onChange }) {
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append("image", file)
    try {
      const res = await http.post(
        "/posts/upload-editor-image",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      editor.chain().focus().setImage({ src: res.data.url }).run()

    } catch (error) {
      alert("Thêm ảnh không thành công !")
    }

  }

  return (
    <div className="border rounded-md bg-white">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => {
            const url = prompt("Nhập link")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          <Link2 className="h-4 w-4" />
        </Button>

        {/* IMAGE UPLOAD */}
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) uploadImage(file)
            e.target.value = ""
          }}
        />
      </div>

      {/* CONTENT */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 prose max-w-none focus:outline-none"
      />
    </div>
  )
}
