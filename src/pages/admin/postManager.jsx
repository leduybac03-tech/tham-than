import { useEffect, useState } from "react"
import {
    FileText,
    PlusCircle,
    Edit,
    Trash2,
    Calendar,
} from "lucide-react"
import Editor from "../../components/Editor"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { http } from "../../lib/http"
import { TopHeader } from "../../components/TopHeader.jsx"
import { Sidebar } from "../../components/SideBar.jsx"

export default function PostManager() {
    const [posts, setPosts] = useState([])
    const [editing, setEditing] = useState(false)
    const [currentId, setCurrentId] = useState(null)

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        img: "",
    })

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        const res = await http.get("/posts")
        setPosts(res.data)
    }

    const resetForm = () => {
        setForm({ title: "", description: "", content: "", img: "" })
        setEditing(false)
        setCurrentId(null)
    }

    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            alert("Thiếu tiêu đề hoặc nội dung")
            return
        }

        if (editing) {
            await http.put(`/posts/${currentId}`, form)
        } else {
            await http.post("/posts", form)
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
        setEditing(true)
        setCurrentId(p._id)
    }

    const handleDelete = async (id) => {
        if (!confirm("Xóa bài viết này?")) return
        await http.delete(`/posts/${id}`)
        loadPosts()
    }

    return (
        <div className="relative min-h-screen">
            <TopHeader></TopHeader>
            <Sidebar></Sidebar>

            <div className="relative container mx-auto w-auto py-10 space-y-8 ml-[220px] py-20">
                {/* LIST */}
                <Card className="bg-white/95">
                    <CardHeader>
                        <CardTitle>Danh sách bài viết</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {posts.length === 0 && (
                            <Alert>
                                <AlertDescription>
                                    Chưa có bài viết
                                </AlertDescription>
                            </Alert>
                        )}

                        {posts.map((p) => (
                            <div
                                key={p._id}
                                className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted"
                            >
                                <div>
                                    <h4 className="font-semibold">{p.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline"
                                        onClick={() => handleEdit(p)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="destructive"
                                        onClick={() => handleDelete(p._id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                {/* FORM */}
                <Card className="bg-white/95">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-red-700" />
                            {editing ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
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
                            <Label>Ảnh đại diện (URL)</Label>
                            <Input
                                value={form.img}
                                onChange={(e) =>
                                    setForm({ ...form, img: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex gap-3">
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
