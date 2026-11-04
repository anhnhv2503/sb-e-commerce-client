import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

/**
 * ProductItem — flat product card.
 * No border, no shadow: image (8px radius) on a mist ground, then title,
 * category label and price separated by whitespace alone.
 */
const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const currency = useCurrencyFormat();

  const open = () => navigate(`/product/${product.id}`);

  return (
    <article
      className="group h-full cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
      onClick={open}
      tabIndex={0}
      role="link"
      aria-label={`Xem chi tiết ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-mist">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {product.category && (
          <span className="pill absolute left-2 top-2 bg-white text-brand-pink">
            {product.category.name}
          </span>
        )}

        <span className="pill absolute bottom-2 left-2 translate-y-1 bg-brand-ink px-3 py-1 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Xem Nhanh
        </span>
      </div>

      {/* Meta */}
      <div className="pt-3">
        <h3 className="line-clamp-2 text-base leading-snug text-brand-ink transition-colors group-hover:text-brand-orange">
          {product.name}
        </h3>
        {product.brand?.name && (
          <p className="mt-1 text-sm text-[#606562]">{product.brand.name}</p>
        )}
        <p className="mt-2 text-base font-semibold text-brand-ink">
          {currency.format(product.price)}
        </p>
      </div>
    </article>
  );
};

export default ProductItem;
