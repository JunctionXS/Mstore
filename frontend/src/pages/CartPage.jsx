import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  console.log("cart items:", cartItems);

  return (
    <div className="pt-20 min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl font-medium text-center text-gray-900 mb-1">Your cart</h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-base">Your cart is empty</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-gray-100">
                {item.product_image && (
                  <img
                    src={`${BASEURL}${item.product_image}`}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.product_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">${item.product_price} each</p>
              </div>

              {/* Stepper */}
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="text-sm font-medium text-gray-900 min-w-7 text-center border-x border-gray-200 leading-8">
                  {item.quantity}
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                className="text-xs text-red-500 hover:bg-red-50 px-2 py-1.5 rounded-md transition-colors ml-1 shrink-0"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-gray-400">Order total</span>
              <span className="text-xl font-medium text-gray-900">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Proceed to checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;