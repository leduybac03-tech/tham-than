
const Marquee = ({ text, className = "", speed = 18 }) => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap py-4 w-1/2">
      <div
        className={`flex w-max ${className}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          textShadow:
            "2px 2px 4px #000000, 4px 4px 8px #ff0000, 6px 6px 12px #ffff00",
        }}
      >
        {/* Nhân bản text để chạy nối đuôi */}
        <span className="mx-16">{text}</span>
        <span className="mx-16">{text}</span>
        <span className="mx-16">{text}</span>
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
