import { useEffect, useState } from "react"
import {
    PlusCircle,
    Edit,
    Trash2,
    Calendar,
    Image as ImageIcon,
    Menu,
    X
} from "lucide-react"

import Editor from "../../components/Editor"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"

import { http } from "../../lib/http"
import { TopHeader } from "../../components/TopHeader"
import { Sidebar } from "../../components/SideBar"

export default function PostManager() {
    const [posts, setPosts] = useState([])
    const [editing, setEditing] = useState(false)
    const [currentId, setCurrentId] = useState(null)

    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState("")


    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        img: "",
    })

    /* ================= FETCH ================= */
    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        const res = await http.get("/posts")
        setPosts(res.data)
    }

    /* ================= FORM ================= */
    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            content: "",
            img: "",
        })
        setImageFile(null)
        setImagePreview("")
        setEditing(false)
        setCurrentId(null)
    }

    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            alert("Thiếu tiêu đề hoặc nội dung")
            return
        }

        let imageUrl = form.img

        if (imageFile) {
            const fd = new FormData()
            fd.append("image", imageFile)

            const uploadRes = await http.post(
                "/posts/upload-image",
                fd,
                { headers: { "Content-Type": "multipart/form-data" } }
            )

            imageUrl = uploadRes.data.url
        }

        const payload = { ...form, img: imageUrl }

        if (editing) {
            await http.put(`/posts/${currentId}`, payload)
        } else {
            await http.post("/posts", payload)
        }

        resetForm()
        loadPosts()
    }

    const handleEdit = (p) => {
        setForm({
            title: p.title,
            description: p.description,
            content: p.content,
            img: p.img || "",
        })
        setImagePreview(p.img || "")
        setEditing(true)
        setCurrentId(p._id)
    }

    const handleDelete = async (id) => {
        if (!confirm("Xóa bài viết này?")) return
        await http.delete(`/posts/${id}`)
        loadPosts()
    }

    /* ================= UI ================= */
    return (
        <div className="relative min-h-screen bg-slate-50">
            <TopHeader />
            <Sidebar />

            {/* ===== CONTENT ===== */}
            <div className="px-4 py-10 space-y-10 lg:ml-[220px] lg:px-6">
                {/* ===== LIST ===== */}
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách bài viết</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {posts.length === 0 && (
                            <Alert>
                                <AlertDescription>Chưa có bài viết</AlertDescription>
                            </Alert>
                        )}

                        {posts.map((p) => (
                            <div
                                key={p._id}
                                className="flex items-center justify-between gap-4 rounded-lg border p-4 hover:bg-muted transition"
                            >
                                <div>
                                    <h4 className="font-semibold text-lg">{p.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>

                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleEdit(p)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* ===== FORM ===== */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-red-700" />
                            {editing ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div>
                            <Label>Tiêu đề *</Label>
                            <Input
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <Label>Mô tả ngắn</Label>
                            <Input
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <Label>Nội dung *</Label>
                            <Editor
                                value={form.content}
                                onChange={(v) =>
                                    setForm({ ...form, content: v })
                                }
                            />
                        </div>

                        <div>
                            <Label className="flex items-center gap-2">
                                <ImageIcon className="h-4 w-4" />
                                Ảnh đại diện
                            </Label>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (!file) return
                                    setImageFile(file)
                                    setImagePreview(URL.createObjectURL(file))
                                }}
                            />

                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="mt-3 h-44 rounded-md object-cover border"
                                />
                            )}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <Button
                                className="bg-gradient-to-r from-red-700 to-yellow-600 text-white"
                                onClick={handleSubmit}
                            >
                                {editing ? "Cập nhật" : "Đăng bài"}
                            </Button>

                            {editing && (
                                <Button variant="outline" onClick={resetForm}>
                                    Hủy
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
