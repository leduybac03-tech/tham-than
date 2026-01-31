import { CalendarDays, Newspaper } from "lucide-react"
import { useState } from "react"
import { NewsItem } from "./NewItem.jsx"
import { FeedbackSection } from "./FeedbackSection.jsx"
import { Button } from "./ui/button.jsx"
import { Link } from "react-router-dom"

export default function NewsSection() {

    const NEWS_LIST = [
        {
            id: 1,
            category: "Tin tức Quân khu 4",
            date: "12/03/2025",
            title: "Lữ đoàn Phòng không 283, Quân khu 4: Vui Tết không quên nhiệm vụ",
            image:
                "https://file3.qdnd.vn/data/images/0/2026/01/02/upload_1021/a7%202.jpg?dpi=150&quality=100&w=870",
            caption:
                "Cán bộ, chiến sĩ Lữ đoàn Phòng không 283 trong nhiệm vụ trực sẵn sàng chiến đấu dịp Tết Dương lịch 2026.",
            lead:
                "Vinh dự là những người lính pháo phòng không bảo vệ bình yên bầu trời quê hương Bác Hồ, cán bộ, chiến sĩ Lữ đoàn Phòng không 283 luôn nêu cao tinh thần “vui Tết không quên nhiệm vụ”.",
            content: [
                {
                    type: "text",
                    value:
                        "Trong những ngày nghỉ Tết Dương lịch 2026, bên cạnh tổ chức các hoạt động vui chơi, giao lưu văn hóa – văn nghệ, cán bộ, chiến sĩ Lữ đoàn Phòng không 283 vẫn duy trì nghiêm chế độ trực sẵn sàng chiến đấu.",
                },
                {
                    type: "image",
                    src: "https://file3.qdnd.vn/data/images/0/2026/01/02/upload_1021/a6%201.jpg?dpi=150&quality=100&w=870",
                    caption: "Lực lượng trực chiến tại trận địa pháo phòng không.",
                },
                {
                    type: "text",
                    value:
                        "Với tinh thần trách nhiệm cao, đơn vị đã triển khai đồng bộ các biện pháp bảo đảm an toàn, giữ vững kỷ luật, kỷ cương, góp phần bảo vệ vững chắc vùng trời Tổ quốc.",
                },
            ],
            author: "Ban Chính trị",
            source: "Lữ đoàn Phòng không 283",
        },
        {
            id: 2,
            category: "Thông báo đơn vị",
            date: "05/03/2025",
            title: "Đại hội Đại biểu Đảng bộ Lữ đoàn Phòng không 283: Thành công nhờ chuẩn bị chu đáo",
            image:
                "https://file3.qdnd.vn/data/images/0/2025/04/03/upload_1021/a%202%20dh.jpg?dpi=150&quality=100&w=870",
            caption: "Đại hội Đảng bộ Lữ đoàn Phòng không 283 nhiệm kỳ 2025–2030.",
            lead:
                "Đảng bộ Lữ đoàn Phòng không 283 vừa tổ chức Đại hội Đại biểu nhiệm kỳ 2025–2030.",
            content: [
                {
                    type: "text",
                    value:
                        "Đại hội được tổ chức trang trọng, đúng nguyên tắc, quy trình và quy định của Điều lệ Đảng.",
                },
                {
                    type: "image",
                    src: "https://file3.qdnd.vn/data/images/0/2025/04/03/upload_1021/a%201%20dh.jpg?dpi=150&quality=100&w=870",
                    caption: "Quang cảnh Đại hội.",
                },
                {
                    type: "text",
                    value:
                        "Ngay trong công tác chuẩn bị, từ việc lấy ý kiến đóng góp vào các văn kiện Đại hội XIV của Đảng; dự thảo Báo cáo chính trị Đại hội Đảng bộ Quân khu lần thứ XII và của cấp mình, hay việc đề cử, ứng cử vào Ban chấp hành Đảng bộ Lữ đoàn đều phát huy dân chủ trực tiếp. Sau khi nhận được chỉ thị tổ chức Đại hội làm trước, Đảng bộ Lữ đoàn đã ra Nghị quyết chuyên đề lãnh đạo. Dự thảo Nghị quyết Đại hội Đảng bộ Quân khu lần thứ XII và Dự thảo Nghị quyết Đại hội Đảng bộ Lữ đoàn được gửi đến mọi cán bộ, đảng viên, quần chúng trong toàn đơn vị để mọi người có điều kiện nghiên cứu, đóng góp ý kiến, bổ sung hoàn thiện. Cùng với làm tốt công tác chuẩn bị về văn kiện, nhân sự, Đảng ủy Lữ đoàn đã lãnh đạo, chỉ đạo, phát huy tính tiền phong gương mẫu của cán bộ, đảng viên và vai trò xung kích của các đoàn viên, hội viên đối với sự kiện trọng đại này. Theo đó, Đảng ủy, Hội đồng Thi đua – Khen thưởng Lữ đoàn đã phát động đợt thi đua cao điểm “Tăng cường đoàn kết, phát huy dân chủ và trí tuệ tập thể, thi đua giành 4 nhất” chào mừng Đại hội đại biểu Đảng bộ Lữ đoàn lần thứ XI và Đại hội đại biểu Đảng bộ Quân khu lần thứ XII nhiệm kỳ 2025-2030. Cùng với đó, các cơ quan, đơn vị, tổ chức quần chúng trong toàn Lữ đoàn đã tổ chức nhiều hoạt động sôi nổi, thiết thực chào mừng, như: Hội diễn văn nghệ, thi bình báo tường, cắm hoa nghệ thuật; xây dựng các công trình…",
                },
                {
                    type: "image",
                    src: "https://file3.qdnd.vn/data/images/0/2025/04/03/upload_1021/a%203%20dh.jpg?dpi=150&quality=100&w=870",
                    caption: "Bỏ phiếu bầu Ban Chấp hành Đảng bộ Lữ đoàn nhiệm kỳ 2025-2030. ",
                },
            ],
            author: "Ban Tham mưu",
            source: "Đơn vị",
        },
        {
            id: 3,
            category: "Hoạt động đơn vị",
            date: "25/02/2025",
            title: "Tiểu đoàn 3, Lữ đoàn Phòng không 283: “Vang mãi bản hùng ca trên bầu trời quê hương Bác”",
            image:
                "https://baoquankhu4.com.vn/upload/18269/fck/quockhanh337/30(2).jpg",
            caption: "Tiểu đoàn 3, Lữ đoàn Phòng không 283: “Vang mãi bản hùng ca trên bầu trời quê hương Bác”",
            lead:
                "Tối ngày 21/12/2025, Tiểu đoàn 3, Lữ đoàn Phòng không 283 (Quân khu 4) tổ chức chương trình giao lưu văn nghệ với chủ đề “Vang mãi bản hùng ca trên bầu trời quê hương Bác”. Đây là hoạt động thiết thực nằm trong chuỗi các hoạt động chào mừng kỷ niệm 81 năm Ngày thành lập Quân đội nhân dân Việt Nam (22/12/1944 - 22/12/2025) và 36 năm Ngày hội Quốc phòng toàn dân (22/12/1989 - 22/12/2025).",
            content: [
                {
                    type: "text",
                    value:
                        "Văn nghệ chào mừng kỷ niệm 81 năm ngày thành lập quân đội nhân dân Việt nam!",
                },
                {
                    type: "image",
                    src: "https://baoquankhu4.com.vn/upload/18269/fck/quockhanh337/21(4).jpg",
                    caption: "Văn nghệ chào mừng kỷ niệm 81 năm ngày thành lập quân đội nhân dân Việt nam!",
                },
                {
                    type: "text",
                    value:
                        "Dự chương trình có đại diện các cơ quan Lữ đoàn; cấp ủy, chính quyền địa phương trên địa bàn đóng quân; các đơn vị kết nghĩa cùng đông đảo cán bộ, chiến sĩ, thân nhân quân nhân và Nhân dân trên địa bàn. Chương trình giao lưu được tổ chức trang trọng, giàu cảm xúc với hai phần chính: “Hào khí Quân đội nhân dân Việt Nam - Sáng mãi bản hùng ca anh hùng” và “Ngời sáng phẩm chất Bộ đội Cụ Hồ - Vững bước trong thời đại mới”. Với các tiết mục đặc sắc ca ngợi quê hương, đất nước, Đảng, Quân đội và hình ảnh người lính phòng không đã tái hiện sinh động truyền thống vẻ vang của Quân đội nhân dân Việt Nam, qua đó khơi dậy niềm tự hào, ý thức trách nhiệm và quyết tâm của mỗi cán bộ, chiến sĩ trong thực hiện nhiệm vụ quản lý, bảo vệ vững chắc bầu trời quê hương Bác, đồng thời lan tỏa tinh thần yêu nước, trách nhiệm công dân trong các tầng lớp Nhân dân.",
                },
            ],
            author: "Ban Tham mưu",
            source: "Đơn vị",
        },
        {
            id: 4,
            category: "Hoạt động đơn vị",
            date: "25/02/2025",
            title: "Quân khu 4 kiểm tra sẵn sàng chiến đấu tại Lữ đoàn Phòng không 283",
            image:
                "https://file3.qdnd.vn/data/images/0/2025/12/21/upload_2072/qk4b.jpg?dpi=150&quality=100&w=870",
            caption: "Đoàn công tác Quân khu 4 kiểm tra SSCĐ tại đơn vị.",
            lead:
                "Đoàn công tác Quân khu 4 tiến hành kiểm tra công tác sẵn sàng chiến đấu tại Lữ đoàn Phòng không 283.",
            content: [
                {
                    type: "text",
                    value:
                        "Đoàn đã kiểm tra công tác trực SSCĐ, huấn luyện, bảo đảm hậu cần – kỹ thuật.",
                },
                {
                    type: "image",
                    src: "https://file3.qdnd.vn/data/images/0/2025/12/21/upload_2072/qk4b.jpg?dpi=150&quality=100&w=870",
                    caption: "Đoàn kiểm tra tại trận địa.",
                },
                {
                    type: "text",
                    value:
                        "Kết quả kiểm tra cho thấy đơn vị duy trì nghiêm chế độ SSCĐ, sẵn sàng xử trí mọi tình huống.",
                },
            ],
            author: "Ban Tham mưu",
            source: "Đơn vị",
        },
    ]

    const [selectedNews, setSelectedNews] = useState(NEWS_LIST[0])
    const [loading, setLoading] = useState(false)

    const handleSelectNews = (news) => {
        setLoading(true)

        setTimeout(() => {
            setSelectedNews(news)
            setLoading(false)
        }, 500) // delay 0.5s cho hiệu ứng
    }


    return (
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        BẢN TIN – THÔNG BÁO ĐƠN VỊ
                    </h2>
                    <p className="mt-3 text-lg text-muted-foreground">
                        Thông tin chính thống, phục vụ công tác quản lý nội bộ
                    </p>
                </div>

                <div className="md:flex gap-10">

                    {/* ===== MAIN ARTICLE ===== */}
                    <article className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 space-y-6 flex-1 h-[1000px] overflow-y-scroll">

                        {loading ? (
                            // ===== LOADER SKELETON =====
                            <div className="animate-pulse space-y-6">

                                <div className="flex gap-3">
                                    <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                                </div>

                                <div className="h-10 w-3/4 bg-gray-200 rounded"></div>

                                <div className="h-[300px] w-full bg-gray-200 rounded-xl"></div>

                                <div className="space-y-3">
                                    <div className="h-5 w-full bg-gray-200 rounded"></div>
                                    <div className="h-5 w-5/6 bg-gray-200 rounded"></div>
                                    <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                                </div>

                            </div>
                        ) : (
                            // ===== REAL CONTENT =====
                            <>
                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-600 font-medium">
                                        <Newspaper className="h-4 w-4" />
                                        {selectedNews.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="h-4 w-4" />
                                        {selectedNews.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                                    {selectedNews.title}
                                </h1>

                                {/* Image */}
                                <figure className="space-y-2">
                                    <img
                                        src={selectedNews.image}
                                        alt={selectedNews.title}
                                        className="w-full max-h-[420px] rounded-xl object-cover shadow-md"
                                    />
                                    <figcaption className="text-sm text-muted-foreground italic">
                                        {selectedNews.caption}
                                    </figcaption>
                                </figure>

                                {/* Lead */}
                                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 border-l-4 border-blue-500 pl-4">
                                    {selectedNews.lead}
                                </p>

                                {/* Content */}
                                <div className="space-y-6">
                                    {selectedNews.content.map((item, index) => {
                                        if (item.type === "text") {
                                            return (
                                                <p key={index} className="text-lg leading-relaxed">
                                                    {item.value}
                                                </p>
                                            )
                                        }

                                        if (item.type === "image") {
                                            return (
                                                <figure key={index} className="space-y-2">
                                                    <img
                                                        src={item.src}
                                                        alt=""
                                                        className="w-full rounded-xl shadow-md"
                                                    />
                                                    {item.caption && (
                                                        <figcaption className="text-sm text-muted-foreground italic">
                                                            {item.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            )
                                        }

                                        return null
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="pt-6 border-t flex justify-between items-center text-sm text-muted-foreground">
                                    <span>Nguồn: {selectedNews.source}</span>
                                    <span>Tác giả: {selectedNews.author}</span>
                                </div>
                                <Link to={'/feedbacks'}>
                                    <Button size="lg"
                                        variant="sky" className="text-base font-bold border-sky-400 text-sky-900 hover:bg-sky-400 hover:text-white shadow-lg hover:scale-105 transition border-1">Gửi cảm nghĩ</Button>
                                </Link>
                            </>
                        )}
                    </article>
                    {/* ===== SIDEBAR ===== */}
                    <aside className="md:w-1/4 space-y-6 mt-4 md:mt-0">
                        {/* Danh sách tin tức */}
                        <div className="bg-white border rounded-xl shadow-sm p-4">
                            <h3 className="text-sm font-bold mb-3 text-red-700 uppercase">
                                Tin mới
                            </h3>

                            <div className="space-y-6 max-h-[360px] overflow-y-auto pr-1 pt-4">
                                {NEWS_LIST.map((news) => (
                                    <div
                                        key={news.id}
                                        onClick={() => handleSelectNews(news)}
                                        className={`cursor-pointer rounded-lg transition ${selectedNews.id === news.id
                                            ? "bg-red-50 border border-red-200"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <NewsItem date={news.date} title={news.title} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-white border rounded-xl shadow-sm p-4">
                            <FeedbackSection />
                        </div>

                    </aside>
                </div>

            </div>
        </section>
    )
}
