import { TotalUSD } from "@/constant";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const TotalPrice = ({ cartData }) => {
  const { quantity } = useSelector((state) => state.AddToCartReducer);
  const total = useMemo(() => {
    if (!Array.isArray(cartData) || cartData.length === 0) {
      return 0;
    }

    return cartData.reduce((acc, item) => {
      const currentQty = quantity?.[item.id];
      const qty = currentQty ? Number(currentQty.qty || 0) : Number(item.qty || 1);
      const price = currentQty
        ? Number(currentQty.price || item.price || 0)
        : Number(item.price || 0);

      return acc + qty * price;
    }, 0);
  }, [cartData, quantity]);

  return (
    <div className="list-group-item d-flex lh-condensed justify-content-between">
      <span className="fw-bold">{TotalUSD}</span>
      <strong>
        ${Math.max(0, total - 5)}
      </strong>
    </div>
  );
};

export default TotalPrice;

