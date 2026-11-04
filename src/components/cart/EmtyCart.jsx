import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * EmtyCart — editorial empty state: display line, short copy, one CTA.
 */
const EmtyCart = () => {
  const nav = useNavigate();
  return (
    <div className="w-full max-w-2xl">
      <p className="eyebrow mb-4 text-brand-pink">Giỏ Hàng</p>
      <h2 className="font-display text-5xl text-brand-ink sm:text-[64px]">
        Giỏ hàng của bạn đang trống —
      </h2>
      <p className="mt-6 max-w-md text-base leading-relaxed text-[#606562]">
        Chưa có sản phẩm nào trong giỏ hàng của bạn. Hãy khám phá hàng ngàn sản
        phẩm tuyệt vời của chúng tôi ngay hôm nay!
      </p>
      <button
        onClick={() => nav("/shop")}
        className="btn btn-accent mt-10"
      >
        Mua Sắm Ngay
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
};

export default EmtyCart;
