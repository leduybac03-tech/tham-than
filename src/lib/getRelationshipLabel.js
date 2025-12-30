export const getRelationshipLabel = (value) => {
    const map = {
        parent: "Cha/Mẹ",
        spouse: "Vợ/Chồng",
        sibling: "Anh/Chị/Em",
        relative: "Họ hàng",
        friend: "Bạn bè",
    }

    return map[value] || "Không xác định"
}
